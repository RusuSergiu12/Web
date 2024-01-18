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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `deliverable` (`DeliverableID`, `ProjectID`, `Title`, `Description`, `DueDate`) VALUES
	(1, 1, 'Sample Deliverable 1', 'This is a detailed description of the deliverable.', '2024-02-15 21:59:59'),
	(2, 1, 'Sample Deliverable 2', 'This is a detailed description of the deliverable.', '2024-02-15 21:59:59'),
	(3, 2, 'Sample Deliverable 11', 'This is a detailed description of the deliverable.', '2024-02-15 21:59:59'),
	(40, 2, 'Sample Deliverable 69', 'dududu', '2002-01-12 00:00:00'),
	(41, 1, 'Deliverable 1 for Project 1', 'Description of Deliverable 1 for Project 1', '2024-02-15 23:59:59'),
	(42, 2, 'Deliverable 1 for Project 2', 'Description of Deliverable 1 for Project 2', '2023-02-20 23:59:59'),
	(43, 1, 'Deliverable 2 for Project 1', 'Description of Deliverable 2 for Project 1', '2024-03-10 23:59:59'),
	(44, 2, 'Deliverable new', 'A new deliverable', '2024-01-17 00:00:00'),
	(45, 2, 'dev', 'dev', '2023-11-12 00:00:00'),
	(46, 2, 'dev2', 'dev2', '2023-12-12 00:00:00'),
	(47, 2, 'New Deliverable New', 'This deliverable is new', '2024-01-24 00:00:00'),
	(48, 17, 'Deliverable 1 for Project 17', 'Description for Deliverable 1 of Project 17', '2024-06-01 00:00:00'),
	(49, 17, 'Deliverable 2 for Project 17', 'Description for Deliverable 2 of Project 17', '2024-07-01 00:00:00'),
	(50, 17, 'Deliverable 3 for Project 17', 'Description for Deliverable 3 of Project 17', '2024-08-01 00:00:00'),
	(51, 18, 'Deliverable 1 for Project 18', 'Description for Deliverable 1 of Project 18', '2024-06-02 00:00:00'),
	(52, 18, 'Deliverable 2 for Project 18', 'Description for Deliverable 2 of Project 18', '2024-07-02 00:00:00'),
	(53, 18, 'Deliverable 3 for Project 18', 'Description for Deliverable 3 of Project 18', '2024-08-02 00:00:00'),
	(54, 19, 'Deliverable 1 for Project 19', 'Description for Deliverable 1 of Project 19', '2024-06-03 00:00:00'),
	(55, 19, 'Deliverable 2 for Project 19', 'Description for Deliverable 2 of Project 19', '2024-07-03 00:00:00'),
	(56, 19, 'Deliverable 3 for Project 19', 'Description for Deliverable 3 of Project 19', '2024-08-03 00:00:00'),
	(57, 20, 'Deliverable 1 for Project 20', 'Description for Deliverable 1 of Project 20', '2024-06-04 00:00:00'),
	(58, 20, 'Deliverable 2 for Project 20', 'Description for Deliverable 2 of Project 20', '2024-07-04 00:00:00'),
	(59, 20, 'Deliverable 3 for Project 20', 'Description for Deliverable 3 of Project 20', '2024-08-04 00:00:00'),
	(60, 21, 'Deliverable 1 for Project 21', 'Description for Deliverable 1 of Project 21', '2024-06-05 00:00:00'),
	(61, 21, 'Deliverable 2 for Project 21', 'Description for Deliverable 2 of Project 21', '2024-07-05 00:00:00'),
	(62, 21, 'Deliverable 3 for Project 21', 'Description for Deliverable 3 of Project 21', '2024-08-05 00:00:00'),
	(63, 22, 'Deliverable 1 for Project 22', 'Description for Deliverable 1 of Project 22', '2024-06-06 00:00:00'),
	(64, 22, 'Deliverable 2 for Project 22', 'Description for Deliverable 2 of Project 22', '2024-07-06 00:00:00'),
	(65, 22, 'Deliverable 3 for Project 22', 'Description for Deliverable 3 of Project 22', '2024-08-06 00:00:00'),
	(66, 17, 'Deliverable 1 for Project 23', 'Description for Deliverable 1 of Project 23', '2024-06-07 00:00:00'),
	(67, 18, 'Deliverable 2 for Project 23', 'Description for Deliverable 2 of Project 23', '2024-07-07 00:00:00'),
	(68, 23, 'Deliverable 3 for Project 23', 'Description for Deliverable 3 of Project 23', '2024-08-07 00:00:00'),
	(69, 24, 'Deliverable 1 for Project 24', 'Description for Deliverable 1 of Project 24', '2024-06-08 00:00:00'),
	(70, 24, 'Deliverable 2 for Project 24', 'Description for Deliverable 2 of Project 24', '2024-07-08 00:00:00'),
	(71, 17, 'Deliverable 3 for Project 24', 'Description for Deliverable 3 of Project 24', '2024-08-08 00:00:00'),
	(72, 18, 'Deliverable 1 for Project 25', 'Description for Deliverable 1 of Project 25', '2024-06-09 00:00:00'),
	(73, 25, 'Deliverable 2 for Project 25', 'Description for Deliverable 2 of Project 25', '2024-07-09 00:00:00'),
	(74, 25, 'Deliverable 3 for Project 25', 'Description for Deliverable 3 of Project 25', '2024-08-09 00:00:00');

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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `grade` (`GradeID`, `UserID`, `DeliverableID`, `GradeValue`, `GradeDate`) VALUES
	(1, 3, 1, 3.00, '2024-01-18 00:43:43'),
	(5, 4, 3, 7.50, '2024-03-01 08:00:00'),
	(56, 3, 43, 6.00, '2024-01-18 10:00:00'),
	(60, 3, 2, 3.00, '2024-01-18 00:44:28'),
	(71, 27, 48, 8.50, '2024-01-18 00:00:00'),
	(72, 27, 48, 9.00, '2024-01-18 00:00:00'),
	(73, 27, 48, 7.50, '2024-01-18 00:00:00'),
	(74, 27, 49, 8.50, '2024-01-18 00:00:00'),
	(75, 27, 49, 9.00, '2024-01-18 00:00:00'),
	(76, 27, 49, 7.50, '2024-01-18 00:00:00'),
	(77, 27, 50, 8.50, '2024-01-18 00:00:00'),
	(78, 27, 50, 9.00, '2024-01-18 00:00:00'),
	(79, 27, 50, 7.50, '2024-01-18 00:00:00'),
	(80, 28, 48, 8.50, '2024-01-18 00:00:00'),
	(81, 28, 48, 9.00, '2024-01-18 00:00:00'),
	(82, 28, 48, 7.50, '2024-01-18 00:00:00'),
	(83, 28, 49, 8.50, '2024-01-18 00:00:00'),
	(84, 28, 49, 9.00, '2024-01-18 00:00:00'),
	(85, 28, 49, 7.50, '2024-01-18 00:00:00'),
	(86, 28, 50, 8.50, '2024-01-18 00:00:00'),
	(87, 28, 50, 9.00, '2024-01-18 00:00:00'),
	(88, 28, 50, 7.50, '2024-01-18 00:00:00'),
	(89, 28, 51, 8.50, '2024-01-18 00:00:00'),
	(90, 28, 51, 9.00, '2024-01-18 00:00:00'),
	(91, 28, 51, 7.50, '2024-01-18 00:00:00'),
	(92, 28, 52, 8.50, '2024-01-18 00:00:00'),
	(93, 28, 52, 9.00, '2024-01-18 00:00:00'),
	(94, 28, 49, 7.50, '2024-01-18 00:00:00'),
	(95, 28, 52, 8.50, '2024-01-18 00:00:00'),
	(96, 28, 52, 9.00, '2024-01-18 00:00:00'),
	(97, 28, 52, 7.50, '2024-01-18 00:00:00'),
	(98, 28, 51, 8.50, '2024-01-18 00:00:00'),
	(99, 28, 51, 9.00, '2024-01-18 00:00:00'),
	(100, 28, 51, 7.50, '2024-01-18 00:00:00'),
	(101, 28, 52, 8.50, '2024-01-18 00:00:00'),
	(102, 28, 52, 9.00, '2024-01-18 00:00:00'),
	(103, 28, 53, 7.50, '2024-01-18 00:00:00'),
	(104, 28, 53, 8.50, '2024-01-18 00:00:00'),
	(105, 28, 53, 9.00, '2024-01-18 00:00:00'),
	(106, 28, 52, 7.50, '2024-01-18 00:00:00'),
	(107, 28, 54, 8.50, '2024-01-18 00:00:00'),
	(108, 28, 54, 9.00, '2024-01-18 00:00:00'),
	(109, 28, 54, 7.50, '2024-01-18 00:00:00'),
	(110, 28, 56, 8.50, '2024-01-18 00:00:00'),
	(111, 28, 54, 9.00, '2024-01-18 00:00:00'),
	(112, 28, 56, 7.50, '2024-01-18 00:00:00'),
	(113, 28, 55, 8.50, '2024-01-18 00:00:00'),
	(114, 28, 56, 9.00, '2024-01-18 00:00:00'),
	(115, 28, 55, 7.50, '2024-01-18 00:00:00'),
	(116, 27, 66, 5.00, '2024-01-18 01:17:33');

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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `permission` (`PermissionID`, `UserID`, `ProjectID`, `CanGrade`, `CanModifyGrade`, `GradeModificationDeadline`) VALUES
	(41, 3, 13, 1, 1, '2024-01-20 16:50:21'),
	(42, 3, 15, 1, 1, '2024-01-20 16:50:25'),
	(43, 3, 1, 1, 1, '2024-01-25 16:50:28'),
	(45, 3, 14, 1, 1, '2024-01-20 23:36:20'),
	(47, 26, 13, 1, 1, '2024-01-21 01:13:37'),
	(48, 27, 14, 1, 1, '2024-01-21 01:13:57'),
	(49, 26, 20, 1, 1, '2024-06-30 23:59:59'),
	(50, 26, 21, 1, 1, '2024-06-30 23:59:59'),
	(51, 26, 22, 1, 1, '2024-06-30 23:59:59'),
	(52, 26, 23, 1, 1, '2024-06-30 23:59:59'),
	(53, 26, 24, 1, 1, '2024-06-30 23:59:59'),
	(54, 26, 25, 1, 1, '2024-06-30 23:59:59'),
	(55, 27, 17, 1, 1, '2024-06-30 23:59:59'),
	(56, 27, 18, 1, 1, '2024-06-30 23:59:59'),
	(57, 27, 19, 1, 1, '2024-06-30 23:59:59'),
	(58, 27, 23, 1, 1, '2024-06-30 23:59:59'),
	(59, 27, 24, 1, 1, '2024-06-30 23:59:59'),
	(60, 27, 25, 1, 1, '2024-06-30 23:59:59'),
	(61, 28, 17, 1, 1, '2024-06-30 23:59:59'),
	(62, 28, 18, 1, 1, '2024-06-30 23:59:59'),
	(63, 28, 19, 1, 1, '2024-06-30 23:59:59'),
	(64, 28, 20, 1, 1, '2024-06-30 23:59:59'),
	(65, 28, 21, 1, 1, '2024-06-30 23:59:59'),
	(66, 28, 22, 1, 1, '2024-06-30 23:59:59');

CREATE TABLE IF NOT EXISTS `project` (
  `ProjectID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `VideoLink` varchar(255) DEFAULT NULL,
  `DeploymentLink` varchar(255) DEFAULT NULL,
  `FinalGrade` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProjectID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `project` (`ProjectID`, `Title`, `Description`, `VideoLink`, `DeploymentLink`, `FinalGrade`) VALUES
	(1, 'My Project', 'This is my project description.', 'https://example.com/video', 'https://example.com/deployment', NULL),
	(2, 'My Project2', 'This is my project description2.', 'https://example.com/video', 'https://example.com/deployment', NULL),
	(3, ' Proj', 'good Description', 'https://example.com/video', 'https://example.com/deployment', NULL),
	(13, 'Project 1', 'Description of Project 1', 'https://www.youtube.com/project1', 'https://www.project1.com', NULL),
	(14, 'Project 2', 'Description of Project 2', 'https://www.youtube.com/project2', 'https://www.project2.com', NULL),
	(15, 'Project 3', 'Description of Project 3', 'https://www.youtube.com/project3', 'https://www.project3.com', NULL),
	(16, 'My Project!!!!!', 'A very nice description!!!', 'videolink!!', 'deploymentlink!!!', NULL),
	(17, 'John Doe Project 1', 'Description for John Doe Project 1.', 'https://example.com/videoJohnDoe1-1', 'https://example.com/deploymentJohnDoe1-1', NULL),
	(18, 'John Doe Project 2', 'Description for John Doe Project 2.', 'https://example.com/videoJohnDoe1-2', 'https://example.com/deploymentJohnDoe1-2', NULL),
	(19, 'John Doe Project 3', 'Description for John Doe Project 3.', 'https://example.com/videoJohnDoe1-3', 'https://example.com/deploymentJohnDoe1-3', NULL),
	(20, 'Jane Doe Project 1', 'Description for Jane Doe Project 1.', 'https://example.com/videoJaneDoe2-1', 'https://example.com/deploymentJaneDoe2-1', NULL),
	(21, 'Jane Doe Project 2', 'Description for Jane Doe Project 2.', 'https://example.com/videoJaneDoe2-2', 'https://example.com/deploymentJaneDoe2-2', NULL),
	(22, 'Jane Doe Project 3', 'Description for Jane Doe Project 3.', 'https://example.com/videoJaneDoe2-3', 'https://example.com/deploymentJaneDoe2-3', NULL),
	(23, 'Jim Doe Project 1', 'Description for Jim Doe Project 1.', 'https://example.com/videoJimDoe3-1', 'https://example.com/deploymentJimDoe3-1', NULL),
	(24, 'Jim Doe Project 2', 'Description for Jim Doe Project 2.', 'https://example.com/videoJimDoe3-2', 'https://example.com/deploymentJimDoe3-2', NULL),
	(25, 'Jim Doe Project 3', 'Description for Jim Doe Project 3.', 'https://example.com/videoJimDoe3-3', 'https://example.com/deploymentJimDoe3-3', NULL);

CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UserType` enum('student','professor') NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `user` (`UserID`, `UserName`, `Email`, `Password`, `UserType`) VALUES
	(3, 'MileaRob', 'rob@stud.ase.ro', '123123', 'student'),
	(4, 'Licxandru Teodora', 'thea@stud.ase.ro', '123123', 'professor'),
	(17, 'RusuSergiu', 'rusu21@stud.ase.ro', '123123', 'student'),
	(18, 'User1', 'user1@example.com', 'password1', 'student'),
	(19, 'User2', 'user2@example.com', 'password2', 'student'),
	(20, 'Professor1', 'professor1@example.com', 'password3', 'professor'),
	(21, 'Professor2', 'professor2@example.com', 'password4', 'professor'),
	(24, 'Prof1', 'prof1@gmail.com', '123123', 'professor'),
	(26, 'JohnDoe1', 'johndoe1@example.com', '123123', 'student'),
	(27, 'JaneDoe2', 'janedoe2@example.com', '123123', 'student'),
	(28, 'JimDoe3', 'jimdoe3@example.com', '123123', 'student');

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
	(3, 2),
	(3, 16),
	(26, 17),
	(26, 18),
	(26, 19),
	(27, 20),
	(27, 21),
	(27, 22),
	(28, 23),
	(28, 24),
	(28, 25);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
