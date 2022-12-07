package utils

import (
	"strconv"

	_ "github.com/lib/pq"
)

// Wrapper around strconv.ParseUint. Base is set to 10; bitSize is set to 64.
func ParseUint(s string) (uint, error) {
	num, err := strconv.ParseUint(s, 10, 64)
	return uint(num), err
}
