package db

import (
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/tarikcarvalho08/round-strike/backend/internal/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	user := os.Getenv("MYSQL_ADDON_USER")
	pass := os.Getenv("MYSQL_ADDON_PASSWORD")
	host := os.Getenv("MYSQL_ADDON_HOST")
	port := os.Getenv("MYSQL_ADDON_PORT")
	name := os.Getenv("MYSQL_ADDON_DB")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", user, pass, host, port, name)

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database with GORM: %v", err)
	}

	err = DB.AutoMigrate(
		&models.Class{},
		&models.User{},
		&models.Character{},
	)
	if err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	} else {
		log.Println("AutoMigrate succeeded")
	}

	SeedClasses()
}
