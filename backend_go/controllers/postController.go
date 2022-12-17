package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Posts(c *fiber.Ctx) error {
	// Check that user is logged in
	if _, err := utils.GetCurrentUser(c, SecretKey); err != nil {
		return utils.ErrorResponse(c, utils.UserNotFound)
	}
	posts := []models.Post{}
	if err := database.DB.Joins("User").Find(&posts).Error; err != nil {
		return utils.ErrorResponse(c, utils.GetError)
	}
	// JOIN users ON users.user_id = posts.user_id
	for i, post := range posts {
		posts[i] = GetPostStats(post)
	}
	return utils.GetRequestResponse(c, posts)
}

func GetPostStats(post models.Post) models.Post {
	postId := post.PostId
	var views uint = post.Views
	var likes uint = post.Likes
	var comments uint = post.Comments
	viewQuery := "SELECT SUM(views) FROM popularities WHERE post_id = ?"
	likeQuery := "SELECT COUNT(likes) FROM popularities WHERE post_id = ? AND likes = true"
	commentQuery := "SELECT COUNT(comment_id) FROM comments WHERE post_id = ?"

	// Check view records exist in popularities
	var popularity models.Popularity
	condition := map[string]interface{}{"post_id": postId}
	viewsRes := database.DB.Where(condition).Limit(1).Find(&popularity)
	if viewsRes.RowsAffected > 0 {
		database.DB.Raw(viewQuery, postId).Scan(&views)
	}
	database.DB.Raw(likeQuery, postId).Scan(&likes)
	database.DB.Raw(commentQuery, postId).Scan(&comments)

	post.Views = views
	post.Likes = likes
	post.Comments = comments

	database.DB.Save(&post)
	return post
}

func AddPost(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, utils.UserNotFound)
	}

	post := models.Post{
		UserId:     user.UserId,
		Title:      data["title"],
		Body:       data["body"],
		Categories: data["categories"],
		CreatedDt:  time.Now().Unix(),
	}

	if err := database.DB.Create(&post).Error; err != nil {
		return utils.ErrorResponse(c, utils.CreateError)
	}

	return utils.CreateRequestResponse(c, post)
}

func DeletePost(c *fiber.Ctx) error {
	// Check that user is logged in
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, utils.UserNotFound)
	}

	// Check that user is an administrator
	if user.AccessType == 1 {
		postId := c.Params("postId")
		if err := database.DB.Delete(&models.Post{}, postId).Error; err != nil {
			return utils.ErrorResponse(c, utils.DeleteError)
		}
		return utils.ResponseBody(c, utils.DeleteSuccess)
	}

	return utils.ErrorResponse(c, utils.ForbiddenAction)
}

func LikePost(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, utils.UserNotFound)
	}

	// Like: 1, Unlike: 0
	like, err := strconv.ParseBool(data["like"])
	if err != nil {
		return err
	}

	// Incrementing the likes of a post
	var post models.Post

	// Search for post
	postId, err := utils.ParseUint(c.Params("postId"))
	if err != nil {
		return err
	}
	var condition = map[string]interface{}{"post_id": postId}
	if err := database.DB.Where(condition).First(&post).Error; err != nil {
		return utils.ErrorResponse(c, utils.GetError)
	}
	var curLikes uint = post.Likes
	newLikeCnt := curLikes + 1

	if !like {
		if curLikes == 0 {
			newLikeCnt = curLikes
		} else {
			newLikeCnt = curLikes - 1
		}
	}

	// Update
	if err := database.DB.Model(&post).Update("likes", newLikeCnt).Error; err != nil {
		return utils.ResponseBody(c, utils.UpdateError)
	}

	// Update the like status of this post for current user based on type
	var popularity models.Popularity

	// Search
	condition = map[string]interface{}{"post_id": postId, "user_id": user.UserId}
	res := database.DB.Where(condition).Limit(1).Find(&popularity)
	if res.RowsAffected == 0 {
		// Create new record as user info has not been recorded yet for this post
		popularity = models.Popularity{
			UserId: user.UserId,
			PostId: postId,
			Likes:  like,
		}
		if err := database.DB.Create(&popularity).Error; err != nil {
			return utils.ResponseBody(c, utils.CreateError)
		}
	} else {
		// Update like status
		if err := database.DB.Model(&popularity).Update("likes", like).Error; err != nil {
			return utils.ResponseBody(c, utils.UpdateError)
		}
	}

	return utils.ResponseBody(c, utils.Success)
}

func ViewPost(c *fiber.Ctx) error {
	user, err := utils.GetCurrentUser(c, SecretKey)
	if err != nil {
		return utils.ErrorResponse(c, utils.UserNotFound)
	}

	// Incrementing the views of a post
	var post models.Post

	// Search for post
	postId, err := utils.ParseUint(c.Params("postId"))
	if err != nil {
		return err
	}
	var condition = map[string]interface{}{"post_id": postId}
	if err := database.DB.Where(condition).First(&post).Error; err != nil {
		return utils.ErrorResponse(c, utils.GetError)
	}
	var curViews uint = post.Views

	// Update
	if err := database.DB.Model(&post).Update("views", curViews+1).Error; err != nil {
		return utils.ResponseBody(c, utils.UpdateError)
	}

	// Update the view count of this post for current user
	var popularity models.Popularity

	// Search
	condition = map[string]interface{}{"post_id": postId, "user_id": user.UserId}
	res := database.DB.Where(condition).Limit(1).Find(&popularity)
	if res.RowsAffected == 0 {
		// Create new record as user info has not been recorded yet for this post
		popularity = models.Popularity{
			UserId: user.UserId,
			PostId: postId,
		}
		if err := database.DB.Create(&popularity).Error; err != nil {
			return utils.ResponseBody(c, utils.CreateError)
		}
	} else {
		// Update view count
		if err := database.DB.Model(&popularity).Update("views", popularity.Views+1).Error; err != nil {
			return utils.ResponseBody(c, utils.UpdateError)
		}
	}

	return utils.ResponseBody(c, utils.Success)
}
