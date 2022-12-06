package utils

import (
	"backend/pkg/config"
	"backend/pkg/models"
	"fmt"
	"strconv"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func CreateDB() error {
	var err error
	DB, err = gorm.Open(postgres.New(postgres.Config{
		DSN: config.GetPostgresConnectionStr(),
	}), &gorm.Config{})
	return err
}

func CreateTables() {
	DB.AutoMigrate(&models.User{})
}

// Remove all records from all tables.
func ClearDb() {
	cols := [5]string{"User", "Post", "Comment", "View", "Like"}
	for _, col := range cols {
		s := fmt.Sprintf("DELETE FROM %s", col)
		DB.Exec(s)
	}
}

func SaveDummyData() {
	user := &models.User{
		EmailAddress: "test1@example.com",
		Password:     "1234",
		Nickname:     "test1",
		AccessType:   1,
	}

	DB.Create(user)
}

// Wrapper around strconv.ParseUint. Base is set to 10; bitSize is set to 64.
func ParseUint(s string) (uint, error) {
	num, err := strconv.ParseUint(s, 10, 64)
	return uint(num), err
}
