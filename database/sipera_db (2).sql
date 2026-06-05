-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2026 at 12:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sipera_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `senderId`, `receiverId`, `message`, `isRead`, `createdAt`, `updatedAt`) VALUES
(1, 4, 5, 'Halo, apakah kerbau masih tersedia?', 0, '2026-05-24 14:52:12', '2026-05-24 14:52:12'),
(2, 4, 5, 'hlo', 0, '2026-05-24 15:14:14', '2026-05-24 15:14:14'),
(3, 4, 5, 'p', 0, '2026-05-25 03:40:58', '2026-05-25 03:40:58'),
(4, 5, 4, 'halo epa', 0, '2026-05-25 03:41:20', '2026-05-25 03:41:20'),
(5, 5, 4, 'halo', 0, '2026-05-25 03:41:25', '2026-05-25 03:41:25'),
(6, 4, 5, 'halo', 0, '2026-05-25 03:41:29', '2026-05-25 03:41:29'),
(7, 4, 5, 'p', 0, '2026-05-25 03:41:36', '2026-05-25 03:41:36'),
(8, 4, 1, 'p', 0, '2026-05-30 04:52:01', '2026-05-30 04:52:01'),
(9, 4, 1, 'hai', 0, '2026-05-30 04:52:05', '2026-05-30 04:52:05'),
(10, 5, 4, 'halo dari postman', 0, '2026-06-05 03:34:57', '2026-06-05 03:34:57'),
(11, 4, 5, 'hi', 0, '2026-06-05 03:47:47', '2026-06-05 03:47:47');

-- --------------------------------------------------------

--
-- Table structure for table `pesanans`
--

CREATE TABLE `pesanans` (
  `id` int(11) NOT NULL,
  `pembeliId` int(11) NOT NULL,
  `penjualId` int(11) NOT NULL,
  `ternakId` int(11) NOT NULL,
  `namaPembeli` varchar(255) NOT NULL,
  `namaTernak` varchar(255) NOT NULL,
  `jumlah` int(11) NOT NULL DEFAULT 1,
  `total` int(11) NOT NULL,
  `status` enum('Menunggu','Diproses','Selesai','Dibatalkan') DEFAULT 'Menunggu',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanans`
--

INSERT INTO `pesanans` (`id`, `pembeliId`, `penjualId`, `ternakId`, `namaPembeli`, `namaTernak`, `jumlah`, `total`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 4, 5, 11, 'epa', 'kambing', 1, 5000000, 'Menunggu', '2026-05-30 05:09:46', '2026-05-30 05:09:46');

-- --------------------------------------------------------

--
-- Table structure for table `ternaks`
--

CREATE TABLE `ternaks` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `usia` varchar(255) DEFAULT NULL,
  `kondisi` varchar(255) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ternaks`
--

INSERT INTO `ternaks` (`id`, `nama`, `jenis`, `harga`, `usia`, `kondisi`, `stok`, `lokasi`, `deskripsi`, `createdAt`, `updatedAt`, `userId`, `foto`) VALUES
(8, 'ular', 'jantan', 30000, '6 tahun', 'sehat', 2, 'toraja utara', 'kambing imut', '2026-05-19 07:36:13', '2026-05-19 07:36:13', 1, '1779176173410-297629329.png'),
(10, 'kerbau', 'Kerbau', 10000000, '4 tahun', 'Sehat', 5, 'toraja', 'baik', '2026-05-23 06:43:28', '2026-05-23 06:43:28', 5, '1779518608549-231744240.jpeg'),
(11, 'kambing', 'Kambing', 5000000, '4 tahun', 'Sehat', 4, 'tanah toraja', 'bersih', '2026-05-23 06:44:30', '2026-05-23 06:44:30', 5, '1779518670767-414589704.jpeg'),
(13, 'ayam', 'Ayam', 100000, '3 tahun', 'Sehat', 10, 'parepare', 'sehat', '2026-05-25 04:30:17', '2026-05-25 06:20:10', 5, '1779683417623-567075646.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','penjual','pembeli') NOT NULL,
  `noTelepon` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('Aktif','Ditangguhkan') NOT NULL DEFAULT 'Aktif',
  `namaBank` varchar(255) DEFAULT NULL,
  `nomorRekening` varchar(255) DEFAULT NULL,
  `namaPemilikRekening` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `noTelepon`, `alamat`, `createdAt`, `updatedAt`, `status`, `namaBank`, `nomorRekening`, `namaPemilikRekening`) VALUES
(1, 'User Testing', 'user@test.com', '123456', 'pembeli', '08123456789', 'Toraja', '2026-05-09 12:08:18', '2026-05-09 12:08:18', 'Aktif', NULL, NULL, NULL),
(2, 'Suci Test', 'suci@test.com', '$2b$10$Yz1doMhMDRHgJ/jV1kDi3e/KRsdMyEIdPLAai6nKu6aSQJTk9R/o6', 'pembeli', '08123456789', 'Toraja', '2026-05-09 12:08:19', '2026-05-21 01:18:52', 'Ditangguhkan', NULL, NULL, NULL),
(3, 'Admin SIPERA', 'admin@sipera.com', '$2b$10$BI9SFhTPrP/djeaiDzrV3O7uPXAn0FSfSLOjN94RcTeSDC.XXeuKC', 'admin', '081234567890', 'Toraja', '2026-05-13 10:20:24', '2026-05-13 10:20:24', 'Aktif', NULL, NULL, NULL),
(4, 'epa', 'epa123@gmail.com', '$2b$10$QRTZGat/ebnz1o.Luh7Mie5pdJX1VKM0OHjW9/KqmexF.nkWkgVhC', 'pembeli', '123456789', 'jl.singa', '2026-05-20 17:18:50', '2026-05-21 01:20:32', 'Aktif', NULL, NULL, NULL),
(5, 'lulu', 'lulu123@gmail.com', '$2b$10$g9QgeADZ5v4C14vzWtXIhOPE8.JPz1jaiRhULQj3QjlUW.Rq4Hb8K', 'penjual', '123456789', 'jakarta', '2026-05-20 17:44:40', '2026-06-05 03:16:09', 'Aktif', 'bri', '309287733526289393939', 'lulu annisa'),
(6, 'aul', 'aul123@gmail.com', '$2b$10$74LrNKUUDqhZTjFUSKNpj.Silb/6b.MqO8PjCvMJD5tCwrjmNEnHC', 'penjual', '081234567802', 'Toraja', '2026-05-21 01:11:04', '2026-05-21 01:11:04', 'Aktif', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pesanans`
--
ALTER TABLE `pesanans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ternaks`
--
ALTER TABLE `ternaks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ternaks_users` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pesanans`
--
ALTER TABLE `pesanans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ternaks`
--
ALTER TABLE `ternaks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ternaks`
--
ALTER TABLE `ternaks`
  ADD CONSTRAINT `fk_ternaks_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
