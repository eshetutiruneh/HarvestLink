CREATE DATABASE IF NOT EXISTS harvestlink
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE harvestlink;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  location VARCHAR(160) NOT NULL,
  role ENUM('farmer', 'consumer', 'collector', 'driver', 'admin') NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('active', 'suspended') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB;
