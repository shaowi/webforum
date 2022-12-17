# Web Forum

Web Forum is a `feature` that allows `businesses` to establish `communication between the producer, their suppliers and customers`.

- Serve as a platform for customers to provide feedbacks on consumer goods and services.

## Prerequisites

Before you begin, ensure you have met the following requirements:

<!--- These are just example requirements. Add, duplicate or remove as required --->

- You have installed the latest version of `Golang, Docker`
- You have a `<Windows/Linux/Mac>` machine. State which OS is supported/which is not.
- You have read `<guide/link/documentation_related_to_project>`.

## Installing <project_name>

To install <project_name>, follow these steps:

Linux and macOS:

```
<install_command>
```

Windows:

```
<install_command>
```

## Using <project_name>

To use <project_name>, follow these steps:

<!--
# Instructions to initialize PostgreSQL database

To initialize the database, you can either:

- Use `psql` CLI to execute [init.sql](init.sql) on the database that psql is connected to, or
- Run docker command: `docker compose up` from the root directory. After the container is up, the database will be listening on localhost:5000 with

  - server: localhost
  - database name: dev
  - port: 5000
  - username: postgres
  - password: 123

  You can use PgAdmin to connect to the database.

# Instructions to initialize frontend

Instructions for mac

- open terminal
- yarn start

---

Instructions for windows
download node.js

- npm install -g yarn

- yarn add vite (delete yarn.lock if any issues, worked for me)
  yarn --version (check if yarn is successfully installed)

  1)Pull branch from overview-page

  2)open terminal (windows)

- yarn start (opens at localhost:8080)

- in overview page now -->

```
<usage_example>
```

Add run commands and examples you think users will find useful. Provide an options reference for bonus points!

# API Definitions

- [Get User](#get-logged-in-user)
- [Create User](#create-user)
- [Log In User](#log-in-user)
- [Log Out User](#log-out-user)
- [Get Posts](#get-posts)
- [Create Post](#create-post)
- [Delete Post](#delete-post)
- [Get Comments For Post](#get-comments-for-post)

#

## Get Logged-In User

**GET <http://localhost:3000/api/user>**

#

`JSON: Response`

```json
{
  "user_id": 1,
  "email": "abby@test.com",
  "name": "abby",
  "access_type": 1
}
```

## Get User Stats

**GET <http://localhost:3000/api/userstats>**

#

`JSON: Response`

```json
{
  "mades": 1,
  "views": 2,
  "likes": 3
}
```

## Get User By Id

**GET <http://localhost:3000/api/user/:userId>**

#

`JSON: Response`

```json
{
  "user_id": 1,
  "email": "abby@test.com",
  "name": "abby",
  "access_type": 1
}
```

## Create User

**POST <http://localhost:3000/api/user/register>**

#

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "password": "1234",
  "name": "abby",
  "access_type": "1"
}
```

## Log In User

**POST <http://localhost:3000/api/user/login>**

#

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "password": "1234"
}
```

## Log Out User

**POST <http://localhost:3000/api/user/logout>**

#

`JSON: Request`

```json
{}
```

## Reset User Password

**POST <http://localhost:3000/api/user/resetpassword>**

#

`JSON: Request`

```json
{
  "email": "abby@test.com"
}
```

## Change User Password

**POST <http://localhost:3000/api/user/changepassword>**

#

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "password": "456"
}
```

## Change User Name

**POST <http://localhost:3000/api/user/changename>**

#

`JSON: Request`

```json
{
  "email": "abby@test.com",
  "name": "abigail"
}
```

## Get Posts

**GET <http://localhost:3000/api/post>**

#

`JSON: Response`

```json
[
  {
    "post_id": 1,
    "user_id": 1,
    "title": "title1",
    "body": "this is some body 1",
    "created_dt": 1670636188,
    "views": 0,
    "likes": 0
  }
]
```

**GET <http://localhost:3000/api/post/1>**
`(by post_id)`

#

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

## Create Post

**POST <http://localhost:3000/api/post/add>**

#

`JSON: Request`

```json
{
  "title": "title1",
  "body": "this is some body text 1",
  "category": "food,entertainment,fitness"
}
```

## Delete Post

**POST <http://localhost:3000/api/post/delete/1>** `(post_id = 1)`

#

`JSON: Request`

```json
{}
```

## Get Comments For Post

**GET <http://localhost:3000/api/post/1/comment>** `(post_id = 1)`

#

`JSON: Response`

```json
[
  {
    "comment_id": 1,
    "user_id": 1,
    "author_name": "abby",
    "author_email": "abby@test.com",
    "post_id": 1,
    "content": "this is some content 1",
    "created_dt": 1670636188
  },
  {
    "comment_id": 2,
    "user_id": 2,
    "author_name": "bob",
    "author_email": "bob@test.com",
    "post_id": 1,
    "content": "this is some content 2",
    "created_dt": 1670636188
  }
]
```

## Contributing to <project_name>

<!--- If your README is long or you have some specific process or steps you want contributors to follow, consider creating a separate CONTRIBUTING.md file--->

To contribute to <project_name>, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contributors

Thanks to the following people who have contributed to this project:

- [@scottydocs](https://github.com/scottydocs) 📖
- [@cainwatson](https://github.com/cainwatson) 🐛
- [@calchuchesta](https://github.com/calchuchesta) 🐛

You might want to consider using something like the [All Contributors](https://github.com/all-contributors/all-contributors) specification and its [emoji key](https://allcontributors.org/docs/en/emoji-key).

## Contact

If you want to contact me you can reach me at <your_email@address.com>.

## License

<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: [<license_name>](link).
