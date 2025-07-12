package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/tarikcarvalho08/round-strike/backend/internal/handlers"
)

func ClassRoutes(route *gin.Engine) {
	classes := route.Group("/classes")

	classes.GET("", handlers.GetClasses)
}
