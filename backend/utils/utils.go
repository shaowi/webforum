package utils

import (
	"strconv"

	_ "github.com/lib/pq"
)

func CreateResponseBody(name string, msg string, status string, data interface{}) map[string]interface{} {
	responseBody := map[string]interface{}{
		name: map[string]interface{}{
			"message": msg,
			"status":  status,
			"data":    data,
		},
	}
	return responseBody
}

func ErrorResponse(errMsg string) map[string]string {
	return map[string]string{
		"error": errMsg,
	}
}

// Wrapper around strconv.ParseUint. Base is set to 10; bitSize is set to 64.
func ParseUint(s string) (uint, error) {
	num, err := strconv.ParseUint(s, 10, 64)
	return uint(num), err
}
