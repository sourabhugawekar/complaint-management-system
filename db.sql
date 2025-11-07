-- Online Complaint Management System Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS complaint_system;
USE complaint_system;

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    complaint_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT INTO complaints (name, email, phone, complaint_type, description, status) VALUES
('John Doe', 'john.doe@example.com', '1234567890', 'Technical', 'Website login issue - unable to access account', 'Pending'),
('Jane Smith', 'jane.smith@example.com', '9876543210', 'Billing', 'Incorrect charge on my last invoice', 'In Progress'),
('Mike Johnson', 'mike.j@example.com', '5551234567', 'Service', 'Delayed delivery of order #12345', 'Resolved'),
('Sarah Williams', 'sarah.w@example.com', '5559876543', 'Product', 'Defective product received', 'Pending'),
('David Brown', 'david.b@example.com', '5555555555', 'Technical', 'App crashes on startup', 'In Progress');

-- View all complaints
SELECT * FROM complaints;
