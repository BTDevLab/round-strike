package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handlers"

	"github.com/gin-gonic/gin"
)

func CharacterRoutes(r *gin.Engine) {
	r.GET("/character", handlers.GetCharacters)
	r.POST("/character", handlers.CreateCharacter)
	r.GET("/character/:id", handlers.GetCharacterByID)
	r.DELETE("/character/:id", handlers.DeleteCharacter)
	r.PUT("/character/:id", handlers.UpdateCharacter)
}
