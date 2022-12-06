package main

import (
	"backend/pkg/config"
	"backend/pkg/routes"
	"backend/pkg/utils"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	// Create connection to db
	if err := utils.CreateDB(); err != nil {
		log.Fatal(err)
	}

	// Create tables
	utils.CreateTables()

	// Used for dev purposes
	utils.ClearDb()
	utils.SaveDummyData()

	// Setup gin engine
	app := gin.Default()
	routes.SetupUserRoutes(app)

	if err := app.Run(config.SERVER_ADDR); err != nil {
		log.Fatal(err)
	}
}
