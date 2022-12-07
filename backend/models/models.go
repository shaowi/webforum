package models

type User struct {
	Id         uint   `json:"id" gorm:"autoIncrement"`
	Email      string `json:"email" gorm:"primaryKey"`
	Password   []byte `json:"password"`
	Name       string `json:"name"`
	AccessType uint   `json:"access_type"`
}
