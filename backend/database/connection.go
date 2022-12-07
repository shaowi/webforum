package database

import (
	"backend/config"
	"backend/models"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN: config.GetPostgresConnectionStr(),
	}), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}
	DB = db
	ClearTables(db)
	CreateTables(db)
}

func CreateTables(db *gorm.DB) {
	db.AutoMigrate(&models.User{}, &models.Post{},
		&models.Comment{}, &models.View{}, &models.Like{})
}

// Remove all records from all tables.
func ClearTables(db *gorm.DB) {
	cols := [5]string{"likes", "comments", "views", "posts", "users"}
	for _, col := range cols {
		s := fmt.Sprintf("DROP TABLE IF EXISTS %s", col)
		db.Exec(s)
	}
}
