package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/tarikcarvalho08/round-strike/backend/db"
)

func main() {
	// Read env vars
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASS")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")

	// Build DSN string
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, pass, host, port, name)

	// Connect to DB
	database := db.Connect(dsn)
	defer database.Close()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello with dynamic DB connection!")
	})

	fmt.Println("Server starting on :3002")
	if err := http.ListenAndServe(":3002", nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
