package models

type User struct {
	Base
	Username     string `json:"username" gorm:"unique;not null"`
	PasswordHash string `json:"-" gorm:"not null"`
	Characters Character `gorm:"foreignKey:UserID"`
}
