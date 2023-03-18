CREATE DATABASE  IF NOT EXISTS 'shop';

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

USE shop;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
    firstname VARCHAR(55) NOT NULL,
    lastname VARCHAR(55) NOT NULL,
    username VARCHAR(55) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(11) NOT NULL,
    password TEXT NOT  NULL,
    image TEXT NULL 
    vender 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (`id`)
)  ENGINE=INNODB;
CREATE TABLE IF NOT EXISTS roles(
    id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(11) NOT NULL
    bits INT NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (`id`)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS permission(
    id INT AUTO_INCREMENT PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(11) NOT NULL
    bits INT NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (`id`)
)  ENGINE=INNODB;