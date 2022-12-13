package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"crypto/tls"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	gomail "gopkg.in/mail.v2"
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
	hashedNewPw := bcrypt.CompareHashAndPassword(user.Password, []byte(newPw))

	if err := database.DB.Model(&models.User{}).Where("email = ?", data["email"]).Update("password", hashedNewPw).Error; err != nil {
		return utils.ErrorResponse(c, utils.InvalidEmail)
	}

	// Send an email to the user to give them the new password
	m := gomail.NewMessage()

	// Set E-Mail sender
	m.SetHeader("From", utils.EmailFrom)

	// Set E-Mail receivers
	m.SetHeader("To", utils.EmailTo)

	// Set E-Mail subject
	m.SetHeader("Subject", "Gomail test subject")

	// Set E-Mail body. You can set plain text or html with text/html
	m.SetBody("text/plain", "This is Gomail test body")

	// Settings for SMTP server
	d := gomail.NewDialer("smtp.gmail.com", 587, utils.EmailFrom, utils.EmailFromPw)

	// This is only needed when SSL/TLS certificate is not valid on server.
	// In production this should be set to false.
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	// Now send E-Mail
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}

	return utils.ResponseBody(c, "Password has been reset")
}
