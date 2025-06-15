package handlers

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/tarikcarvalho08/round-strike/backend/db"
	"github.com/tarikcarvalho08/round-strike/backend/internal/models"
	"github.com/tarikcarvalho08/round-strike/backend/internal/services"
	"github.com/tarikcarvalho08/round-strike/backend/internal/utils"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
)

var jwtKey = []byte("secret-key")

type Claims struct {
	Email  string `json:"email"`
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}

func CreateUser(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8,max=16"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		if ve, ok := err.(validator.ValidationErrors); ok {
			validationErrors := utils.FormatCreateUserValidationErrors(ve)
			c.JSON(http.StatusBadRequest, gin.H{
				"ok":      false,
				"message": "Validation error",
				"errors":  validationErrors,
			})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{
			"ok":      false,
			"message": "Invalid input data",
		})
		return
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

	user := models.User{
		Email:        input.Email,
		PasswordHash: string(hash),
	}

	if err := db.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"ok":      false,
			"message": "Failed to create user",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"ok":      true,
		"message": "User created successfully!",
	})
}

func LoginUser(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"ok":      false,
			"message": "Invalid input data",
		})
		return
	}

	token, err := services.AuthenticateUser(input.Email, input.Password)
	if err != nil {
		switch err {
		case services.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{
				"ok":      false,
				"message": err.Error(),
			})
		case services.ErrInvalidPassword:
			c.JSON(http.StatusUnauthorized, gin.H{
				"ok":      false,
				"message": err.Error(),
			})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{
				"ok":      false,
				"message": "Authentication failed",
			})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": token,
	})
}

func GetUsers(c *gin.Context) {
	var users []models.User
	if err := db.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok":      false,
			"message": "Failed to fetch users",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": users,
	})
}

func GetUserByID(c *gin.Context) {
	var user models.User
	id := c.Param("id")

	if err := db.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"ok":      false,
			"message": "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": user,
	})
}
