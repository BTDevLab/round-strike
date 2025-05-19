package routes

import (
	"github.com/tarikcarvalho08/round-strike/backend/internal/handler"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/character", handler.GetCharacters)
	// router.POST("/character", handler.CreateCharacter)
	// router.GET("/character/:id", handler.GetCharacterByID)
	// router.DELETE("/character/:id", handler.DeleteCharacter)

}
