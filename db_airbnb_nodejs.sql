-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: db_airbnb_nodejs
-- Generation Time: 2024-10-05 13:34:34.0870
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `BinhLuan`;
CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(500) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  KEY `ma_cong_viec` (`ma_cong_viec`) USING BTREE,
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_cong_viec`) REFERENCES `Phong` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DatPhong`;
CREATE TABLE `DatPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ngay_den` datetime DEFAULT NULL,
  `ngay_di` datetime DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id`),
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `NguoiDung`;
CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `pass_word` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `birth_day` varchar(200) DEFAULT NULL,
  `gender` varchar(200) DEFAULT NULL,
  `role` varchar(200) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Phong`;
CREATE TABLE `Phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(200) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(500) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `hinh_anh` varchar(200) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ViTri`;
CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(200) DEFAULT NULL,
  `tinh_thanh` varchar(200) DEFAULT NULL,
  `quoc_gia` varchar(200) DEFAULT NULL,
  `hinh_anh` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 1, '2024-09-01 10:30:00', 'Phòng rất sạch sẽ và thoải mái.', 5),
(2, 2, 2, '2024-09-02 14:00:00', 'Dịch vụ tốt, nhưng phòng hơi nhỏ.', 4),
(3, 3, 3, '2024-09-03 16:45:00', 'Phòng không như mong đợi, nhưng giá cả hợp lý.', 3),
(4, 4, 4, '2024-09-04 09:00:00', 'Rất thích không gian và thiết kế của phòng.', 5),
(5, 5, 5, '2024-09-05 11:15:00', 'Phòng ổn, nhưng không có nhiều tiện ích.', 3),
(6, 6, 6, '2024-09-06 17:20:00', 'Dịch vụ khách sạn tuyệt vời và thân thiện.', 5),
(7, 7, 7, '2024-09-07 13:30:00', 'Giá hơi cao so với chất lượng phòng.', 3),
(8, 8, 8, '2024-09-08 08:50:00', 'View đẹp, phòng rộng và sạch sẽ.', 4),
(9, 9, 9, '2024-09-09 12:00:00', 'Phòng không sạch sẽ lắm, dịch vụ ổn.', 2),
(10, 10, 10, '2024-09-10 15:40:00', 'Phòng đẹp, dịch vụ tốt, sẽ quay lại.', 5),
(12, 1, 1, '2024-09-26 04:24:14', 'string', 4),
(14, 2, 2, '2024-09-26 12:26:44', '1', 1);

INSERT INTO `DatPhong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(1, 1, '2024-09-01 14:00:00', '2024-09-05 12:00:00', 4, 1),
(2, 2, '2024-09-10 15:00:00', '2024-09-12 11:00:00', 2, 2),
(3, 3, '2024-09-20 13:00:00', '2024-09-25 10:00:00', 6, 3),
(4, 4, '2024-10-01 16:00:00', '2024-10-05 12:00:00', 5, 4),
(5, 5, '2024-10-08 12:00:00', '2024-10-12 10:00:00', 2, 5),
(6, 6, '2024-10-15 14:30:00', '2024-10-20 11:00:00', 3, 6),
(7, 7, '2024-10-22 16:00:00', '2024-10-25 12:00:00', 8, 7),
(8, 8, '2024-11-01 14:00:00', '2024-11-05 12:00:00', 6, 8),
(9, 9, '2024-11-10 13:00:00', '2024-11-15 10:00:00', 1, 9),
(10, 10, '2024-11-20 12:00:00', '2024-11-25 11:00:00', 4, 10),
(14, 2, '2024-09-26 00:08:03', '2024-09-26 00:08:03', 2, 1),
(15, 1, '2024-09-26 00:08:03', '2024-09-28 00:08:03', 2, 1),
(16, 1, '2024-09-25 12:46:09', '2024-09-26 12:46:09', 0, 2),
(17, 1, '2024-10-05 06:04:44', '2024-10-08 06:04:44', 2, 1);

INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(1, 'Nguyen Van A', 'nguyenvana@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0909123456', '1990-01-15 00:00:00', 'Male', 'User', '1728082860766_DSC01580.jpg'),
(2, 'Tran Thi B', 'tranthib@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0909234567', '1992-02-20 00:00:00', 'Female', 'User', '/public/imgs/avatar/1727841061877_DSC01587.jpg'),
(3, 'Le Van C', 'levanc@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0909345678', '1985-03-25 00:00:00', 'Male', 'Admin', '/public/imgs/avatar/1727841157642_DSC01584.jpg'),
(4, 'Pham Thi D', 'phamthid@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0909456789', '1995-04-10 00:00:00', 'Female', 'User', '/public/imgs/avatar/1727841309147_DSC01584.jpg'),
(5, 'Nguyen Minh E', 'nguyenminhe@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0909567890', '2000-05-05 00:00:00', 'Male', 'Moderator', 'avatar5.jpg'),
(6, 'Hoang Thi F', 'hoangthif@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0910123456', '1991-06-12 00:00:00', 'Female', 'User', 'avatar6.jpg'),
(7, 'Vu Van G', 'vuvang@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0910234567', '1988-07-22 00:00:00', 'Male', 'User', 'avatar7.jpg'),
(8, 'Bui Thi H', 'buithih@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0910345678', '1993-08-18 00:00:00', 'Female', 'Admin', 'avatar8.jpg'),
(9, 'Dang Van I', 'dangvani@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0910456789', '1987-09-30 00:00:00', 'Male', 'Moderator', 'avatar9.jpg'),
(10, 'Nguyen Thi J', 'nguyenthij@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0910567890', '1998-10-10 00:00:00', 'Female', 'User', 'avatar10.jpg'),
(32, 'thanh', 'thanh@gmail.com', '$2b$10$6b02xD/eIh6ImUgSHy/MqOsMt.s3lFK.BhsUDQk6hX8ut4vjuiX3C', '0909090909', '24/9/2004', 'Male', 'Admin', 'thanhthanh.jpg'),
(35, 'lieuthanh', 'lieuthanh@gmail.com', '$2b$10$U9G83pKXVRwvPWMYyBMfK.OTCbGVXBwJz9vltqLpaqoFXIrj4jNVy', '0909222222', '16/8/1990', 'Male', 'User', 'lieuthanh.jpg');

INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `hinh_anh`, `ma_vi_tri`) VALUES
(1, 'Phòng Deluxe', 4, 2, 2, 2, 'Phòng rộng rãi với đầy đủ tiện nghi, view đẹp', 1000000, 1, 1, 1, 1, 1, 1, 1, 1, '1727856173577_DSC01581.jpg', 1),
(2, 'Phòng Standard', 2, 1, 1, 1, 'Phòng nhỏ gọn, phù hợp cho cặp đôi', 500000, 0, 0, 1, 0, 1, 0, 0, 0, 'standard.jpg', 2),
(3, 'Phòng Suite', 6, 3, 3, 3, 'Phòng cao cấp với view biển và nội thất sang trọng', 3000000, 1, 1, 1, 1, 1, 1, 1, 1, 'suite.jpg', 3),
(4, 'Phòng Family', 5, 2, 2, 2, 'Phòng rộng, phù hợp cho gia đình', 1500000, 1, 1, 1, 1, 1, 0, 1, 1, 'family.jpg', 4),
(5, 'Phòng Luxury', 2, 1, 1, 1, 'Phòng sang trọng với nội thất hiện đại', 2000000, 0, 1, 1, 1, 1, 1, 0, 1, 'luxury.jpg', 5),
(6, 'Phòng Studio', 3, 1, 1, 1, 'Phòng studio tiện nghi, thiết kế sáng tạo', 800000, 1, 0, 1, 1, 1, 0, 0, 0, 'studio.jpg', 6),
(7, 'Phòng Dormitory', 8, 4, 4, 2, 'Phòng ngủ chung với giường tầng, giá rẻ', 300000, 0, 0, 1, 0, 1, 0, 0, 0, 'dormitory.jpg', 7),
(8, 'Phòng Penthouse', 6, 3, 3, 3, 'Phòng penthouse với view thành phố, nội thất đẳng cấp', 5000000, 1, 1, 1, 1, 1, 1, 1, 1, 'penthouse.jpg', 8),
(9, 'Phòng Single', 1, 1, 1, 1, 'Phòng đơn nhỏ gọn, tiện lợi cho cá nhân', 400000, 0, 0, 1, 0, 1, 0, 0, 0, 'single.jpg', 9),
(10, 'Phòng VIP', 4, 2, 2, 2, 'Phòng VIP với đầy đủ dịch vụ cao cấp, view tuyệt đẹp', 2500000, 1, 1, 1, 1, 1, 1, 1, 1, 'vip.jpg', 10),
(11, 'string', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 1),
(18, 'string', 2, 1, 1, 1, 'string', 1500000, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 2),
(20, 'string', 2, 1, 1, 1, 'string', 1500000, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 10),
(21, 'string', 2, 1, 1, 1, 'string', 1500000, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 10),
(22, '1', 1, 1, 1, 1, '1', 1111, 0, 0, 0, 0, 0, 0, 0, 0, '1', 1);

INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(1, 'Cầu Rồng', 'Đà Nẵng', 'Việt Nam', '1728108221883_DSC01588.jpg'),
(2, 'Tháp Eiffel', 'Paris', 'Pháp', 'thapeiffel.jpg'),
(3, 'Nhà hát Sydney', 'Sydney', 'Úc', 'sydneyopera.jpg'),
(4, 'Tháp nghiêng Pisa', 'Pisa', 'Ý', 'pisa.jpg'),
(5, 'Vạn Lý Trường Thành', 'Bắc Kinh', 'Trung Quốc', 'vanlytruongthanh.jpg'),
(6, 'Kim Tự Tháp Giza', 'Giza', 'Ai Cập', 'kimtuthapgiza.jpg'),
(7, 'Tượng Nữ Thần Tự Do', 'New York', 'Mỹ', 'tượngnuocmỹ.jpg'),
(8, 'Đảo Jeju', 'Jeju', 'Hàn Quốc', 'daojeju.jpg'),
(9, 'Thác Iguazu', 'Misiones', 'Argentina', 'thaciguazu.jpg'),
(10, 'Núi Phú Sĩ', 'Honshu', 'Nhật Bản', 'nuifusi.jpg'),
(14, '1', '1', '1', '1');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;