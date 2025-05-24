package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handler"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/character", handler.GetCharacters)
	r.POST("/character", handler.CreateCharacter)
	r.GET("/character/:id", handler.GetCharacterByID)
	r.DELETE("/character/:id", handler.DeleteCharacter)
	r.PUT("/character/:id", handler.UpdateCharacter)

}
