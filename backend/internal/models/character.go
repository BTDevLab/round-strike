package models

type Character struct {
	Base
	Name  string `json:"name" gorm:"type:varchar(255);not null"`
	Level int    `json:"level" gorm:"type:int;not null"`
	XP    int    `json:"xp" gorm:"type:int;not null"`
	HP    int    `json:"hp" gorm:"type:int;not null"`
	MP    int    `json:"mp" gorm:"type:int;not null"`
	CharacterStats
}
