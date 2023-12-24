package main

import (
	"github.com/gin-gonic/gin"
)

// func bet_handler(w http.ResponseWriter, r *http.Request) {
// 	r.ParseForm()
// 	secret_code := r.Form.Get("secret_code")
// 	event_id := r.Form.Get("event_id")
// 	bet_size := r.Form.Get("bet_size")
// 	prediction := r.Form.Get("prediction")

// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer db.Close()

// 	rows, err := db.Query("call place_a_bet($1,$2,$3,$4)", event_id, secret_code, bet_size, prediction)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()
// 	fmt.Fprintf(w, "Bet placed on event %s in size of %s with prediction: %s from user: %s\n", event_id, bet_size, prediction, secret_code)
// }

// func close_event_handler(w http.ResponseWriter, r *http.Request) {
// 	r.ParseForm()
// 	result := r.Form.Get("result")
// 	event_id := r.Form.Get("event_id")

// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer db.Close()

// 	rows, err := db.Query("call close_stavka($1,$2)", event_id, result)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()
// 	fmt.Fprintf(w, "Event %s closed with result: %s\n", event_id, result)
// }

// func user_info_handler(w http.ResponseWriter, r *http.Request) {
// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer db.Close()
// 	rows, err := db.Query("select * from clients where secret_code = $1", strings.Replace(r.URL.Path, "/", "", 1))
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()
// 	products := []client{}

// 	for rows.Next() {
// 		p := client{}
// 		err := rows.Scan(&p.id, &p.secret_code, &p.balance)
// 		if err != nil {
// 			fmt.Println(err)
// 			continue
// 		}
// 		products = append(products, p)
// 	}
// 	for _, p := range products {
// 		fmt.Fprintf(w, "%d %s %d \n", p.id, p.secret_code, p.balance)
// 	}
// }

func main() {
	router := gin.Default()
	router.POST("/bet", bet_handler)
	router.Run("localhost:8080")
	// http.HandleFunc("/post/place-a-bet/", bet_handler)
	// http.HandleFunc("/post/close-event/", close_event_handler)
	// http.HandleFunc("/", user_info_handler)

	// http.ListenAndServe(":80", nil)
}
