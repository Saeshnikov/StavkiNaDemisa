package auth_app

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"time"

	auth_errors "stavki/internal/auth/errors"
	auth_jwt "stavki/internal/auth/jwt"
	auth_service "stavki/internal/auth/service"
	"stavki/internal/auth/storage"
	grpcapp "stavki/internal/common/grpc"

	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
)

type App struct {
	GRPCServer *grpcapp.App
}

type Auth struct {
	log         *slog.Logger
	usrSaver    UserSaver
	usrProvider UserProvider
	tokenTTL    time.Duration
}

type UserSaver interface {
	SaveUser(
		ctx context.Context,
		login string,
		passHash []byte,
	) (uid int64, err error)
}

type UserProvider interface {
	User(ctx context.Context, login string) (storage.User, error)
}

// Login checks if user with given credentials exists in the system and returns access token.
//
// If user exists, but password is incorrect, returns error.
// If user doesn't exist, returns error.
func (a *Auth) Login(
	ctx context.Context,
	email string,
	password string,
) (string, error) {
	const op = "Auth.Login"

	log := a.log.With(
		slog.String("op", op),
		slog.String("username", email),
	)

	log.Info("attempting to login user")

	user, err := a.usrProvider.User(ctx, email)
	if err != nil {
		if errors.Is(err, auth_errors.ErrUserNotFound) {
			a.log.Warn("user not found")

			return "", fmt.Errorf("%s: %w", op, auth_errors.ErrInvalidCredentials)
		}

		a.log.Error("failed to get user")

		return "", fmt.Errorf("%s: %w", op, err)
	}

	if err := bcrypt.CompareHashAndPassword(user.PassHash, []byte(password)); err != nil {
		a.log.Info("invalid credentials")

		return "", fmt.Errorf("%s: %w", op, auth_errors.ErrInvalidCredentials)
	}

	log.Info("user logged in successfully")

	token, err := auth_jwt.NewToken(user, a.tokenTTL)
	if err != nil {
		a.log.Error("failed to generate token")

		return "", fmt.Errorf("%s: %w", op, err)
	}

	return token, nil
}

// RegisterNewUser registers new user in the system and returns user ID.
// If user with given username already exists, returns error.
func (a *Auth) RegisterNewUser(ctx context.Context, login string, pass string) (int64, error) {
	const op = "Auth.RegisterNewUser"

	log := a.log.With(
		slog.String("op", op),
		slog.String("login", login),
	)

	log.Info("registering user")

	passHash, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
	if err != nil {
		log.Error("failed to generate password hash")

		return 0, fmt.Errorf("%s: %w", op, err)
	}

	id, err := a.usrSaver.SaveUser(ctx, login, passHash)
	if err != nil {
		log.Error("failed to save user")

		return 0, fmt.Errorf("%s: %w", op, err)
	}

	return id, nil
}

func New(
	log *slog.Logger,
	grpcPort int,
	connectionString string,
	tokenTTL time.Duration,
) *App {
	storage, err := storage.New(connectionString)
	if err != nil {
		panic(err)
	}

	registerAuth := func(gRPCServer *grpc.Server) {
		auth_service.Register(
			gRPCServer,
			&Auth{
				log:         log,
				usrSaver:    storage,
				usrProvider: storage,
				tokenTTL:    tokenTTL,
			},
		)
	}

	grpcApp := grpcapp.New(log, registerAuth, grpcPort)

	return &App{
		GRPCServer: grpcApp,
	}
}
