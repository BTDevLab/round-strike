package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handler"
	"github.com/tarikcarvalho08/round-strike/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(route *gin.Engine) {
	users := route.Group("/users")

	// Public routes
	users.POST("/users", handler.CreateUser)
	users.POST("/login", handler.LoginUser)

	// Protected routes
	auth := route.Group("/auth")
	auth.Use(middleware.AuthMiddleware())
	{
		auth.GET("", handler.GetUsers)
	}
}
