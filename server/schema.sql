-- ========================================================
-- CodeVidya CS Academy - Pure MySQL Database Schema
-- Database: codevidya_db (MySQL 8.0)
-- ========================================================

CREATE DATABASE IF NOT EXISTS `codevidya_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `codevidya_db`;

-- 1. Users Table (Student Authentication with Gmail & Phone)
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `phone` VARCHAR(20) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('student', 'instructor', 'admin') DEFAULT 'student',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_user_email` (`email`),
    INDEX `idx_user_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Orders & Practice Sheet Purchases
CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` VARCHAR(50) NOT NULL UNIQUE,
    `user_email` VARCHAR(150) NOT NULL,
    `course_id` VARCHAR(50) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'SUCCESS',
    `payment_method` VARCHAR(50) DEFAULT 'UPI',
    `coupon_applied` VARCHAR(30) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_order_user` (`user_email`),
    INDEX `idx_order_course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Verified Certificates Table
CREATE TABLE IF NOT EXISTS `certificates` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cert_id` VARCHAR(50) NOT NULL UNIQUE,
    `student_name` VARCHAR(150) NOT NULL,
    `course_id` VARCHAR(50) NOT NULL,
    `course_title` VARCHAR(200) NOT NULL,
    `score_percentage` INT NOT NULL,
    `issue_date` VARCHAR(50) NOT NULL,
    `hash_signature` VARCHAR(64) NOT NULL,
    `status` ENUM('VERIFIED_ACTIVE', 'REVOKED') DEFAULT 'VERIFIED_ACTIVE',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_cert_id` (`cert_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Lecture Watch Progress Table
CREATE TABLE IF NOT EXISTS `course_progress` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_email` VARCHAR(150) NOT NULL,
    `course_id` VARCHAR(50) NOT NULL,
    `lecture_id` VARCHAR(50) NOT NULL,
    `completed` BOOLEAN DEFAULT TRUE,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_user_lecture` (`user_email`, `course_id`, `lecture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Seed Demo Students & Certificates for immediate testing
INSERT INTO `users` (`name`, `email`, `phone`, `password_hash`, `role`)
VALUES 
('Aditya Sharma', 'aditya.sharma@gmail.com', '9876543210', '$2b$10$vzoZ1WszHzMxkEfWBjG1de0TfpDY2/6h69mavA3AWbhWojKvXO5/O', 'student'),
('Rahul Verma', 'rahul.verma@gmail.com', '9123456780', '$2b$10$vzoZ1WszHzMxkEfWBjG1de0TfpDY2/6h69mavA3AWbhWojKvXO5/O', 'student')
ON DUPLICATE KEY UPDATE `phone` = VALUES(`phone`), `password_hash` = VALUES(`password_hash`);

INSERT INTO `certificates` (`cert_id`, `student_name`, `course_id`, `course_title`, `score_percentage`, `issue_date`, `hash_signature`, `status`)
VALUES 
('CV-2026-DSA-8912', 'Aarav Patel', 'dsa-mastery', 'Data Structures & Algorithms (DSA Mastery)', 95, 'January 14, 2026', 'a7f1c3d9b5e8246109348dbe52c1e8a93b45f612089ca214e9541a7d65b4329e', 'VERIFIED_ACTIVE'),
('CV-2026-JAV-7421', 'Neha Sen', 'java-mastery', 'Java Masterclass (Core Java, OOPs & Multithreading)', 92, 'February 10, 2026', 'b8e2d4c0a6f9357210459ecf63d2f9b04c56a723190db325f0652b8e76c5430f', 'VERIFIED_ACTIVE'),
('CV-2026-OS-4521', 'Sneha Roy', 'os-systems', 'Operating Systems & System Architecture', 88, 'February 20, 2026', 'c9f3e5d1b7a0468321560fde74e3a0c15d67b834201ec436a1763c9f87d6541a', 'VERIFIED_ACTIVE')
ON DUPLICATE KEY UPDATE `status` = 'VERIFIED_ACTIVE';

INSERT INTO `orders` (`order_id`, `user_email`, `course_id`, `amount`, `status`, `payment_method`, `coupon_applied`)
VALUES 
('ORD-2026-DSA-DEMO', 'aditya.sharma@gmail.com', 'dsa-mastery', 149.00, 'SUCCESS', 'UPI', 'CSFREE'),
('ORD-2026-JAV-DEMO', 'aditya.sharma@gmail.com', 'java-mastery', 74.50, 'SUCCESS', 'UPI', 'CS50')
ON DUPLICATE KEY UPDATE `status` = 'SUCCESS';
