package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handler"
	"github.com/tarikcarvalho08/round-strike/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	// Public routes
	r.POST("/users", handler.CreateUser)
	r.POST("/login", handler.LoginUser)

	// Protected routes
	auth := r.Group("/users")
	auth.Use(middleware.AuthMiddleware())
	{
		auth.GET("", handler.GetUsers)
	}
}
