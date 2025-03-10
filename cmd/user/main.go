package main

import (
	"os"
	"os/signal"
	"stavki/internal/common/config"
	"stavki/internal/common/logger"
	user_app "stavki/internal/user/app"
	"syscall"
)

func main() {
	conf, err := config.InitConfig("configs/user_config.yaml")
	if err != nil {
		panic(err)
	}

	log := logger.SetupLogger(conf.LogLevel)

	application := user_app.New(log, conf.Grpc.Port, conf.ConnectionString, conf.TokenTLL)

	go func() {
		application.GRPCServer.MustRun()
	}()

	// Graceful shutdown

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)

	<-stop

	application.GRPCServer.Stop()
	log.Info("Gracefully stopped")
}
