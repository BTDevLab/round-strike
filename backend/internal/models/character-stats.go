package models

type CharacterStats struct {
	Strength     int `json:"str" gorm:"type:int;not null"`
	Intelligence int `json:"int" gorm:"type:int;not null"`
	Agility      int `json:"agi" gorm:"type:int;not null"`
	Defense      int `json:"def" gorm:"type:int;not null"`
	MaxHP        int `json:"maxHP" gorm:"type:int;not null"`
	MaxMP        int `json:"maxMP" gorm:"type:int;not null"`
}
