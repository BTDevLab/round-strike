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
	users.Use(middlewares.AuthMiddleware())
	{
		users.GET("", handlers.GetUsers)
		users.GET("/:id", handlers.GetUserByID)
	}
}
