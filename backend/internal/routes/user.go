package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handlers"
	"github.com/tarikcarvalho08/round-strike/backend/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func UserRoutes(route *gin.Engine) {
	users := route.Group("/users")

	// Public routes
	users.POST("/users", handlers.CreateUser)
	users.POST("/login", handlers.LoginUser)

	// Protected routes
	auth := route.Group("/auth")
	auth.Use(middlewares.AuthMiddleware())
	{
		auth.GET("", handlers.GetUsers)
		auth.GET("/:id", handlers.GetUserByID)
	}
}
