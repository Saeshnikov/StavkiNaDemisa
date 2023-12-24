package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// bets
func bet_handler(c *gin.Context) {
	var newBet bet
	// paramPairs := c.Request.URL.Query()
	// for key, values := range paramPairs {
	// 	fmt.Printf("key = %v, value(s) = %v\n", key, values)
	// }
	// secret_code := c.Query("secret_code")
	// event_id := c.Query("event_id")
	// bet_size := c.Query("size")
	// prediction := c.Query("prediction")

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newBet); err != nil {
		return
	}
	// fmt.Printf(c.Request.URL.pa)

	// postBet(event_id, secret_code, bet_size, prediction)
	// newbet = bet{sid: event_id,secret_code: secret_code,size: bet_size,prediction: prediction}

	c.IndentedJSON(http.StatusCreated, newBet)
}

// func bet_handler1(w http.ResponseWriter, r *http.Request) {
// 	r.ParseForm()
// 	secret_code := r.Form.Get("secret_code")
// 	event_id := r.Form.Get("event_id")
// 	bet_size := r.Form.Get("bet_size")
// 	prediction := r.Form.Get("prediction")

// 	postBet(event_id, secret_code, bet_size, prediction)
// 	fmt.Fprintf(w, "Bet placed on event %s in size of %s with prediction: %s from user: %s\n", event_id, bet_size, prediction, secret_code)
// }

// events
// func open_events(){
// 	var event bet

// 	if err := c.BindJSON(&newBet); err != nil {
// 		return
// 	}
// 	// fmt.Printf(c.Request.URL.pa)

// 	events getOpenEvents()
// 	// newbet = bet{sid: event_id,secret_code: secret_code,size: bet_size,prediction: prediction}

//		c.IndentedJSON(http.StatusCreated, newBet)
//	}
func close_event_handler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	result := r.Form.Get("result")
	event_id := r.Form.Get("event_id")

	putCloseEvent(event_id, result)
	fmt.Fprintf(w, "Event %s closed with result: %s\n", event_id, result)
}

// goichiki
func user_info_handler(w http.ResponseWriter, r *http.Request) {

	info := getUserInfo(strings.Replace(r.URL.Path, "/", "", 1))

	u := user{}
	err := info.Scan(&u.id, &u.secret_code, &u.balance)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Fprintf(w, "%d %s %d \n", u.id, u.secret_code, u.balance)

}
