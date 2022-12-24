# Web Forum

Web Forum is a `feature` that allows `businesses` to establish `communication between the producer, their suppliers and customers`.

- Serve as a platform for customers to provide feedbacks on consumer goods and services.

## Prerequisites

Before you begin, ensure you have met the following requirements:

<!--- These are just example requirements. Add, duplicate or remove as required --->

- You have installed the latest version of `Node Package Manager, React, Golang, Docker`
- You have a `<Windows/Mac>` machine.

## Using <Web_Forum>

To use <Web_Forum>, follow these steps:

- Clone the repository from the master branch to your local machine
- Navigate to the respective directories to initialise the frontend/backend

### Instructions to initialize PostgreSQL database

1. Open Docker.
2. In a terminal, run docker command: `docker compose up -d` from ./backend_go directory. After the container is up, the database will be listening on [http://localhost:5000](http://localhost:5000).

```env
server: localhost
database name: dev
port: 5000
username: postgres
password: 123
```

### Instructions to initialize Backend services

1. In a terminal, run command `go run main.go` from the same directory to start the backend service.

### Instructions to initialize Frontend

1. Navigate to ./frontend_react directory from the terminal.
2. Execute command `npm install` to install all the project dependencies.
3. Once completed, run `npm start` to start the app in development mode in [http://localhost:3000](http://localhost:3000).

## API Definitions

- [Get User](#get-logged-in-user)
- [Create User](#create-user)
- [Log In User](#log-in-user)
- [Log Out User](#log-out-user)
- [Get Posts](#get-posts)
- [Create Post](#create-post)
- [Delete Post](#delete-post)
- [Get Comments For Post](#get-comments-for-post)

---

## Get Logged-In User

**GET <http://localhost:3000/api/user>**

`JSON: Response`

```json
{
  "user_id": 1,
  "email": "abby@test.com",
  "name": "abby",
  "access_type": 1
}
```

---

## Get User Stats

**GET <http://localhost:3000/api/userstats>**

`JSON: Response`

```json
{
  "mades": 1,
  "views": 2,
  "likes": 3
}
```

---

## Get User By Id

**GET <http://localhost:3000/api/user/:userId>**

`JSON: Response`

```json
{
  "user_id": 1,
  "email": "abby@test.com",
  "name": "abby",
  "access_type": 1
}
```

---

## Create User

**POST <http://localhost:3000/api/user/register>**

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "password": "1234",
  "name": "abby",
  "access_type": "1",
  "avatar_color": "red"
}
```

---

## Log In User

**POST <http://localhost:3000/api/user/login>**

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "password": "1234"
}
```

---

## Log Out User

**POST <http://localhost:3000/api/user/logout>**

`JSON: Request`

```json
{}
```

---

## Reset User Password

**POST <http://localhost:3000/api/user/resetpassword>**

`JSON: Request`

```json
{
  "email": "abby@test.com"
}
```

---

## Change User Password

**POST <http://localhost:3000/api/user/changepassword>**

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "password": "456"
}
```

---

## Change User Name

**POST <http://localhost:3000/api/user/changename>**

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "name": "abigail"
}
```

---

## Get Posts

**GET <http://localhost:3000/api/post>**

`JSON: Response`

```json
[
  {
    "post_id": 1,
    "user": {
      "user_id": 4,
      "email": "shaogamers@gmail.com",
      "name": "shao",
      "access_type": 1,
      "avatar_color": "grape"
    },
    "title": "title1",
    "body": "this is some body 1",
    "categories": "food,groceries,design",
    "created_dt": 1671283391,
    "views": 2,
    "likes": 1,
    "comments": 2
  }
]
```

**GET <http://localhost:3000/api/post/1>**
`(by post_id)`

`JSON: Response`

```json
  {
    "post_id": 1,
    "user_id": 1,
    "author_name": "abby",
    "author_email": "abby@test.com",
    "title": "title1",
    "body": "this is some body 1",
    "created_dt": 1670636188,
    "views": 0,
    "likes": 0
  },
```

---

## Create Post

**POST <http://localhost:3000/api/post/add>**

`JSON: Request`

```json
{
  "title": "title1",
  "body": "this is some body text 1",
  "category": "food,entertainment,fitness"
}
```

---

## Delete Post

**POST <http://localhost:3000/api/post/delete/1>** `(post_id = 1)`

`JSON: Request`

```json
{}
```

---

## Get Comments For Post

**GET <http://localhost:3000/api/post/1/comment>** `(post_id = 1)`

`JSON: Response`

```json
[
  {
    "comment_id": 2,
    "user": {
      "user_id": 1,
      "email": "abby@test.com",
      "name": "abby",
      "access_type": 1,
      "avatar_color": "dark"
    },
    "post_id": 1,
    "content": "this is some content 2",
    "created_dt": 1671284028
  },
  {
    "comment_id": 1,
    "user": {
      "user_id": 2,
      "email": "bob@test.com",
      "name": "bob",
      "access_type": 1,
      "avatar_color": "red"
    },
    "post_id": 1,
    "content": "this is some content 1",
    "created_dt": 1671284028
  }
]
```

---

## Contributing to Web Forum

To contribute to Web Forum, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b master`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin web_forum/master`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

---

## Author Info

👤 **Lee Shao Wee**

- Portfolio Website: https://leeshaowee.netlify.app/
- Github: [@shaowi](https://github.com/shaowi)

---

## Show your support

Give a ⭐️ if this project helped you!

[Back To The Top](#web-forum)
