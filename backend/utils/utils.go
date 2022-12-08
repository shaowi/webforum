package utils

import (
	"backend/database"
	"backend/models"
	"fmt"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func ResponseBody(c *fiber.Ctx, msg string, data error) error {
	return c.JSON(fiber.Map{
		"message": msg,
		"data":    data,
	})
}

func ErrorResponse(c *fiber.Ctx, errMsg string) error {
	return c.JSON(fiber.Map{
		"error": errMsg,
	})
}

// Wrapper around strconv.ParseUint. Base is set to 10; bitSize is set to 64.
func ParseUint(s string) uint {
	num, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		return uint(num)
	}
	errStr := fmt.Sprintf("Error parsing %s to int", s)
	panic(errStr)
}

func GetJwtToken(cookie string, SecretKey string) (*jwt.Token, error) {
	return jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
}

func GetCurrentUser(c *fiber.Ctx, SecretKey string) (models.User, error) {
	cookie := c.Cookies("jwt")

	token, err := GetJwtToken(cookie, SecretKey)

	var user models.User

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return user, err
	}

	claims := token.Claims.(*jwt.StandardClaims)

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return user, nil
}
