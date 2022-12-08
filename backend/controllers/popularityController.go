package controllers

import (
	"backend/models"
	"backend/utils"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func Popularity(c *fiber.Ctx) error {

	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, "user is not found")
	}

	postId := c.Params("postId")
	popularity := &models.Popularity{}
	db.Where(map[string]interface{}{"user_id": user.UserId, "post_id": postId}).First(&popularity)

	resStr := fmt.Sprintf("popularity details retrieved for post_id: %s", postId)
	return utils.ResponseBody(c, resStr, c.JSON(popularity))
}
