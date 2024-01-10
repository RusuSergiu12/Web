/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `web` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `web`;

CREATE TABLE IF NOT EXISTS `deliverable` (
  `DeliverableID` int(11) NOT NULL AUTO_INCREMENT,
  `ProjectID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `DueDate` datetime NOT NULL,
  PRIMARY KEY (`DeliverableID`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `deliverable_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `deliverable` (`DeliverableID`, `ProjectID`, `Title`, `Description`, `DueDate`) VALUES
	(1, 1, 'Sample Deliverable 1', 'This is a detailed description of the deliverable.', '2024-02-15 21:59:59'),
	(2, 1, 'Sample Deliverable 2', 'This is a detailed description of the deliverable.', '2024-02-15 21:59:59'),
	(3, 2, 'Sample Deliverable 11', 'This is a detailed description of the deliverable.', '2024-02-15 21:59:59');

CREATE TABLE IF NOT EXISTS `grade` (
  `GradeID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `DeliverableID` int(11) NOT NULL,
  `GradeValue` decimal(3,2) NOT NULL,
  `GradeDate` datetime NOT NULL,
  PRIMARY KEY (`GradeID`),
  KEY `UserID` (`UserID`),
  KEY `DeliverableID` (`DeliverableID`),
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`DeliverableID`) REFERENCES `deliverable` (`DeliverableID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `grade` (`GradeID`, `UserID`, `DeliverableID`, `GradeValue`, `GradeDate`) VALUES
	(1, 3, 1, 8.50, '2024-03-01 08:00:00'),
	(2, 3, 2, 7.50, '2024-03-01 08:00:00'),
	(4, 2, 3, 7.50, '2024-03-01 08:00:00'),
	(5, 4, 3, 7.50, '2024-03-01 08:00:00');

CREATE TABLE IF NOT EXISTS `permission` (
  `PermissionID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `CanGrade` tinyint(1) NOT NULL DEFAULT 0,
  `CanModifyGrade` tinyint(1) NOT NULL DEFAULT 0,
  `GradeModificationDeadline` datetime DEFAULT NULL,
  PRIMARY KEY (`PermissionID`),
  KEY `UserID` (`UserID`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `permission_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `permission` (`PermissionID`, `UserID`, `ProjectID`, `CanGrade`, `CanModifyGrade`, `GradeModificationDeadline`) VALUES
	(1, 2, 2, 1, 0, '2024-01-10 00:10:28'),
	(2, 4, 2, 1, 0, '2024-01-10 00:10:29'),
	(3, 4, 1, 0, 0, '2024-01-10 00:10:30'),
	(4, 2, 1, 1, 0, '2024-01-10 00:10:30'),
	(5, 3, 1, 1, 0, '2024-01-10 00:10:31'),
	(6, 3, 2, 0, 0, '2024-01-10 00:10:31');

CREATE TABLE IF NOT EXISTS `project` (
  `ProjectID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `VideoLink` varchar(255) DEFAULT NULL,
  `DeploymentLink` varchar(255) DEFAULT NULL,
  `FinalGrade` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProjectID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `project` (`ProjectID`, `Title`, `Description`, `VideoLink`, `DeploymentLink`, `FinalGrade`) VALUES
	(1, 'My Project', 'This is my project description.', 'https://example.com/video', 'https://example.com/deployment', NULL),
	(2, 'My Project2', 'This is my project description2.', 'https://example.com/video', 'https://example.com/deployment', NULL),
	(3, ' Proj', 'good Description', 'https://example.com/video', 'https://example.com/deployment', NULL),
	(4, 'proj4', 'dadada', 'https://example.com/deployment', 'https://example.com/deployment', NULL),
	(9, 'dasd', 'dasda', '41321', 'gsdfg', NULL),
	(10, 'Proj', 'Proj', 'https://example.com/', 'https://example.com/', NULL),
	(11, 'a', 'a', 'a', 'a', NULL);

CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UserType` enum('student','professor') NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `user` (`UserID`, `UserName`, `Email`, `Password`, `UserType`) VALUES
	(2, 'RusuSergiu', 'rusu21@stud.ase.ro', '123123', 'student'),
	(3, 'MileaRob', 'rob@stud.ase.ro', '123123', 'student'),
	(4, 'Licxandru Teodora', 'thea@stud.ase.ro', '123123', 'professor'),
	(5, 'newuser', 'newuser@gmail.com', 'dasdasd', 'student'),
	(6, 'newuser2', 'newuse2r@gmail.com', 'dasdasd', 'student'),
	(7, 'dada', 'dada@gmail.com', '123123', 'professor'),
	(15, 'usernew', 'usernew@gmail.com', '123', 'student');

CREATE TABLE IF NOT EXISTS `userprojects` (
  `UserID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  PRIMARY KEY (`UserID`,`ProjectID`),
  UNIQUE KEY `UserProjects_ProjectID_UserID_unique` (`UserID`,`ProjectID`),
  KEY `ProjectID` (`ProjectID`),
  CONSTRAINT `userprojects_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userprojects_ibfk_2` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `userprojects` (`UserID`, `ProjectID`) VALUES
	(2, 1),
	(2, 2),
	(3, 2),
	(2, 3),
	(2, 9),
	(5, 10);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
