CREATE DATABASE stadiums;
USE stadiums;

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(255),
    badminton INT,
    basketball INT,
    table_tennis INT,
    baseball INT,
    self_intro TEXT,
    picture_url VARCHAR(255)
);


CREATE TABLE activities (
    activity_id INT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level INT,
    people INT,
    status VARCHAR(255),
    time VARCHAR(255),
    stadium_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (stadium_id) REFERENCES stadiums(stadium_id)
);

CREATE TABLE events (
    event_id INT PRIMARY KEY,
    user_id INT,
    stadium_id INT,
    activity_id INT,
    name VARCHAR(255) NOT NULL,
    is_read BOOLEAN,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (stadium_id) REFERENCES stadiums(stadium_id),
    FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
);


CREATE TABLE stadiums (
    stadium_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    bathroom BOOLEAN,
    air_condition BOOLEAN,
    vending BOOLEAN,
    water BOOLEAN
);
