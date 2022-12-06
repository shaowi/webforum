DROP TABLE IF EXISTS User, Post, Comment, View, Like 

CREATE TABLE User (
    id INT SERIAL,
    email_address VARCHAR(255),    
    password VARCHAR(255) NOT NULL,    
    nickname VARCHAR(50) NOT NULL,    
    access_type INT NOT NULL
    PRIMARY KEY(id, email_address)
);

CREATE TABLE Post (
    id INT SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,    
    body VARCHAR(1000) NOT NULL,    
    created_dt TIMESTAMP NOT NULL
);

CREATE TABLE Comment (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_dt TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (post_id) REFERENCES Post(id),
    PRIMARY KEY(user_id, post_id, creation_dt)
);

CREATE TABLE View (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    count INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (post_id) REFERENCES Post(id),
    PRIMARY KEY(user_id, post_id)
);

CREATE TABLE Like (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (post_id) REFERENCES Post(id),
    PRIMARY KEY(user_id, post_id)
);

