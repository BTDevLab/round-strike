package handler

import (
	"net/http"

	"github.com/tarikcarvalho08/round-strike/backend/db"
	"github.com/tarikcarvalho08/round-strike/backend/internal/models"

	"github.com/gin-gonic/gin"
)

func GetCharacters(c *gin.Context) {
	var characters []models.Character

	if err := db.DB.Find(&characters).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch characters"})
		return
	}

	c.JSON(http.StatusOK, characters)
}
