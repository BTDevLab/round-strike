package services

import (
	"errors"
	"fmt"

	"github.com/tarikcarvalho08/round-strike/backend/db"
	"github.com/tarikcarvalho08/round-strike/backend/internal/models"
	"gorm.io/gorm"
)

func BuildCharacter(name string, userID string, classID string) (*models.Character, error) {
	var charClass models.Class

	result := db.DB.Where("id =?", classID).First(&charClass)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("class with ID '%s' not found", classID)
		}
		return nil, fmt.Errorf("failed to retrieve class details for ID '%s': %w", classID, result.Error)
	}

	characterStats := models.CharacterStats{
		Strength:     charClass.BaseStrength,
		Intelligence: charClass.BaseIntelligence,
		Dexterity:    charClass.BaseDexterity,
		Defense:      charClass.BaseDefense,
		MaxHP:        charClass.BaseMaxHP,
		MaxMP:        charClass.BaseMaxMP,
	}

	newCharacter := &models.Character{
		Name:           name,
		Level:          1,
		Experience:     0,
		HP:             charClass.BaseMaxHP,
		MP:             charClass.BaseMaxMP,
		UserID:         userID,
		ClassID:        charClass.ID,
		CharacterStats: characterStats,
	}

	return newCharacter, nil
}
