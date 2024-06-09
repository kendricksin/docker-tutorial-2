CREATE DATABASE IF NOT EXISTS mydatabase;

USE mydatabase;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO items (name) VALUES ('Apples');
INSERT INTO items (name) VALUES ('Bananas');
INSERT INTO items (name) VALUES ('Carrots');
INSERT INTO items (name) VALUES ('Bread');
INSERT INTO items (name) VALUES ('Milk');
