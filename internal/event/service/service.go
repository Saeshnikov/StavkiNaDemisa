package event_service

import (
	"context"
	"fmt"
	proto "stavki/gen/go/event"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ServerAPI struct {
	proto.UnimplementedEventServer // Хитрая штука, о ней ниже
	event                          Event
}

// Тот самый интерфейс, котрый мы передавали в grpcApp
type Event interface {
	NewEvent(
		ctx context.Context,
		content *proto.NewEventRequest,
	) error
	ListEvents(
		ctx context.Context,
	) (
		[]*proto.EventInfo,
		error,
	)
	Bet(
		ctx context.Context,
		content *proto.BetRequest,
	) error
}

func Register(gRPCServer *grpc.Server, event Event) {
	proto.RegisterEventServer(gRPCServer, &ServerAPI{event: event})
}

func (s *ServerAPI) NewEvent(
	ctx context.Context,
	in *proto.NewEventRequest,
) (*proto.NewEventResponse, error) {
	if in.Name == "" {
		return nil, status.Error(codes.InvalidArgument, "name is required")
	}
	if in.Judge == 0 {
		return nil, status.Error(codes.InvalidArgument, "judge is required")
	}

	err := s.event.NewEvent(ctx, in)
	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Errorf("failed to create new event: %w", err).Error())
	}

	return &proto.NewEventResponse{}, nil
}

func (s *ServerAPI) ListEvents(
	ctx context.Context,
	in *proto.ListEventsRequest,
) (*proto.ListEventsResponse, error) {
	eventsInfo, err := s.event.ListEvents(ctx)
	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Errorf("failed to list events: %w", err).Error())
	}

	return &proto.ListEventsResponse{Info: eventsInfo}, nil
}

func (s *ServerAPI) Bet(
	ctx context.Context,
	in *proto.BetRequest,
) (*proto.BetResponse, error) {
	err := s.event.Bet(ctx, in)
	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Errorf("failed to make a bet: %w", err).Error())
	}

	return &proto.BetResponse{}, nil
}
