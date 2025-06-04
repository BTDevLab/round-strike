package models

type CharacterStats struct {
	Strength     int `json:"strength" gorm:"type:int;not null"`
	Intelligence int `json:"intelligence" gorm:"type:int;not null"`
	Dexterity    int `json:"dexterity" gorm:"type:int;not null"`
	Defense      int `json:"defense" gorm:"type:int;not null"`
	MaxHP        int `json:"maxHP" gorm:"type:int;not null"`
	MaxMP        int `json:"maxMP" gorm:"type:int;not null"`
}
