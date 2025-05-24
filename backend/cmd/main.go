package main

import (
	"fmt"
	"log"
	"os"

	"github.com/tarikcarvalho08/round-strike/backend/db"
	"github.com/tarikcarvalho08/round-strike/backend/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	db.Connect()

	// Setup router
	router := gin.Default()
	routes.CharacterRoutes(router)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}
	fmt.Printf("Server starting on :%s\n", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
