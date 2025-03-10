package storage

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	auth_errors "stavki/internal/auth/errors"

	"github.com/lib/pq"
)

type Storage struct {
	db *sql.DB
}

func New(connectionString string) (*Storage, error) {
	const op = "storage.postgres.New"

	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &Storage{db: db}, nil
}

func (s *Storage) Stop() error {
	return s.db.Close()
}

// SaveUser saves user to db.
func (s *Storage) SaveUser(ctx context.Context, login string, passHash []byte) (int64, error) {
	const op = "storage.postgres.SaveUser"

	stmt, err := s.db.Prepare("INSERT INTO users(login, password) VALUES($1, $2) RETURNING id")
	if err != nil {
		fmt.Println(err.Error())
		return 0, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var id int64

	err = stmt.QueryRowContext(ctx, login, passHash).Scan(&id)
	if err != nil {
		var pgErr *pq.Error
		if errors.As(err, &pgErr) && pgErr.Code == "23505" { // 23505 - unique_violation
			return 0, fmt.Errorf("%s: %w", op, auth_errors.ErrUserExists)
		}
		return 0, fmt.Errorf("%s: %w", op, err)
	}

	return id, nil
}

// User returns user by email.
func (s *Storage) User(ctx context.Context, login string) (User, error) {
	const op = "storage.postgres.User"

	stmt, err := s.db.Prepare("SELECT id, login, password FROM users WHERE login = $1")
	if err != nil {
		return User{}, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	row := stmt.QueryRowContext(ctx, login)

	var user User
	err = row.Scan(&user.ID, &user.Login, &user.PassHash)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return User{}, fmt.Errorf("%s: %w", op, auth_errors.ErrUserNotFound)
		}
		return User{}, fmt.Errorf("%s: %w", op, err)
	}

	return user, nil
}
