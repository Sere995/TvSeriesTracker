CREATE DATABASE  IF NOT EXISTS `serietvdatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `serietvdatabase`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: serietvdatabase
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `serieutenti`
--

DROP TABLE IF EXISTS `serieutenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serieutenti` (
  `idserieutenti` int(11) NOT NULL AUTO_INCREMENT,
  `idserie` int(11) NOT NULL,
  `idutente` int(11) NOT NULL,
  PRIMARY KEY (`idserieutenti`),
  KEY `idutente_idx` (`idutente`),
  CONSTRAINT `idutente` FOREIGN KEY (`idutente`) REFERENCES `utenti` (`idutenti`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serieutenti`
--

LOCK TABLES `serieutenti` WRITE;
/*!40000 ALTER TABLE `serieutenti` DISABLE KEYS */;
INSERT INTO `serieutenti` VALUES (40,4087,7),(41,1435,7),(42,66573,7),(43,2131,7),(44,75219,7),(45,1403,8),(46,63174,8),(47,67136,8),(48,34524,8),(53,1668,8),(55,71712,8),(58,66732,8),(61,74016,8),(62,1622,8),(64,60735,8),(69,1416,8),(70,1412,8),(71,80986,8),(72,63174,9),(73,1416,9),(75,76479,9),(76,66732,9),(77,1622,9);
/*!40000 ALTER TABLE `serieutenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-25 16:44:06
