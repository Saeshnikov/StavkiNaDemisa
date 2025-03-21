package storage

import (
	"context"
	"database/sql"
	"fmt"

	proto "stavki/gen/go/user"

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

func (s *Storage) ListUsers(ctx context.Context, userId int) (
	[]*proto.UserInfo,
	error,
) {

	var res []*proto.UserInfo

	stmt, err := s.db.Prepare("SELECT id,login,balance FROM users WHERE id<>$1")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", "creating query: ", err)
	}
	defer stmt.Close()

	rows, err := stmt.QueryContext(ctx, userId)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", "executing query: ", err)
	}

	for rows.Next() {
		userInfo := proto.UserInfo{}

		err := rows.Scan(
			&userInfo.Id,
			&userInfo.Login,
			&userInfo.Balance,
		)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", "scan query result: ", err)
		}

		res = append(res, &userInfo)
	}

	return res, nil
}
