package handlers

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"
)

var offset = 10000

var connStr = "user=postgres password=egor dbname=stavki sslmode=disable"

type bet struct {
	Eid      int    `json:"eid"`
	UserName string `json:"user_name"`
	Result   int    `json:"result"`
	Size     int    `json:"size"`
}

type bet_ret struct {
	Eid    int `json:"eid"`
	Result int `json:"result"`
	Size   int `json:"size"`
}

// login
func login(password string) (bool, string) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	// fmt.Printf("%d %s %d %d\n", b.Sid, b.Secret_code, b.Size, b.Prediction)

	rows, err := db.Query("select userName from users where password=$1 ", password)
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()
	var userName string
	for rows.Next() {
		err := rows.Scan(&userName)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}
	if userName == "" {
		return false, ""
	}

	return true, userName
}

// ставочки
func place_a_bet(b bet) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	// fmt.Printf("%d %s %d %d\n", b.Sid, b.Secret_code, b.Size, b.Prediction)
	rows, err := db.Query("call place_a_bet($1,$2,$3,$4)", b.Eid, b.UserName, b.Size, b.Result)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
}

func select_users_bets(secret_code string) []bet_ret {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select eid, result, bet from history where uid = (select id from users where username = $1)", secret_code)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	bets := []bet_ret{}

	for rows.Next() {
		b := bet_ret{}
		err := rows.Scan(&b.Eid, &b.Result, &b.Size)
		if err != nil {
			fmt.Println(err)
			continue
		}
		bets = append(bets, b)
	}
	return bets
}

func find_user_bet(userName string, eid int) bet_ret {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select result, bet from history where uid = (select id from users where username = $1) and eid=$2", userName, eid)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	bet := bet_ret{}

	for rows.Next() {
		err = rows.Scan(&bet.Result, &bet.Size)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}

	return bet
}

type event struct {
	Id                int     `json:"id"`
	Sname             string  `json:"sname"`
	Sdescription      string  `json:"sdescription"`
	Date_beg          string  `json:"date_beg"`
	Coefn             float32 `json:"coefn"`
	Coefy             float32 `json:"coefy"`
	IsRes             bool    `json:"is_res"`
	ResponsiblePerson string  `json:"responsible_person"`
	Bet               int     `json:"bet"`
}

// events
func insert_event(name string, description string, responsible string) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("insert into events (ename, edescription, date_beg,responsible) values ($1,$2,$3,(select id from users where username = $4))", name, description, time.Now(), responsible)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
}

func close_event(event_id int, result int) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("call close_event($1,$2)", event_id, result)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
}

type closed_event struct {
	Id           int    `json:"id"`
	Sname        string `json:"sname"`
	Sdescription string `json:"sdescription"`
	Date_beg     string `json:"date_beg"`
	Date_end     string `json:"date_end"`
	Is_closed    bool   `json:"is_closed"`
	Result       bool   `json:"result"`
}

func select_open_events(userName string) []event {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	var rows *sql.Rows

	rows, err = db.Query("select id, ename, edescription, date_beg,coefn,coefy, (select username from users where id = responsible) from events where closed = false")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	events := []event{}

	for rows.Next() {
		b := event{}
		err := rows.Scan(&b.Id, &b.Sname, &b.Sdescription, &b.Date_beg, &b.Coefn, &b.Coefy, &b.ResponsiblePerson)
		if err != nil {
			fmt.Println(err)
			continue
		}
		b.IsRes = (userName == b.ResponsiblePerson)
		b.Bet = find_user_bet(userName, b.Id).Size

		events = append(events, b)
	}
	return events
}

func select_closed_events() []closed_event {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	var rows *sql.Rows

	rows, err = db.Query("select id, sname, sdescription, date_beg, date_end, closed, result from stavki where closed = true")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	events := []closed_event{}

	for rows.Next() {
		b := closed_event{}
		err := rows.Scan(&b.Id, &b.Sname, &b.Sdescription, &b.Date_beg, &b.Date_end, &b.Is_closed, &b.Result)
		if err != nil {
			fmt.Println(err)
			continue
		}
		events = append(events, b)
	}
	return events
}

// гойчики
func select_balance(userName string) int {
	var balance int
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select balance from users where userName = $1", userName)
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&balance)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}

	return balance
}

func select_users() []string {
	var users []string
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	var rows *sql.Rows

	rows, err = db.Query("select userName from users")
	if err != nil {
		fmt.Println(err)
	}

	for rows.Next() {
		b := ""
		err := rows.Scan(&b)
		if err != nil {
			fmt.Println(err)
			continue
		}
		users = append(users, b)
	}

	return users
}
