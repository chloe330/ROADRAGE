-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 27, 2025 at 12:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffeeweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `review_text` text NOT NULL,
  `likes` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `customer_name`, `review_text`, `likes`, `created_at`) VALUES
(3, 'Chloe', 'I love coffee', 10, '2024-12-16 09:03:07'),
(7, 'Jade', 'I loveee coffeee', 3, '2024-12-16 15:14:10'),
(11, 'Jade', 'I am actually really passionate about coffee everyday I think about coffee i live breathe and live off coffee \n\ncoffee fans please like and reply if you feel the same way ', 6, '2025-02-27 09:58:36'),
(22, 'Kelvin', 'I love nutty flavor coffee. Pair it with a nice almond cookie and a nice Saturday morning. It\'s perfect.', 2, '2025-04-23 09:29:04'),
(23, 'Josephine', 'I recently went to this speciality coffee shop called APRIL COFFEE LAB, it is based in Sai Ying Pun. I tried their pour over coffee with Ethiopia beans. They blend everything so nicely and their atmosphere is friendly. Highly recommend you guys to check it out <3\n', 3, '2025-04-23 09:34:23');

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `reply_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `comment_id`, `customer_name`, `reply_text`, `created_at`) VALUES
(6, 3, 'Chloe', 'me too', '2024-12-16 09:18:49'),
(7, 3, 'Jade', 'Me too', '2024-12-16 14:57:23'),
(8, 3, 'Jade', 'Me too', '2024-12-16 14:58:14'),
(9, 7, 'Jade', 'I also like chocolate milk', '2024-12-16 15:16:30'),
(10, 11, 'Chloe', 'You\'re crazy delete this', '2025-02-27 09:59:16'),
(12, 22, 'Jenny', 'Omg I love nutty coffee too! Twins\n', '2025-04-23 09:29:34'),
(13, 23, 'Kelvin', 'I will totally check it out!!\n', '2025-04-23 09:34:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_id` (`comment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
