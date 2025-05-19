package models

type Character struct {
	ID   string `json:"id" gorm:"type:char(36);primary_key"`
	Name string `json:"name" gorm:"type:varchar(255);not null"`
	HP   int    `json:"hp" gorm:"type:int;not null"`
	MP   int    `json:"mp" gorm:"type:int;not null"`
}
