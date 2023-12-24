package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// bets
func postBet(c *gin.Context) {
	var newBet bet

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newBet); err != nil {
		return
	}
	fmt.Printf("code: %s", newBet.Secret_code)

	// place_a_bet(newBet)

	c.IndentedJSON(http.StatusCreated, newBet)
}

func getUsersBets(c *gin.Context) {
	var uInfo struct {
		Secret_code string `json:"secret_code"`
	}

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&uInfo); err != nil {
		return
	}

	// select_users_bets(uInfo.Secret_code)

	c.IndentedJSON(http.StatusOK, gin.H{"secret_code": uInfo.Secret_code})
}

//events
func postEvent(c *gin.Context) {
	var newEvent struct {
		Sname        string `json:"sname"`
		Sdescription string `json:"sdescription"`
	}

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newEvent); err != nil {
		return
	}

	// insert_event(newEvent.Sname, newEvent.Sdescription)

	c.IndentedJSON(http.StatusCreated, newEvent)
}

func putEvent(c *gin.Context) { //for closing event
	var closure_info struct {
		Event_id int  `json:"id"`
		Result   bool `json:"result"`
	}

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&closure_info); err != nil {
		return
	}

	// close_event(closure_info.Event_id, closure_info.Result)

	c.IndentedJSON(http.StatusCreated, closure_info)
}

func getEvent(c *gin.Context) { //for closing event
	var format struct {
		Is_open bool `json:"is_open"`
	}
	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&format); err != nil {
		return
	}

	// select_events(format.Is_open)

	c.IndentedJSON(http.StatusCreated, format)
}

//user
func getUserInfo(c *gin.Context) {
	var uInfo struct {
		Secret_code string `json:"secret_code"`
	}

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&uInfo); err != nil {
		return
	}
	// select_user_info(uInfo.Secret_code)

	c.IndentedJSON(http.StatusOK, gin.H{"secret_code": uInfo.Secret_code})
}
