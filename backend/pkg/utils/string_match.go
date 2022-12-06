package utils

import "strings"

// Return all strings in src that contains substring target.
func GetMatchedStrings(src []string, target string) []string {
	result := make([]string, 0)
	for _, s := range src {
		if strings.Contains(s, target) {
			result = append(result, s)
		}
	}
	return result
}
