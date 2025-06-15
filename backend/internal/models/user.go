package models

type User struct {
	Base
	Email     string `json:"email" gorm:"unique;not null"`
	PasswordHash string `json:"-" gorm:"not null"`
	Characters Character `gorm:"foreignKey:UserID"`
}
