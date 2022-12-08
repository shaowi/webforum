package controllers

import (
	"backend/models"
	"backend/utils"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Comments(c *fiber.Ctx) error {

	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, "user is not found")
	}

	comments := []models.Comment{}
	postId := c.Params("postId")
	db.Where(map[string]interface{}{"user_id": user.UserId, "post_id": postId}).Find(&comments)

	resStr := fmt.Sprintf("all comments retrieved for post_id: %s", postId)
	return utils.ResponseBody(c, resStr, c.JSON(comments))
}

func AddComment(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, "user is not found")
	}
	postId := utils.ParseUint(c.Params("postId"))

	comment := models.Comment{
		UserId:    user.UserId,
		PostId:    postId,
		Content:   data["content"],
		CreatedDt: time.Now(),
	}

	db.Create(&comment)
	resStr := fmt.Sprintf("comment has been added successfully for post_id: %d", postId)

	return utils.ResponseBody(c, resStr, c.JSON(comment))
}

func DeleteComment(c *fiber.Ctx) error {
	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, "user is not found")
	}

	// Check that user is an administrator
	if user.AccessType == 1 {
		commentId := c.Params("commentId")
		db.Delete(&models.Comment{}, commentId)

		postId := c.Params("postId")
		resStr := fmt.Sprintf("comment has been deleted successfully for post_id: %s", postId)
		return utils.ResponseBody(c, resStr, nil)
	}

	return utils.ErrorResponse(c, "comment is not found")
}
