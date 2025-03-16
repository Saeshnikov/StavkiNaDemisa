package user_app

import (
	"context"
	"fmt"
	"log/slog"
	"strconv"
	"time"

	proto "stavki/gen/go/user"
	auth_interceptor "stavki/internal/auth-interceptor"
	grpcapp "stavki/internal/common/grpc"
	event_service "stavki/internal/user/service"
	"stavki/internal/user/storage"

	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
)

type App struct {
	GRPCServer *grpcapp.App
}

type Storage interface {
	ListUsers(ctx context.Context, userId int) (
		[]*proto.UserInfo,
		error,
	)
	GetUser(ctx context.Context, userId int) (
		*proto.UserInfo,
		error,
	)
	AlterUser(ctx context.Context, userId int, login string, passHash []byte) error
}

type User struct {
	UserStorage Storage
}

func (user *User) ListUsers(
	ctx context.Context,
) (
	[]*proto.UserInfo,
	error,
) {
	user_id, err := auth_interceptor.GetFromContext(ctx, "user_id")
	if err != nil {
		return nil, fmt.Errorf("%s: %v", "getting user_id from context: ", err)
	}

	userId, err := strconv.Atoi(user_id)
	if err != nil {
		return nil, fmt.Errorf("%s: %v", "converting uid to int: ", err)
	}

	return user.UserStorage.ListUsers(ctx, userId)
}

func (user *User) GetUser(
	ctx context.Context,
) (
	*proto.UserInfo,
	error,
) {
	user_id, err := auth_interceptor.GetFromContext(ctx, "user_id")
	if err != nil {
		return nil, fmt.Errorf("%s: %v", "getting user_id from context: ", err)
	}

	userId, err := strconv.Atoi(user_id)
	if err != nil {
		return nil, fmt.Errorf("%s: %v", "converting uid to int: ", err)
	}
	return user.UserStorage.GetUser(ctx, userId)
}

func (user *User) AlterUser(
	ctx context.Context,
	login string,
	password string,
) error {
	user_id, err := auth_interceptor.GetFromContext(ctx, "user_id")
	if err != nil {
		return fmt.Errorf("%s: %v", "getting user_id from context: ", err)
	}

	userId, err := strconv.Atoi(user_id)
	if err != nil {
		return fmt.Errorf("%s: %v", "converting uid to int: ", err)
	}

	passHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to generate password hash")
	}
	return user.UserStorage.AlterUser(ctx, userId, login, passHash)
}

func New(
	log *slog.Logger,
	grpcPort int,
	connectionString string,
	tokenTTL time.Duration,
) *App {

	userStorage, err := storage.New(connectionString)
	if err != nil {
		panic(err)
	}

	registerShop := func(gRPCServer *grpc.Server) {
		event_service.Register(
			gRPCServer,
			&User{
				UserStorage: userStorage,
			},
		)
	}

	grpcApp := grpcapp.New(log, registerShop, grpcPort, auth_interceptor.AuthInterceptor())

	return &App{
		GRPCServer: grpcApp,
	}
}
