package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// login
func GetLogin(c *gin.Context) {
	var loginInfo struct {
		Password string `json:"password"`
	}

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	loginInfo.Password = c.Query("password")
	// if err := c.BindJSON(&loginInfo); err != nil {
	// 	return
	// }

	var login_out struct {
		Signed   bool   `json:"signed"`
		UserName string `json:"user_name"`
	}

	login_out.Signed, login_out.UserName = login(loginInfo.Password)

	c.IndentedJSON(http.StatusCreated, login_out)
}

// bets
func PostBet(c *gin.Context) {

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	eid, err := strconv.Atoi(c.Query("eid"))
	if err != nil {
		fmt.Println(err)
	}

	result, err := strconv.Atoi(c.Query("result"))
	if err != nil {
		fmt.Println(err)
	}
	size, err := strconv.Atoi(c.Query("size"))
	if err != nil {
		fmt.Println(err)
	}
	userName := c.Query("user_name")

	newBet := bet{Eid: eid, Size: size, Result: result, UserName: userName}
	place_a_bet(newBet)

	c.IndentedJSON(http.StatusCreated, newBet)
}

// func GetUsersBets(c *gin.Context) {
// 	var uInfo struct {
// 		Secret_code string `json:"secret_code"`
// 	}

// 	// Call BindJSON to bind the received JSON to
// 	// newAlbum.
// 	if err := c.BindJSON(&uInfo); err != nil {
// 		return
// 	}

// 	bets := select_users_bets(uInfo.Secret_code)

// 	c.IndentedJSON(http.StatusOK, bets)
// }

// events
func PostEvent(c *gin.Context) {
	var newEvent struct {
		EventName        string `json:"event_name"`
		EventDescription string `json:"event_description"`
		Responsible      string `json:"responsible"`
	}

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	newEvent.EventName = c.Query("event_name")
	newEvent.EventDescription = c.Query("event_description")
	newEvent.Responsible = c.Query("responsible")

	insert_event(newEvent.EventName, newEvent.EventDescription, newEvent.Responsible)

	c.IndentedJSON(http.StatusCreated, newEvent)
}

func PutEvent(c *gin.Context) { //for closing event
	var closure_info struct {
		Event_id int `json:"id"`
		Result   int `json:"result"`
	}

	eid, err := strconv.Atoi(c.Query("eid"))
	if err != nil {
		fmt.Println(err)
	}
	closure_info.Event_id = eid
	closure_info.Result, err = strconv.Atoi(c.Query("result"))
	if err != nil {
		fmt.Println(err)
	}
	close_event(closure_info.Event_id, closure_info.Result)

	c.IndentedJSON(http.StatusCreated, closure_info)
}

func GetEvent(c *gin.Context) {
	var user struct {
		UserName string `json:"user_name"`
	}
	user.UserName = c.Query("user_name")

	events := select_open_events(user.UserName)
	c.IndentedJSON(http.StatusCreated, events)

}

func GetUserBalance(c *gin.Context) {
	var uInfo struct {
		UserName string `json:"user_name"`
	}

	uInfo.UserName = c.Query("user_name")

	var resp struct {
		Balance int `json:"balance"`
	}
	resp.Balance = select_balance(uInfo.UserName)
	c.IndentedJSON(http.StatusOK, resp)
}

func GetUsers(c *gin.Context) {
	type uInfo struct {
		UserName string `json:"user_name"`
	}
	var u uInfo
	u.UserName = c.Query("user_name")
	var users []uInfo
	row := select_users()
	for _, s := range row {
		if s != u.UserName {
			users = append(users, uInfo{UserName: s})
		}
	}
	c.IndentedJSON(http.StatusOK, users)
}

// user
// func GetUserInfo(c *gin.Context) {
// 	var uInfo struct {
// 		Secret_code string `json:"secret_code"`
// 	}

// 	// Call BindJSON to bind the received JSON to
// 	// newAlbum.
// 	if err := c.BindJSON(&uInfo); err != nil {
// 		return
// 	}

// 	row := select_user_info(uInfo.Secret_code)
// 	c.IndentedJSON(http.StatusOK, row)
// }
