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
	PostId    uint      `json:"post_id" gorm:"primaryKey;gorm:autoIncrement"`
	User      User      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId    uint      `json:"user_id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	CreatedDt time.Time `json:"created_dt"`
}

type Comment struct {
	CommentId uint      `json:"comment_id" gorm:"primaryKey;gorm:autoIncrement"`
	User      User      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post      Post      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId    uint      `json:"user_id"`
	PostId    uint      `json:"post_id"`
	Content   string    `json:"content"`
	CreatedDt time.Time `json:"created_dt"`
}

type Popularity struct {
	User   User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post   Post `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId uint `json:"user_id" gorm:"primaryKey"`
	PostId uint `json:"post_id" gorm:"primaryKey"`
	Views  uint `json:"views"`
	Likes  bool `json:"likes"`
}
