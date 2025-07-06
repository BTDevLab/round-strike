// Package handlers provides the HTTP handlers for the application
package handlers

import (
	"net/http"

	"github.com/tarikcarvalho08/round-strike/backend/db"
	"github.com/tarikcarvalho08/round-strike/backend/internal/models"
	"github.com/tarikcarvalho08/round-strike/backend/internal/services"

	"github.com/gin-gonic/gin"
)

func GetCharacters(c *gin.Context) {
	var characters []models.Character

	if err := db.DB.Find(&characters).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok":    false,
			"error": "Failed to fetch characters",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": characters,
	})
}

func GetCharactersByUserID(c *gin.Context) {
	// c.Get returns a value and a boolean
	// So here it checks if the userID exists in the gin Context, which was added by the middleware.
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"ok":    false,
			"error": "Unauthorized",
		})
		return
	}

	// The value returned by c.Get is an interface.
	// We need to set the proper value of the response as our need. In this case, our userID is a string.
	userID := userIDRaw.(string)

	var characters []models.Character

	if err := db.DB.Where("user_id = ?", userID).Find(&characters).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok":    false,
			"error": "Failed to fetch characters",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": characters,
	})
}

func CreateCharacter(c *gin.Context) {
	// c.Get returns a value and a boolean
	// So here it checks if the userID exists in the gin Context, which was added by the middleware.
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"ok":    false,
			"error": "Unauthorized",
		})
		return
	}

	// The value returned by c.Get is an interface.
	// We need to set the proper value of the response as our need. In this case, our userID is a string.
	userID := userIDRaw.(string)

	var inputCharacter models.Character

	if err := c.ShouldBindJSON(&inputCharacter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"ok":    false,
			"error": "Error creating character",
		})
		return
	}

	character := services.BuildCharacter(inputCharacter, userID)

	if err := db.DB.Create(&character).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"ok":    false,
			"error": "Failed to create character",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"ok":      true,
		"message": "Character created successfully!",
	})
}

func DeleteCharacter(c *gin.Context) {
	id := c.Param("id")

	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"ok":    false,
			"error": "Unauthorized",
		})
		return
	}

	userID := userIDRaw.(string)
	var character models.Character

	if err := db.DB.Where("id = ? AND user_id = ?", id, userID).First(&character).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"ok":    false,
			"error": "Character not found",
		})
		return
	}

	if err := db.DB.Delete(&character).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok":    false,
			"error": "Failed to delete character",
		})
		return
	}

	c.JSON(http.StatusNoContent, "")
}

func GetCharacterByID(c *gin.Context) {
	id := c.Param("id")

	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"ok":    false,
			"error": "Unauthorized",
		})
		return
	}

	userID := userIDRaw.(string)
	var character models.Character

	if err := db.DB.Where("id = ? AND user_id = ?", id, userID).First(&character).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"ok":    false,
			"error": "Character not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": character,
	})
}

func UpdateCharacter(c *gin.Context) {
	id := c.Param("id")

	userIDRaw, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"ok":    false,
			"error": "Unauthorized",
		})
		return
	}

	userID := userIDRaw.(string)
	var character models.Character

	if err := db.DB.Where("id = ? AND user_id = ?", id, userID).First(&character).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"ok":    false,
			"error": "Character not found",
		})
		return
	}

	// GPT said its better to use Save instead of Update in this case, so it updates all the fields of the structure
	// Also, it is updating each field from the request, to the user, and then saving this user back into the DB (not sure if that's the ideal)
	var input models.Character
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"ok":    false,
			"error": "Invalid input",
		})
		return
	}

	character.Name = input.Name

	if err := db.DB.Save(&character).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"ok":    false,
			"error": "Error updating character!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ok":      true,
		"message": "Character updated successfully!",
	})
}
