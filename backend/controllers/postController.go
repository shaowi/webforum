package controllers

import (
	"backend/models"
	"backend/utils"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Posts(c *fiber.Ctx) error {
	posts := []models.Post{}
	result := db.Find(&posts)
	return utils.ResponseBody(c, "all posts retrieved", c.JSON(result))
}

func AddPost(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, "user is not found")
	}

	post := models.Post{
		UserId:    user.UserId,
		Title:     data["title"],
		Body:      data["body"],
		CreatedDt: time.Now(),
	}

	db.Create(&post)
	resStr := "post has been added successfully"

	return utils.ResponseBody(c, resStr, c.JSON(post))
}

func DeletePost(c *fiber.Ctx) error {
	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, "user is not found")
	}

	// Check that user is an administrator
	if user.AccessType == 1 {
		postId := c.Params("postId")
		db.Delete(&models.Post{}, postId)
		resStr := "post has been deleted successfully"
		return utils.ResponseBody(c, resStr, nil)
	}

	return utils.ErrorResponse(c, "post is not found")
}
