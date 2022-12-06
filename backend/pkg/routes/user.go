package routes

import (
	"backend/pkg/handlers"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func SetupUserRoutes(c *gin.Engine) {
	userRoutes := c.Group("/users")
	{
		userRoutes.GET("", handlers.GetAllUsers)
		// componentRoutes.POST("/create", handlers.SaveComponentHandler)

		// componentIdRoutes := c.Group("/components/:" + utils.PARAM_COMPONENT_ID)
		// {
		// 	componentIdRoutes.Use(handlers.ExtractComponentId)

		// 	componentIdRoutes.GET("", handlers.GetComponentWithIdHandler)
		// 	componentRoutes.GET("/artifact", handlers.GetArtifactWithComponentIdHandler)
		// 	componentIdRoutes.DELETE("", handlers.DeleteComponentWithIdHandler)

		// 	// Update component routes
		// 	componentIdRoutes.PUT("", handlers.UpdateComponentWithIdHandler)
		// 	componentIdRoutes.PUT("/classification", handlers.UpdateComponentClassificationHandler)
		// 	componentIdRoutes.PUT("/status", handlers.UpdateComponentStatusHandler)
		// 	componentIdRoutes.PUT("/submit", handlers.SubmitComponentWithIdHandler)
		// }
	}
}
