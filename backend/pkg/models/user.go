package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	EmailAddress string `json:"email_address"`
	Password     string `json:"password"`
	Nickname     string `json:"nickname"`
	AccessType   uint   `json:"access_type"`
}
