package event_app

import (
	"context"
	"fmt"
	"log/slog"
	"strconv"
	"time"

	proto "stavki/gen/go/event"
	auth_interceptor "stavki/internal/auth-interceptor"
	grpcapp "stavki/internal/common/grpc"
	event_service "stavki/internal/event/service"
	"stavki/internal/event/storage"

	"google.golang.org/grpc"
)

type App struct {
	GRPCServer *grpcapp.App
}

type Storage interface {
	CreateEvent(
		ctx context.Context,
		userID int,
		name string,
		description string,
		judge int32,
		exluded []int32,
	) error
	ListEvents(ctx context.Context, userId int) (
		[]*proto.EventInfo,
		error,
	)
	Bet(
		ctx context.Context,
		userId int,
		size int32,
		result string,
		eventId int32,
	) error
}

type Event struct {
	EventStorage Storage
}

func (event *Event) NewEvent(
	ctx context.Context,
	content *proto.NewEventRequest,
) error {

	user_id, err := auth_interceptor.GetFromContext(ctx, "user_id")
	if err != nil {
		return fmt.Errorf("%s: %v", "getting user_id from context: ", err)
	}

	userID, err := strconv.Atoi(user_id)
	if err != nil {
		return fmt.Errorf("%s: %v", "converting uid to int: ", err)
	}

	return event.EventStorage.CreateEvent(
		ctx,
		userID,
		content.GetName(),
		content.GetDescription(),
		content.GetJudge(),
		content.GetExcludedUsers(),
	)
}

func (event *Event) ListEvents(
	ctx context.Context,
) (
	[]*proto.EventInfo,
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

	return event.EventStorage.ListEvents(ctx, userId)
}

func (event *Event) Bet(
	ctx context.Context,
	content *proto.BetRequest,
) error {
	user_id, err := auth_interceptor.GetFromContext(ctx, "user_id")
	if err != nil {
		return fmt.Errorf("%s: %v", "getting user_id from context: ", err)
	}

	userId, err := strconv.Atoi(user_id)
	if err != nil {
		return fmt.Errorf("%s: %v", "converting uid to int: ", err)
	}

	return event.EventStorage.Bet(ctx, userId, int32(content.Size), content.Result.String(), content.EventId)
}

func New(
	log *slog.Logger,
	grpcPort int,
	connectionString string,
	tokenTTL time.Duration,
) *App {

	eventStorage, err := storage.New(connectionString)
	if err != nil {
		panic(err)
	}

	registerShop := func(gRPCServer *grpc.Server) {
		event_service.Register(
			gRPCServer,
			&Event{
				EventStorage: eventStorage,
			},
		)
	}

	grpcApp := grpcapp.New(log, registerShop, grpcPort, auth_interceptor.AuthInterceptor())

	return &App{
		GRPCServer: grpcApp,
	}
}
