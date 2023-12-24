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
	id          int
	secret_code string
	balance     int
}

type bet struct {
	sid         string
	secret_code string
	prediction  string
	size        string
}
type event struct {
	id           int
	sname        string
	sdescription string
	date_beg     string
}

// ставочки
func postBet(event_id string, secret_code string, bet_size string, prediction string) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	fmt.Printf("%s %s %s %s\n", event_id, secret_code, bet_size, prediction)
	rows, err := db.Query("call place_a_bet($1,$2,$3,$4)", event_id, secret_code, bet_size, prediction)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
}

func getBet(secret_code string) []bet {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select * from history where cid = (select id from clients where secret_code = $1)", secret_code)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	bets := []bet{}

	for rows.Next() {
		b := bet{}
		err := rows.Scan(&b.sid, &b.secret_code, &b.prediction, &b.size)
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
func postEvent(name string, description string) {
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

func putCloseEvent(event_id string, result string) {
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

func getEvent(name string, description string) {
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

func getOpenEvents() []event {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select * from history where closed = false")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	events := []event{}

	for rows.Next() {
		b := event{}
		err := rows.Scan(&b.id, &b.sname, &b.sdescription, &b.date_beg)
		if err != nil {
			fmt.Println(err)
			continue
		}
		events = append(events, b)
	}
	return events
}

// гойчики
func getUserInfo(id string) *sql.Row {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	row := db.QueryRow("select * from clients where secret_code = $1", id)

	return row
}
