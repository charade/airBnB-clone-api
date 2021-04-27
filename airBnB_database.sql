CREATE DATABASE airbnb_clone_api;
USE airbnb_clone_api;
CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255),  password VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), role VARCHAR(10), PRIMARY KEY(id));
CREATE TABLE cities (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id));
CREATE TABLE places (id INT NOT NULL AUTO_INCREMENT, cities_id INT, users_id INT, name VARCHAR(255), description VARCHAR(255), rooms VARCHAR(255), bathrooms VARCHAR(255), max_guests INT NOT NULL, price_by_night INT NOT NULL, available LONGTEXT,FOREIGN KEY(users_id) REFERENCES users(id), FOREIGN KEY(cities_id) REFERENCES cities(id), PRIMARY KEY(id));
CREATE TABLE booking (id INT NOT NULL AUTO_INCREMENT, places_id INT, users_id INT, check_in TIMESTAMP, check_out TIMESTAMP, FOREIGN KEY(users_id) REFERENCES users(id), FOREIGN KEY(places_id) REFERENCES places(id),  PRIMARY KEY(id));