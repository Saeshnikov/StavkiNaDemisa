package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.POST("/bet", postBet)
	router.GET("/bet", getUsersBets)

	router.POST("/event", postEvent)
	router.PUT("/event", putEvent)
	router.GET("/event", getEvent)

	router.GET("/user", getUserInfo)

	router.Run("localhost:8080")
}
