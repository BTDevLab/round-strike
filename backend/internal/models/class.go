package models

type Class struct {
	Base
	Name             string `json:"name" gorm:"type:varchar(255);not null;unique"`
	Description      string `json:"description" gorm:"type:text;not null"`
	BaseHP           int    `json:"base_hp" gorm:"type:int;not null"`
	BaseMP           int    `json:"base_mp" gorm:"type:int;not null"`
	BaseStrength     int    `json:"base_strength" gorm:"type:int;not null"`
	BaseIntelligence int    `json:"base_intelligence" gorm:"type:int;not null"`
	BaseDexterity    int    `json:"base_dexterity" gorm:"type:int;not null"`
	BaseDefense      int    `json:"base_defense" gorm:"type:int;not null"`
	BaseMaxHP        int    `json:"base_max_hp" gorm:"type:int;not null"`
	BaseMaxMP        int    `json:"base_max_mp" gorm:"type:int;not null"`
}
