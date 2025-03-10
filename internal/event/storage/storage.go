package storage

import (
	"context"
	"database/sql"
	"fmt"

	proto "stavki/gen/go/event"

	_ "github.com/lib/pq"
)

type Storage struct {
	db *sql.DB
}

func New(connectionString string) (*Storage, error) {
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", "opening database connection: ", err)
	}

	return &Storage{db: db}, nil
}

func (s *Storage) Stop() error {
	return s.db.Close()
}

func (s *Storage) CreateEvent(
	ctx context.Context,
	userID int,
	name string,
	description string,
	judge int32,
	excluded []int32,
) error {
	tx, err := s.db.Begin()
	if err != nil {
		return fmt.Errorf("%s: %w", "begining transaction: ", err)
	}
	// Defer a rollback in case anything fails.
	defer tx.Rollback()

	stmt, err := tx.Prepare(
		"INSERT INTO events (name, description, author, judge) VALUES($1, $2, $3, $4) RETURNING id",
	)
	if err != nil {
		return fmt.Errorf("%s: %w", "creating query: ", err)
	}
	defer stmt.Close()

	var event_id int

	err = stmt.QueryRowContext(ctx, name, description, userID, judge).Scan(&event_id)
	if err != nil {
		return fmt.Errorf("%s: %w", "executing query: ", err)
	}

	for _, excludedUserID := range excluded {
		stmtExcluded, err := tx.Prepare(
			"INSERT INTO excluded (event_id,user_id) VALUES($1, $2, $3, $4)",
		)
		if err != nil {
			return fmt.Errorf("%s: %w", "creating query: ", err)
		}
		defer stmt.Close()

		err = stmtExcluded.QueryRowContext(ctx, event_id, excludedUserID).Err()
		if err != nil {
			return fmt.Errorf("%s: %w", "executing query: ", err)
		}
	}

	err = tx.Commit()
	if err != nil {
		return fmt.Errorf("creating query: %w", err)
	}

	return nil
}

func (s *Storage) ListEvents(ctx context.Context, userId int) (
	[]*proto.EventInfo,
	error,
) {

	var res []*proto.EventInfo

	stmt, err := s.db.Prepare("SELECT id,name,description,closed,result,coefy,coefn,author,judge FROM events")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", "creating query: ", err)
	}
	defer stmt.Close()

	rows, err := stmt.QueryContext(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", "executing query: ", err)
	}

	for rows.Next() {
		eventInfo := proto.EventInfo{}
		var eventResult string

		err := rows.Scan(
			&eventInfo.EventId,
			&eventInfo.Name,
			&eventInfo.Description,
			&eventInfo.Closed,
			&eventResult,
			&eventInfo.CoefY,
			&eventInfo.CoefN,
			&eventInfo.Author,
			&eventInfo.Judge,
		)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", "scan query result: ", err)
		}

		eventInfo.Result = proto.EventResult(proto.EventResult_value[eventResult])

		res = append(res, &eventInfo)
	}

	return res, nil
}
