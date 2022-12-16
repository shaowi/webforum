package models

type User struct {
	UserId     uint   `json:"user_id" gorm:"primaryKey;gorm:autoIncrement"`
	Email      string `json:"email" gorm:"unique;gorm:not null"`
	Password   []byte `json:"-"`
	Name       string `json:"name"`
	AccessType uint   `json:"access_type"`
}

type Post struct {
	PostId      uint   `json:"post_id" gorm:"primaryKey;gorm:autoIncrement"`
	User        User   `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId      uint   `json:"user_id"`
	AuthorName  string `json:"author_name"`
	AuthorEmail string `json:"author_email"`
	Title       string `json:"title"`
	Body        string `json:"body"`
	Categories  string `json:"categories"`
	CreatedDt   int64  `json:"created_dt"`
	Views       uint   `json:"views" gorm:"default:0"`
	Likes       uint   `json:"likes" gorm:"default:0"`
	Comments    uint   `json:"comments" gorm:"default:0"`
}

type Comment struct {
	CommentId   uint   `json:"comment_id" gorm:"primaryKey;gorm:autoIncrement"`
	User        User   `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post        Post   `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId      uint   `json:"user_id"`
	AuthorName  string `json:"author_name"`
	AuthorEmail string `json:"author_email"`
	PostId      uint   `json:"post_id"`
	Content     string `json:"content"`
	CreatedDt   int64  `json:"created_dt"`
}

// Stores the information of posts that are liked and viewed by a user
type Popularity struct {
	User   User `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post   Post `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId uint `json:"user_id" gorm:"primaryKey"`
	PostId uint `json:"post_id" gorm:"primaryKey"`
	Views  uint `json:"views" gorm:"default:1"`
	Likes  bool `json:"likes" gorm:"default:false"`
}
