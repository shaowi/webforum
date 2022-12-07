package utils

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
