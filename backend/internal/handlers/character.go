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
			"error": "failed to fetch characters",
		})
		return
	}

	c.JSON(http.StatusOK, characters)
}

func CreateCharacter(c *gin.Context) {
	var inputCharacter models.Character

	if err := c.ShouldBindJSON(&inputCharacter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "error creating character",
		})
		return
	}
	character := services.GenerateCharacterDefaultStats(inputCharacter)

	if err := db.DB.Create(&character).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create character",
		})
		return
	}

	c.JSON(http.StatusCreated, character)
}

func DeleteCharacter(c *gin.Context) {
	id := c.Param("id")
	var character models.Character

	if err := db.DB.First(&character, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "character not found",
		})
		return
	}

	if err := db.DB.Delete(&character).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to delete character",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": "character deleted!",
	})
}

func GetCharacterByID(c *gin.Context) {
	id := c.Param("id")
	var character models.Character

	if err := db.DB.First(&character, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "character not found",
		})
		return
	}

	c.JSON(http.StatusOK, character)
}

func UpdateCharacter(c *gin.Context) {
	id := c.Param("id")
	var character models.Character

	if err := db.DB.First(&character, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "character not found",
		})
		return
	}
	// GPT said its better to use Save instead of Update in this case, so it updates all the fields of the structure
	// Also, it is updating each field from the request, to the user, and then saving this user back into the DB (not sure if that's the ideal)
	var input models.Character
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid input",
		})
		return
	}

	character.Name = input.Name
	character.HP = input.HP
	character.MP = input.MP

	if err := db.DB.Save(&character).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "error updating character",
		})
		return
	}

	c.JSON(http.StatusOK, character)
}
