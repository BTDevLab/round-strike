package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handlers"
	"github.com/tarikcarvalho08/round-strike/backend/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func UserRoutes(route *gin.Engine) {
	users := route.Group("/users")

	// Public user routes
	route.POST("/login", handlers.LoginUser)
	users.POST("", handlers.CreateUser)

	// Protected user routes
	users.Use(middlewares.AuthMiddleware())
	{
		users.GET("", handlers.GetUsers)
		users.GET("/:id", handlers.GetUserByID)
	}
}
