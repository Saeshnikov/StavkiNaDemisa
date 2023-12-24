package main

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"
)

var connStr = "user=user_1 password=123 dbname=stavki sslmode=disable"
var db *sql.DB

type user struct {
	Id          int    `json:"id"`
	Secret_code string `json:"secret_code"`
	Balance     int    `json:"balance"`
}

type bet struct {
	Sid         int    `json:"sid"`
	Secret_code string `json:"secret_code"`
	Prediction  bool   `json:"prediction"`
	Size        int    `json:"size"`
}
type event struct {
	Sname        string `json:"sname"`
	Sdescription string `json:"sdescription"`
	Date_beg     string `json:"date_beg"`
}

// ставочки
func place_a_bet(b bet) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	// fmt.Printf("%d %s %d %d\n", b.Sid, b.Secret_code, b.Size, b.Prediction)
	rows, err := db.Query("call place_a_bet($1,$2,$3,$4)", b.Sid, b.Secret_code, b.Size, b.Prediction)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
}

func select_users_bets(secret_code string) []bet {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select sid, secret_code, prediction, bet from history where cid = (select id from clients where secret_code = $1)", secret_code)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	bets := []bet{}

	for rows.Next() {
		b := bet{}
		err := rows.Scan(&b.Sid, &b.Secret_code, &b.Prediction, &b.Size)
		if err != nil {
			fmt.Println(err)
			continue
		}
		bets = append(bets, b)
	}
	return bets
	// for _, b := range bets {
	// 	fmt.Fprintf(w, "%d %d %d %d %d \n", &b.id, &b.sid,&b.cid, &b.prediction, &b.bet)
	// }
}

// events
func insert_event(name string, description string) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("insert into stavki (sname, sdescription, date_beg) values ($1,$2,$3)", name, description, time.Now())
	if err != nil {
		panic(err)
	}
	defer rows.Close()
}

func close_event(event_id int, result bool) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("call close_stavka($1,$2)", event_id, result)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
}

func select_events(is_open bool) []event {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	var rows *sql.Rows
	if is_open {
		rows, err = db.Query("select sname, sdescription, date_beg from stavki where closed = false")
		if err != nil {
			panic(err)
		}
		defer rows.Close()
	} else {
		rows, err = db.Query("select sname, sdescription, date_beg from stavki")
		if err != nil {
			panic(err)
		}
		defer rows.Close()
	}

	events := []event{}

	for rows.Next() {
		b := event{}
		err := rows.Scan(&b.Sname, &b.Sdescription, &b.Date_beg)
		if err != nil {
			fmt.Println(err)
			continue
		}
		events = append(events, b)
	}
	return events
}

// гойчики
func select_user_info(secret_code string) *sql.Row {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	row := db.QueryRow("select * from clients where secret_code = $1", secret_code)

	return row
}
