package db

import (
	"fmt"
	"log"

	"github.com/tarikcarvalho08/round-strike/backend/internal/models"
)

func SeedClasses() {
	var count int64
	DB.Model(&models.Class{}).Count(&count)
	if count > 0 {
		fmt.Println("Classes already seeded. Skipping.")
	}

	fmt.Println("Seeding initial character classes...")

	classes := []models.Class{
		{
			Name:             "Knight",
			Description:      "A strong fighter with heavy armor. Great for taking hits and dealing solid melee damage.",
			BaseStrength:     8,
			BaseIntelligence: 3,
			BaseDexterity:    4,
			BaseDefense:      7,
			BaseMaxHP:        120,
			BaseMaxMP:        50,
		},
		{
			Name:             "Cleric",
			Description:      "A support class that can heal and use light magic. Balanced and good for longer battles.",
			BaseStrength:     4,
			BaseIntelligence: 6,
			BaseDexterity:    3,
			BaseDefense:      5,
			BaseMaxHP:        90,
			BaseMaxMP:        100,
		},
		{
			Name:             "Wizard",
			Description:      "A powerful spellcaster with high damage. Fragile, but can destroy enemies from a distance.",
			BaseStrength:     2,
			BaseIntelligence: 9,
			BaseDexterity:    3,
			BaseDefense:      2,
			BaseMaxHP:        70,
			BaseMaxMP:        150,
		},
		{
			Name:             "Hunter",
			Description:      "A quick and agile archer. Good at striking from afar and avoiding damage.",
			BaseStrength:     5,
			BaseIntelligence: 4,
			BaseDexterity:    8,
			BaseDefense:      4,
			BaseMaxHP:        100,
			BaseMaxMP:        70,
		},
	}

	for _, class := range classes {
		if err := DB.Create(&class).Error; err != nil {
			log.Printf("Failed to seed class %s: %v", class.Name, err)
		} else {
			fmt.Println("Seeded class: %s (ID: %s)\n", class.Name, class.ID)
		}
	}
	fmt.Println("Class seeding completed.")
}
