package models

type Character struct {
	ID   string `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
	HP   int    `json:"hp"`
	MP   int    `json:"mp"`
}
