-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: customermanagementdb
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CustomerID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT NULL,
  `ClassificationID` int DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CustomerID`),
  KEY `ClassificationID` (`ClassificationID`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`ClassificationID`) REFERENCES `customer_classification` (`ClassificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'John Doe','john.doe@example.com','123456789','123 Elm Street, Springfield','1985-07-20','Male',1,'2024-12-11 06:37:32','2024-12-11 06:37:32'),(2,'Jane Smith','jane.smith@example.com','987654321','456 Maple Avenue, Springfield','1990-05-15','Female',2,'2024-12-11 06:37:32','2024-12-11 06:37:32'),(3,'Alice Johnson','alice.johnson@example.com','555678123','789 Pine Road, Springfield','1992-09-10','Female',3,'2024-12-11 06:37:32','2024-12-11 06:37:32'),(4,'Robert Brown','robert.brown@example.com','321654987','101 Oak Lane, Springfield','1980-01-25','Male',1,'2024-12-11 06:37:32','2024-12-11 06:37:32'),(5,'Emma Wilson','emma.wilson@example.com','444555666','202 Birch Way, Springfield','1995-03-30','Female',2,'2024-12-11 06:37:32','2024-12-11 06:37:32');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_classification`
--

DROP TABLE IF EXISTS `customer_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_classification` (
  `ClassificationID` int NOT NULL AUTO_INCREMENT,
  `ClassificationName` varchar(100) NOT NULL,
  PRIMARY KEY (`ClassificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_classification`
--

LOCK TABLES `customer_classification` WRITE;
/*!40000 ALTER TABLE `customer_classification` DISABLE KEYS */;
INSERT INTO `customer_classification` VALUES (1,'VIP'),(2,'Normal'),(3,'Potential');
/*!40000 ALTER TABLE `customer_classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `departmentId` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`departmentId`),
  UNIQUE KEY `departmentName` (`departmentName`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (18,'Marketing','2024-12-11 14:45:45','2024-12-11 14:45:45'),(19,'Kế toán','2024-12-11 14:45:53','2024-12-11 14:45:53'),(20,'Nhân sự','2024-12-11 14:45:59','2024-12-11 14:45:59'),(21,'Đấu thầu','2024-12-11 15:10:19','2024-12-11 15:10:19'),(22,'Công nghệ thông tin','2024-12-11 16:10:32','2024-12-11 16:10:32'),(23,'Bảo vệ','2024-12-11 17:45:11','2024-12-11 17:45:11');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `EventTypeID` int DEFAULT NULL,
  `EventDate` date NOT NULL,
  `Description` text,
  `ReminderDate` date DEFAULT NULL,
  `ReminderSent` tinyint(1) DEFAULT '0',
  `Status` enum('PLANNED','COMPLETED','CANCELED') DEFAULT 'PLANNED',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`EventID`),
  KEY `EventTypeID` (`EventTypeID`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`EventTypeID`) REFERENCES `event_type` (`EventTypeID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1,'2024-12-15','Sự kiện đám cưới tại bãi biển','2024-12-10',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32'),(2,2,'2024-12-20','Hội thảo công nghệ hàng năm tại Hà Nội','2024-12-18',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32'),(3,3,'2024-12-25','Tiệc sinh nhật bất ngờ cho một người bạn','2024-12-23',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32'),(4,4,'2024-12-30','Sự kiện doanh nghiệp cuối năm','2024-12-28',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32'),(5,1,'2024-12-15','Sự kiện đám cưới tại bãi biển','2024-12-10',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32'),(6,2,'2024-12-20','Hội thảo công nghệ hàng năm tại Hà Nội','2024-12-18',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32'),(7,3,'2024-12-25','Tiệc sinh nhật bất ngờ cho một người bạn','2024-12-23',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32'),(8,4,'2024-12-30','Sự kiện doanh nghiệp cuối năm','2024-12-28',0,'PLANNED','2024-12-11 06:37:32','2024-12-11 06:37:32');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_notifications`
--

DROP TABLE IF EXISTS `event_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_notifications` (
  `NotificationID` int NOT NULL AUTO_INCREMENT,
  `EventUserID` int NOT NULL,
  `Method` enum('Email','SMS','PhoneCall') NOT NULL,
  `Status` enum('Success','Failed','Pending') DEFAULT 'Pending',
  `sentAt` timestamp NULL DEFAULT NULL,
  `Message` text,
  PRIMARY KEY (`NotificationID`),
  KEY `EventUserID` (`EventUserID`),
  CONSTRAINT `event_notifications_ibfk_1` FOREIGN KEY (`EventUserID`) REFERENCES `event_users` (`EventUserID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_notifications`
--

LOCK TABLES `event_notifications` WRITE;
/*!40000 ALTER TABLE `event_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_type`
--

DROP TABLE IF EXISTS `event_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_type` (
  `EventTypeID` int NOT NULL AUTO_INCREMENT,
  `EventTypeName` varchar(100) NOT NULL,
  PRIMARY KEY (`EventTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_type`
--

LOCK TABLES `event_type` WRITE;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
INSERT INTO `event_type` VALUES (1,'Đám cưới'),(2,'Hội thảo'),(3,'Tiệc sinh nhật'),(4,'Sự kiện doanh nghiệp'),(5,'Đám cưới'),(6,'Hội thảo'),(7,'Tiệc sinh nhật'),(8,'Sự kiện doanh nghiệp');
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_users`
--

DROP TABLE IF EXISTS `event_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_users` (
  `EventUserID` int NOT NULL AUTO_INCREMENT,
  `EventID` int NOT NULL,
  `UserID` int NOT NULL,
  `CustomerID` int NOT NULL,
  PRIMARY KEY (`EventUserID`),
  UNIQUE KEY `unique_event_customer` (`EventID`,`CustomerID`),
  KEY `UserID` (`UserID`),
  KEY `CustomerID` (`CustomerID`),
  CONSTRAINT `event_users_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `event` (`EventID`) ON DELETE CASCADE,
  CONSTRAINT `event_users_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE,
  CONSTRAINT `event_users_ibfk_3` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_users`
--

LOCK TABLES `event_users` WRITE;
/*!40000 ALTER TABLE `event_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `CustomerID` int DEFAULT NULL,
  `ProjectID` int DEFAULT NULL,
  `InstallmentNumber` int DEFAULT NULL,
  `Amount` decimal(20,2) DEFAULT NULL,
  `PaymentDate` date DEFAULT NULL,
  `PaymentStatus` enum('Pending','Paid','Failed') DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`PaymentID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `ProjectID` int NOT NULL AUTO_INCREMENT,
  `CustomerID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `ProjectName` varchar(255) NOT NULL,
  `Description` text,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Status` enum('Ongoing','Completed','Accepted_NotPaid','Canceled') NOT NULL,
  `ProjectTypeID` int DEFAULT NULL,
  `TotalAmount` decimal(20,2) DEFAULT NULL,
  `PaidAmount` decimal(20,2) DEFAULT '0.00',
  `RemainingAmount` decimal(20,2) GENERATED ALWAYS AS ((`TotalAmount` - `PaidAmount`)) STORED,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ProjectID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `UserID` (`UserID`),
  KEY `ProjectTypeID` (`ProjectTypeID`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`) ON DELETE SET NULL,
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE SET NULL,
  CONSTRAINT `project_ibfk_3` FOREIGN KEY (`ProjectTypeID`) REFERENCES `project_type` (`ProjectTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_type`
--

DROP TABLE IF EXISTS `project_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_type` (
  `ProjectTypeID` int NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(100) NOT NULL,
  PRIMARY KEY (`ProjectTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_type`
--

LOCK TABLES `project_type` WRITE;
/*!40000 ALTER TABLE `project_type` DISABLE KEYS */;
INSERT INTO `project_type` VALUES (1,'Resort'),(2,'High-Rise'),(3,'Luxury Housing'),(4,'Residential Area'),(5,'Factory');
/*!40000 ALTER TABLE `project_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Role` enum('Admin','Staff','Manager') NOT NULL,
  `Avatar` varchar(255) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `departmentId` int DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`),
  KEY `fk_department_user` (`departmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin123','Admin User','admin@example.com','Admin','avatar_admin.png','2024-12-11 06:37:32','2024-12-11 06:37:32',NULL),(2,'john_doe','john123','John Doe','john.doe@example.com','Manager','avatar_john.png','2024-12-11 06:37:32','2024-12-11 18:17:03',20),(3,'jane_smith','jane123','Jane Smith','jane.smith@example.com','Manager','avatar_jane.png','2024-12-11 06:37:32','2024-12-11 18:17:29',23),(4,'alice_johnson','alice123','Alice Johnson','alice.johnson@example.com','Staff','avatar_alice.png','2024-12-11 06:37:32','2024-12-11 06:37:32',NULL),(5,'robert_brown','robert123','Robert Brown','robert.brown@example.com','Manager','avatar_robert.png','2024-12-11 06:37:32','2024-12-11 06:37:32',NULL),(7,'minhtri0202','123456',NULL,'johnddddoe@example.com','Manager',NULL,'2024-12-11 15:09:01','2024-12-11 15:09:01',NULL),(8,'johndoe','securepassword','John Doe','johndoe@example.com','Manager',NULL,'2024-12-11 15:28:26','2024-12-11 15:28:26',NULL),(11,'johddsndoe','sedsdscurepassword','John Doe','johndsdoe@example.com','Manager',NULL,'2024-12-11 15:42:45','2024-12-11 16:16:48',NULL),(16,'jane_doe','abcdef','Jane Doe','jane.doe@example.com','Staff',NULL,'2024-12-11 17:42:05','2024-12-11 17:43:25',22),(17,'dsadasd','dasdas','dsadsadwew','ccxbbgfd@gmail.com','Manager',NULL,'2024-12-11 17:46:50','2024-12-11 17:46:50',NULL),(18,'testuser','password123','Test User','testuser@example.com','Manager',NULL,'2024-12-11 18:04:20','2024-12-11 18:16:46',19),(20,'testuser1','password123','Test Userwwr','testusdsder@example.com','Manager',NULL,'2024-12-11 18:05:13','2024-12-11 18:12:17',18);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12  1:22:51
