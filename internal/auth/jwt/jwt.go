package auth_jwt

import (
	"time"

	"stavki/internal/auth/storage"

	"stavki/internal/auth/secret"

	"github.com/golang-jwt/jwt/v5"
)

// NewToken creates new JWT token for given user and app.
func NewToken(user storage.User, duration time.Duration) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["uid"] = user.ID
	claims["login"] = user.Login
	claims["exp"] = time.Now().Add(duration).Unix()

	tokenString, err := token.SignedString([]byte(secret.Secret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
