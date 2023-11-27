CREATE TABLE `Users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `Gender` varchar(100),
  `Age` integer,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `password` varchar(100),
  `self_intro` varchar(100),
  `picture` varchar(100),
  `Created_at` timestamp,
  `admin` bool DEFAULT 0
);

CREATE TABLE `Level` (
  `user_id` int PRIMARY KEY,
  `Badminton` integer DEFAULT 0,
  `Basketball` integer DEFAULT 0,
  `Volleyball` integer DEFAULT 0,
  `Baseball` integer DEFAULT 0,
  `Tabletennis` integer default 0,
  `Swimming` integer default 0,
  `Tennis` integer default 0,
  `Gym` integer default 0
);

CREATE TABLE `Order_info` (
  `reservation_id` integer,
  `user_id` int,
  `read` bool DEFAULT 0,
  PRIMARY KEY (`reservation_id`, `user_id`)
);

CREATE TABLE `Stadiums` (
  `stadium_id` integer AUTO_INCREMENT,
  `name`varchar(50),
  `address` varchar(100),
  `price` integer NOT NULL,
  `max_capacity` int NOT NULL,
  `availble` bool NOT NULL,
  `picture` varchar(100) DEFAULT "http://test.com",
  `admin_id` integer NOT NULL,
  `rule` varchar(100),
  `category` varchar(50),
  PRIMARY KEY (`stadium_id`),
  INDEX `admin_idx` (`admin_id`)
);

CREATE TABLE `TimeSlots` (
  `timeslot_id` INT PRIMARY KEY AUTO_INCREMENT,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL
);

CREATE TABLE `Activity` (
  `reservation_id` int PRIMARY KEY AUTO_INCREMENT,
  `stadium_id` int NOT NULL,
  `title` varchar(100),
  `timeslot` int,
  `note` varchar(100),
  `host_id` int,
  `max` int NOT NULL,
  `date` date,
  `level` int
);

CREATE TABLE `Feedback` (
  `feedback_id` int PRIMARY KEY AUTO_INCREMENT,
  `reservation_id` int,
  `stadium_id` int,
  `read` bool DEFAULT 0,
  `suggestion` varchar(100)
);

CREATE TABLE `Equipments` (
  `stadium_id` int PRIMARY KEY,
  `water` bool DEFAULT 0,
  `bathroom` bool DEFAULT 0,
  `air_condition` bool DEFAULT 0,
  `vending` bool DEFAULT 0,
  `rule` varchar(100)
);

CREATE TABLE `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
);

ALTER TABLE `Level` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Order_info` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Activity` ADD FOREIGN KEY (`reservation_id`) REFERENCES `Order_info` (`reservation_id`);

ALTER TABLE `Activity` ADD FOREIGN KEY (`stadium_id`) REFERENCES `Stadiums` (`stadium_id`);

ALTER TABLE `Activity` ADD FOREIGN KEY (`timeslot`) REFERENCES `TimeSlots` (`timeslot_id`);

ALTER TABLE `Feedback` ADD FOREIGN KEY (`reservation_id`) REFERENCES `Activity` (`reservation_id`);

ALTER TABLE `Feedback` ADD FOREIGN KEY (`stadium_id`) REFERENCES `Stadiums` (`stadium_id`);

ALTER TABLE `Equipments` ADD FOREIGN KEY (`stadium_id`) REFERENCES `Stadiums` (`stadium_id`);

ALTER TABLE `Activity` ADD FOREIGN KEY (`host_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Stadiums` ADD FOREIGN KEY (`admin_id`) REFERENCES `Users` (`user_id`);

