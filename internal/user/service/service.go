package user_service

import (
	"context"
	"fmt"
	proto "stavki/gen/go/user"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ServerAPI struct {
	proto.UnimplementedUserServer // Хитрая штука, о ней ниже
	user                          User
}

// Тот самый интерфейс, котрый мы передавали в grpcApp
type User interface {
	ListUsers(
		ctx context.Context,
	) (
		[]*proto.UserInfo,
		error,
	)
}

func Register(gRPCServer *grpc.Server, user User) {
	proto.RegisterUserServer(gRPCServer, &ServerAPI{user: user})
}

func (s *ServerAPI) ListUsers(
	ctx context.Context,
	in *proto.ListUsersRequest,
) (*proto.ListUsersResponse, error) {
	usersInfo, err := s.user.ListUsers(ctx)
	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Errorf("failed to list users: %w", err).Error())
	}

	return &proto.ListUsersResponse{Info: usersInfo}, nil
}
