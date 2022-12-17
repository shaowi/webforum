package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
)

func GetLikedStatus(c *fiber.Ctx) error {
	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, utils.UserNotFound)
	}

	var popularity models.Popularity
	postId := c.Params("postId")
	var condition = map[string]interface{}{"post_id": postId, "user_id": user.UserId}
	if err := database.DB.Where(condition).Limit(1).Find(&popularity).Error; err != nil {
		utils.ErrorResponse(c, utils.GetError)
	}

	return utils.GetRequestResponse(c, popularity)
}
