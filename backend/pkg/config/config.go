package config

import "os"

const (
	POSTGRES_CONNECTION_STR = "user=postgres password=123 host=localhost  dbname=dev port=5000 sslmode=disable "
	SERVER_ADDR             = ":3000"
)

func GetPostgresConnectionStr() string {
	postgresConnectionStr := POSTGRES_CONNECTION_STR
	if len(os.Getenv("POSTGRES_URL")) > 0 {
		postgresConnectionStr = os.Getenv("POSTGRES_URL")
	}
	return postgresConnectionStr
}
