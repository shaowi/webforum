package models

import "time"

type User struct {
	UserId     uint   `json:"user_id" gorm:"primaryKey;gorm:autoIncrement"`
	Email      string `json:"email" gorm:"primaryKey"`
	Password   []byte `json:"-"`
	Name       string `json:"name"`
	AccessType uint   `json:"access_type"`
}

type Post struct {
	User      User      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	PostId    uint      `json:"post_id" gorm:"primaryKey;gorm:autoIncrement"`
	UserId    uint      `json:"user_id" gorm:"primaryKey"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	CreatedDt time.Time `json:"created_dt"`
}

type Comment struct {
	User      User      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post      Post      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId    uint      `json:"user_id" gorm:"primaryKey"`
	PostId    uint      `json:"post_id" gorm:"primaryKey"`
	CreatedDt time.Time `json:"created_dt" gorm:"primaryKey"`
}

type View struct {
	User   User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post   Post `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId uint `json:"user_id" gorm:"primaryKey"`
	PostId uint `json:"post_id" gorm:"primaryKey"`
	Count  uint `json:"count"`
}

type Like struct {
	User   User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post   Post `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId uint `json:"user_id"`
	PostId uint `json:"post_id"`
}
