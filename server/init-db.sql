-- Drop database if exists and create new one
DROP DATABASE IF EXISTS homestyle_realty;
CREATE DATABASE homestyle_realty;
USE homestyle_realty;

-- Create tables
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_email (email)
);

CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  property_need VARCHAR(255) NOT NULL,
  about TEXT NOT NULL,
  need TEXT NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  property_type VARCHAR(255) NOT NULL,
  price DECIMAL(15, 2),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (name, email, whatsapp) VALUES
('John Doe', 'john@example.com', '+1234567890'),
('Jane Smith', 'jane@example.com', '+0987654321'),
('Mike Johnson', 'mike@example.com', '+1122334455'),
('Sarah Williams', 'sarah@example.com', '+5544332211'),
('David Brown', 'david@example.com', '+9988776655');

INSERT INTO listings (title, description, image_url, location, property_type, price, status) VALUES
('Modern Pool Villa', 'Beautiful modern villa with private pool, featuring 5 bedrooms, smart home system, and panoramic views', '/images/house-pool.jpg', 'Beverly Hills', 'Villa', 1500000.00, 'For Sale'),
('Luxury Bedroom Suite', 'Master bedroom with modern amenities, walk-in closet, and ensuite bathroom', '/images/bedroom.jpg', 'Manhattan', 'Apartment', 800000.00, 'For Sale'),
('Cozy Living Space', 'Contemporary living room design with floor-to-ceiling windows and city views', '/images/living-room.jpg', 'Los Angeles', 'Apartment', 600000.00, 'For Rent'),
('Modern Architecture', 'Stunning modern house design with sustainable features', '/images/exterior.jpg', 'Miami', 'House', 2000000.00, 'For Sale'),
('Beachfront Condo', 'Luxurious condo with direct beach access and ocean views', '/images/beach-condo.jpg', 'Malibu', 'Condo', 1200000.00, 'For Sale'),
('Downtown Penthouse', 'Exclusive penthouse with private terrace and city skyline views', '/images/penthouse.jpg', 'New York', 'Penthouse', 3000000.00, 'For Sale'),
('Garden Apartment', 'Ground floor apartment with private garden and patio', '/images/garden-apt.jpg', 'San Francisco', 'Apartment', 900000.00, 'For Rent'),
('Mountain Retreat', 'Cozy mountain home with fireplace and scenic views', '/images/mountain-home.jpg', 'Aspen', 'House', 1800000.00, 'For Sale');

INSERT INTO reviews (user_id, rating, text) VALUES
(1, 5, 'Having a great experience with Homestyle Realty. The team is very professional and helpful. They found exactly what we were looking for within our budget.'),
(2, 4, 'Excellent service and communication throughout the process. Would recommend to friends and family.'),
(3, 5, 'The best real estate experience I''ve ever had. The team went above and beyond to help us find our dream home.'),
(4, 4, 'Very responsive and knowledgeable team. Made the whole process smooth and stress-free.'),
(5, 5, 'Incredible attention to detail and customer service. They really understand the market and client needs.'),
(1, 4, 'Second time using their services and still impressed with their professionalism.'),
(2, 5, 'They helped us sell our property above asking price. Very strategic and market-savvy team.'),
(3, 4, 'Great experience overall. The virtual tours saved us so much time in our search.');

-- Add some sample submissions
INSERT INTO submissions (user_id, location, property_need, about, need, status) VALUES
(1, 'Los Angeles', 'Family Home', 'Family of 4 looking for our first home', 'Need a 3-bedroom house with garden', 'Active'),
(2, 'New York', 'Investment Property', 'Experienced investor looking for opportunities', 'Looking for multi-unit buildings', 'Under Review'),
(3, 'Miami', 'Vacation Home', 'Seeking a beachfront property', 'Need a 2-bedroom condo with ocean view', 'Completed'),
(4, 'San Francisco', 'Commercial Space', 'Tech startup looking for office space', 'Need modern office space for 50 people', 'Active'); 