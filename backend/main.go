package main

import (
	"backend/config"
	"backend/database"
	"backend/routes"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
)

func main() {

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	port := "3000"
	if len(os.Getenv("POSTGRES_URL")) == 0 {
		port = fmt.Sprintf(":%s", config.GoDotEnvVariable("REST_PORT"))
	}
	app.Listen(port)
}
