package auth_service

import (
	"context"
	"errors"
	proto "stavki/gen/go/auth"
	auth_errors "stavki/internal/auth/errors"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type serverAPI struct {
	proto.UnimplementedAuthServer
	auth Auth
}

type Auth interface {
	Login(
		ctx context.Context,
		login string,
		password string,
	) (token string, err error)
	RegisterNewUser(
		ctx context.Context,
		login string,
		password string,
	) (userID int64, err error)
}

func Register(gRPCServer *grpc.Server, auth Auth) {
	proto.RegisterAuthServer(gRPCServer, &serverAPI{auth: auth})
}

func (s *serverAPI) Login(
	ctx context.Context,
	in *proto.LoginRequest,
) (*proto.LoginResponse, error) {
	if in.Login == "" {
		return nil, status.Error(codes.InvalidArgument, "login is required")
	}

	if in.Password == "" {
		return nil, status.Error(codes.InvalidArgument, "password is required")
	}

	token, err := s.auth.Login(ctx, in.GetLogin(), in.GetPassword())

	if err != nil {
		if errors.Is(err, auth_errors.ErrInvalidCredentials) {
			return nil, status.Error(codes.InvalidArgument, "invalid email or password")
		}

		return nil, status.Error(codes.Internal, "failed to login")
	}

	return &proto.LoginResponse{Token: token}, nil
}

func (s *serverAPI) Register(
	ctx context.Context,
	in *proto.RegisterRequest,
) (*proto.RegisterResponse, error) {
	if in.Login == "" {
		return nil, status.Error(codes.InvalidArgument, "login is required")
	}

	if in.Password == "" {
		return nil, status.Error(codes.InvalidArgument, "password is required")
	}

	uid, err := s.auth.RegisterNewUser(ctx, in.GetLogin(), in.GetPassword())

	if err != nil {
		if errors.Is(err, auth_errors.ErrUserExists) {
			return nil, status.Error(codes.AlreadyExists, "user already exists")
		}
		return nil, status.Error(codes.Internal, "failed to register user")
	}

	return &proto.RegisterResponse{UserId: uid}, nil
}
