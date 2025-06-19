package services

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/tarikcarvalho08/round-strike/backend/db"
	"github.com/tarikcarvalho08/round-strike/backend/internal/models"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("secret-key")

var (
	ErrUserNotFound    = errors.New("user not found")
	ErrInvalidPassword = errors.New("invalid password")
)

type Claims struct {
	Email  string `json:"email"`
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}

func AuthenticateUser(email, password string) (string, error) {
	var user models.User
	if err := db.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return "", ErrUserNotFound
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return "", ErrInvalidPassword
	}

	var expiration time.Time
	if os.Getenv("GO_ENV") == "development" {
		expiration = time.Now().Add(30 * 24 * time.Hour)
	} else {
		expiration = time.Now().Add(1 * time.Hour)
	}
	claims := &Claims{
		Email:  user.Email,
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiration),
		},
	}

	tokenObj := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := tokenObj.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
