package models

type Character struct {
	Base
	Name       string `json:"name" gorm:"type:varchar(255);not null"`
	Level      int    `json:"level" gorm:"type:int;not null"`
	Experience int    `json:"experience" gorm:"type:int;not null"`
	HP         int    `json:"hp" gorm:"type:int;not null"`
	MP         int    `json:"mp" gorm:"type:int;not null"`
	UserID     string `json:"user_id" gorm:"type:char(36);not null"`
	CharacterStats
	ClassID string `json:"class_id" gorm:"type:char(36);not null"`
	Class   Class  `json:"class" gorm:"foreignKey:ClassID"`
}
