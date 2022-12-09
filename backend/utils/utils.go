package utils

import (
	"backend/database"
	"backend/models"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

// Wrapper around strconv.ParseUint. Base is set to 10; bitSize is set to 64.
func ParseUint(s string) (uint, error) {
	num, err := strconv.ParseUint(s, 10, 64)
	return uint(num), err
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

	database.DB.Where("user_id = ?", claims.Issuer).First(&user)

	return user, nil
}
