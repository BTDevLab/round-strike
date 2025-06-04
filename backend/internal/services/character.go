package services

import "github.com/tarikcarvalho08/round-strike/backend/internal/models"

// At the moment no need to handle errors.
// In future if add name validation, etc, will need to implement those in here and in the handler
func BuildCharacter(character models.Character, userID string) models.Character {
	return models.Character{
		Name:       character.Name,
		UserID:     userID,
		Level:      1,
		Experience: 0,
		HP:         100,
		MP:         100,
		CharacterStats: models.CharacterStats{
			Strength:     1,
			Intelligence: 1,
			Dexterity:    1,
			Defense:      1,
			MaxHP:        100,
			MaxMP:        100,
		},
	}
}
