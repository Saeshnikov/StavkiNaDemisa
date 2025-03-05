package main

import (
	"stavki/internal/old/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/api/login", handlers.GetLogin)
	router.GET("/api/balance", handlers.GetUserBalance)
	router.GET("/api/users", handlers.GetUsers)
	router.GET("/api/events", handlers.GetEvent)
	router.POST("/api/events", handlers.PostEvent)
	router.PUT("/api/events", handlers.PutEvent)
	router.POST("/api/bet", handlers.PostBet)
	// router.POST("/bet", handlers.PostBet)
	// router.GET("/bet", handlers.GetUsersBets)

	// router.POST("/event", handlers.PostEvent)
	// router.PUT("/event", handlers.PutEvent)
	// router.GET("/event", handlers.GetEvent)

	// router.GET("/user", handlers.GetUserInfo)

	router.Run("localhost:3001")
}
