package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handlers"
	"github.com/tarikcarvalho08/round-strike/backend/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func CharacterRoutes(route *gin.Engine) {
	characters := route.Group("/characters")

	// Public character routes
	characters.GET("/", handlers.GetCharacters)

	// Protected character routes
	characters.Use(middlewares.AuthMiddleware())
	{
		characters.POST("/", handlers.CreateCharacter)
		characters.GET("/:id", handlers.GetCharacterByID)
		characters.DELETE("/:id", handlers.DeleteCharacter)
		characters.PUT("/:id", handlers.UpdateCharacter)
	}
}
