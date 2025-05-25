package services

import "github.com/tarikcarvalho08/round-strike/backend/internal/models"

// At the moment no need to handle errors.
// In future if add name validation, etc, will need to implement those in here and in the handler
func GenerateCharacterDefaultStats(character models.Character) models.Character {
	return models.Character{
		Name:  character.Name,
		Level: 1,
		XP:    0,
		HP:    100,
		MP:    100,
		CharacterStats: models.CharacterStats{
			Strength:     1,
			Intelligence: 1,
			Agility:      1,
			Defense:      1,
			MaxHP:        100,
			MaxMP:        100,
		},
	}
}
