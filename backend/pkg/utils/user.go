package utils

import (
	"backend/pkg/models"
	"log"
)

func FindAllUsers() []models.User {
	var users []models.User
	if res := DB.Find(&users); res.Error != nil {
		log.Printf("%v\n", res.Error)
	}

	return users
}
