package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func User(c *fiber.Ctx) error {
	user, err := utils.GetCurrentUser(c, SecretKey)

	if err != nil {
		c.Status(fiber.StatusNotFound)
		return utils.ErrorResponse(c, utils.UserNotFound)
	}
	return utils.GetRequestResponse(c, user)
}

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	access_type, err := utils.ParseUint(data["access_type"])
	if err != nil {
		return err
	}

	user := models.User{
		Email:      data["email"],
		Password:   password,
		Name:       data["name"],
		AccessType: access_type,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return utils.ErrorResponse(c, utils.CreateError)
	}
	return utils.CreateRequestResponse(c, user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.UserId == 0 {
		c.Status(fiber.StatusNotFound)
		return utils.ErrorResponse(c, utils.UserNotFound)
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		return utils.ErrorResponse(c, utils.IncorrectPassword)
	}
	cacheUser, err := strconv.ParseBool(c.Params("cacheUser"))
	if err == nil {
		panic(err)
	}
	if cacheUser {
		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(user.UserId)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
		})

		token, err := claims.SignedString([]byte(SecretKey))

		if err != nil {
			return utils.ErrorResponse(c, utils.LogInError)
		}

		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
			HTTPOnly: true,
		}

		c.Cookie(&cookie)
	}

	return utils.ResponseBody(c, utils.UserLoggedIn)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return utils.ResponseBody(c, utils.UserLoggedOut)
}

func ResetPassword(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	// Generate a random password
	minSpecialChar := 1
	minNum := 1
	minUpperCase := 1
	passwordLength := 6
	newPw := utils.GeneratePassword(passwordLength, minSpecialChar, minNum, minUpperCase)
	hashedNewPw, _ := bcrypt.GenerateFromPassword([]byte(newPw), 14)

	user.Email = data["email"]
	// Find user with this email
	if err := database.DB.First(&user).Error; err != nil {
		return utils.ErrorResponse(c, utils.InvalidEmail)
	}
	user.Password = hashedNewPw
	database.DB.Save(&user)

	// Send an email to the user to give them the new password
	utils.SendEmail(newPw)

	return utils.ResponseBody(c, newPw)
}
