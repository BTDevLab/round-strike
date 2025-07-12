package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tarikcarvalho08/round-strike/backend/db"
	"github.com/tarikcarvalho08/round-strike/backend/internal/models"
)

func GetClasses(c *gin.Context) {
	var classes []models.Class

	if err := db.DB.Find(&classes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok":    false,
			"error": "Failed to fetch classes",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": classes,
	})
}
