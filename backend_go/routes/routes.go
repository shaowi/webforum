package routes

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")

	// User API
	user_api := api.Group("/user")
	user_api.Get("", controllers.User)
	// user_api.Get("/:userid", controllers.UserById)
	user_api.Post("/register", controllers.Register)
	user_api.Post("/login", controllers.Login)
	user_api.Post("/logout", controllers.Logout)
	user_api.Post("/resetpassword", controllers.ResetPassword)
	user_api.Post("/changepassword", controllers.ChangePassword)
	user_api.Post("/changename", controllers.ChangeName)
	user_api.Get("/userstats", controllers.UserStats)

	// Post API
	post_api := api.Group("/post")
	post_api.Get("", controllers.Posts)
	post_api.Get("/:postId", controllers.GetPost)
	post_api.Post("/add", controllers.AddPost)
	post_api.Post("/delete/:postId", controllers.DeletePost)

	// Comment API
	comment_api := post_api.Group("/:postId/comment")
	comment_api.Get("", controllers.Comments)
	comment_api.Post("/add", controllers.AddComment)
	comment_api.Post("/delete/:commentId", controllers.DeleteComment)

}
