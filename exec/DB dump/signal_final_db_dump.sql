-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: tableminpark.iptime.org    Database: signal_db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `apply`
--

DROP TABLE IF EXISTS `apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply` (
  `apply_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `posting_seq` int DEFAULT NULL,
  `posting_meeting_seq` int DEFAULT NULL,
  `content` text NOT NULL,
  `position_code` varchar(10) NOT NULL,
  `memo` text,
  `is_select` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `apply_code` varchar(10) NOT NULL DEFAULT 'AS103',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state_code` varchar(10) NOT NULL DEFAULT 'PAS103',
  PRIMARY KEY (`apply_seq`),
  KEY `FK_Apply_Users_idx` (`user_seq`),
  KEY `FK_Apply_Posting_idx` (`posting_seq`),
  KEY `FK_Apply_CommonCode_idx` (`apply_code`),
  KEY `FK_Apply_CommonCode_Position_idx` (`position_code`),
  KEY `FK_Apply_PostingMeeting_idx` (`posting_meeting_seq`),
  KEY `FK_Apply_CommonCode_idx1` (`state_code`),
  CONSTRAINT `FK_Apply_CommonCode` FOREIGN KEY (`state_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Apply_CommonCode_Position` FOREIGN KEY (`position_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Apply_CommonCode_Status` FOREIGN KEY (`apply_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Apply_Posting` FOREIGN KEY (`posting_seq`) REFERENCES `posting` (`posting_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Apply_PostingMeeting` FOREIGN KEY (`posting_meeting_seq`) REFERENCES `posting_meeting` (`posting_meeting_seq`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_Apply_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COMMENT='지원서';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply`
--

LOCK TABLES `apply` WRITE;
/*!40000 ALTER TABLE `apply` DISABLE KEYS */;
INSERT INTO `apply` VALUES (1,4,2,9,'프로젝트 경험은 없지만 열심히 임하겠습니다!','PO100',NULL,0,'AS109','2023-02-16 00:02:51','PAS109'),(2,4,9,39,'방구석 이태원클라스 가보죠 ^_^ ','PO101',NULL,0,'AS109','2023-02-16 00:06:04','PAS109'),(3,4,6,30,'열심히 임하겠습니다~~','PO101',NULL,0,'AS109','2023-02-16 00:07:58','PAS109'),(4,4,4,23,'좋은 아이디어 같아서 관심이 가네요!','PO100',NULL,0,'AS109','2023-02-16 00:09:48','PAS109'),(5,4,5,24,'뽑아주십셔~','PO101',NULL,0,'AS109','2023-02-16 00:12:31','PAS109'),(6,6,16,115,'','PO100',NULL,0,'AS109','2023-02-16 10:18:21','PAS109'),(7,8,16,116,'','PO100',NULL,0,'AS109','2023-02-16 10:19:49','PAS109'),(8,10,16,118,'반드시 함께 하고 싶습니다!','PO100','나랑 잘맞을 거 같음\n좋은 팀원인듯\n일을 잘할 것 같음\n',0,'AS109','2023-02-16 10:24:01','PAS109'),(9,5,13,85,'행복하세요','PO100',NULL,0,'AS109','2023-02-16 15:29:24','PAS109'),(10,3,13,89,'뭐요','PO101',NULL,0,'AS109','2023-02-16 15:33:51','PAS109'),(11,11,13,84,'DD','PO100',NULL,0,'AS109','2023-02-16 15:35:30','PAS109'),(12,7,13,88,'열심히 해봅시다 ㅎㅎㅎㅎ 저 완전 고인물임','PO101',NULL,0,'AS109','2023-02-16 15:36:07','PAS109'),(13,5,12,73,'ㅎㅇ','PO101',NULL,0,'AS109','2023-02-16 17:15:27','PAS109'),(14,3,12,64,'냥이는 귀엽지만 전 강아지를 키우고 있습니다.','PO100','asdfasd 박상민 아웃',0,'AS109','2023-02-16 17:15:46','PAS109'),(15,7,12,69,'정말 잘할 수 있어요 꼭 같이해요\n스프링 정말 잘한답니다','PO100',NULL,0,'AS109','2023-02-16 17:16:24','PAS109'),(16,12,12,67,'전 고양이 좋아합니다','PO101',NULL,0,'AS109','2023-02-16 17:17:19','PAS109'),(17,3,10,45,'뭐요','PO101',NULL,0,'AS109','2023-02-16 17:28:48','PAS109'),(18,7,10,46,'저 정말 잘해요 꼭 함게하면 좋겠어요','PO100',NULL,0,'AS109','2023-02-16 17:29:33','PAS109'),(19,12,10,48,'!!','PO100',NULL,0,'AS109','2023-02-16 17:29:38','PAS109'),(20,5,10,47,'gdg','PO100',NULL,0,'AS109','2023-02-16 17:30:14','PAS109'),(21,3,8,33,'1인 가구 나잇스','PO101',NULL,0,'AS109','2023-02-16 17:34:58','PAS109'),(22,7,15,106,'정말 잘합니다 꼭 함께해요 우리\n제가 캐리합니다','PO101',NULL,0,'AS103','2023-02-16 17:35:00','PAS103'),(23,12,8,38,'저 잘합니다','PO101',NULL,0,'AS109','2023-02-16 17:36:23','PAS109'),(24,7,8,36,'없다 마','PO100',NULL,0,'AS109','2023-02-16 17:37:13','PAS109'),(25,11,17,125,'뽑아주세여','PO100',NULL,0,'AS109','2023-02-16 20:11:09','PAS109'),(26,5,3,15,'잘 할수있습니다','PO100',NULL,0,'AS103','2023-02-16 20:11:44','PAS103'),(28,4,17,124,'하고싶어요~','PO100',NULL,0,'AS109','2023-02-16 20:11:51','PAS109'),(29,12,17,119,'좋아요','PO101',NULL,0,'AS109','2023-02-16 20:12:08','PAS109'),(30,3,17,122,'잘 부탁드립니다.','PO101',NULL,0,'AS109','2023-02-16 20:12:26','PAS109'),(32,7,17,120,'꼭 함께해요 저 잘합니다','PO101',' 이사람 잘하는 듯 ',0,'AS109','2023-02-16 20:12:57','PAS109');
/*!40000 ALTER TABLE `apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apply_answer`
--

DROP TABLE IF EXISTS `apply_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_answer` (
  `apply_answer_seq` int NOT NULL AUTO_INCREMENT,
  `apply_seq` int DEFAULT NULL,
  `posting_seq` int NOT NULL,
  `posting_question_seq` int NOT NULL,
  `content` text NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`apply_answer_seq`),
  KEY `FK_ApplyComment_Posting_idx` (`posting_seq`),
  KEY `FK_ApplyAnswer_PostingQuestion_idx` (`posting_question_seq`),
  KEY `FK_ApplyAnswer_Apply_idx` (`apply_seq`),
  CONSTRAINT `FK_ApplyAnswer_Apply` FOREIGN KEY (`apply_seq`) REFERENCES `apply` (`apply_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ApplyAnswer_Posting` FOREIGN KEY (`posting_seq`) REFERENCES `posting` (`posting_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ApplyAnswer_PostingQuestion` FOREIGN KEY (`posting_question_seq`) REFERENCES `posting_question` (`posting_question_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=373 DEFAULT CHARSET=utf8mb3 COMMENT='작성자의 질문에 대한 답변';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_answer`
--

LOCK TABLES `apply_answer` WRITE;
/*!40000 ALTER TABLE `apply_answer` DISABLE KEYS */;
INSERT INTO `apply_answer` VALUES (341,1,2,2,'할 때는 확실히 하고 놀 때는 또 재미있게 놀면서 하고 싶습니다. ','2023-02-16 00:02:51'),(342,1,2,3,'팀원이 중간에 탈주했던 경험이 있어서 끝까지 같이 프로젝트 할 팀원들로 구성되면 좋겠습니다.','2023-02-16 00:02:51'),(343,2,9,16,'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ 술은 냄새만 맡아도 취합니더 ^^','2023-02-16 00:06:04'),(344,3,6,12,'하모','2023-02-16 00:07:58'),(345,4,4,9,'고양이 한 마리 키우고 있습니다 ㅎㅎ ! 미팅시간에 보여드리겠습니다~','2023-02-16 00:09:48'),(346,5,5,10,'잘 하는 편 입니다.','2023-02-16 00:12:31'),(347,5,5,11,'토익 900점 받아봤습니다.','2023-02-16 00:12:31'),(348,8,16,29,'제가 또 열정 빼면 시체입니다','2023-02-16 10:24:01'),(349,17,10,17,'넹','2023-02-16 17:28:48'),(350,17,10,18,'음..................딱히?','2023-02-16 17:28:48'),(351,18,10,17,'저는 싸피 8기로 참여하여 6개월간 스프링부트 교육을 받았으며 이와 관련된 사이트를 제작해 보았습니다','2023-02-16 17:29:33'),(352,18,10,18,'못생겼는데 괜찮나요..?','2023-02-16 17:29:33'),(353,19,10,17,'!!','2023-02-16 17:29:38'),(354,19,10,18,'!!','2023-02-16 17:29:38'),(355,20,10,17,'업슨디','2023-02-16 17:30:14'),(356,20,10,18,'ㅇㅈ','2023-02-16 17:30:14'),(357,21,8,14,'따릉이 운전 가능','2023-02-16 17:34:58'),(358,21,8,15,'없써여','2023-02-16 17:34:58'),(359,22,15,28,'그럼유','2023-02-16 17:35:00'),(360,23,8,14,'아니요','2023-02-16 17:36:23'),(361,23,8,15,'아니요!','2023-02-16 17:36:23'),(362,24,8,14,'그럼유','2023-02-16 17:37:13'),(363,24,8,15,'그럼유','2023-02-16 17:37:13'),(364,25,17,30,'시룬뎁','2023-02-16 20:11:09'),(365,26,3,5,'리액트, 파이썬 스프링 가능합니다 ','2023-02-16 20:11:44'),(366,26,3,6,'중  중 중 입니다 ','2023-02-16 20:11:44'),(368,28,17,30,'대면 쌉 가능','2023-02-16 20:11:51'),(369,29,17,30,'가능합니다','2023-02-16 20:12:08'),(370,30,17,30,'넹','2023-02-16 20:12:26'),(372,32,17,30,'물론 가능합니다!','2023-02-16 20:12:57');
/*!40000 ALTER TABLE `apply_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apply_career`
--

DROP TABLE IF EXISTS `apply_career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_career` (
  `apply_career_seq` int NOT NULL AUTO_INCREMENT,
  `apply_seq` int DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`apply_career_seq`),
  KEY `FK_ApplyCareer_Apply_idx` (`apply_seq`),
  CONSTRAINT `FK_ApplyCareer_Apply` FOREIGN KEY (`apply_seq`) REFERENCES `apply` (`apply_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_career`
--

LOCK TABLES `apply_career` WRITE;
/*!40000 ALTER TABLE `apply_career` DISABLE KEYS */;
INSERT INTO `apply_career` VALUES (1,9,'신입'),(2,10,'따릉이 무사고 20년차 '),(3,11,'상민 센세 제자'),(4,11,'서칸 센세 제자'),(5,12,'싸피 8기'),(6,14,'따릉이 무사고 20년차'),(7,15,'싸피 8기'),(8,17,'따릉이 무사고 20년차'),(9,18,'싸피 8기'),(10,19,'좀 높음'),(11,21,'따릉이 무사고 20년차'),(12,22,'싸피 8기'),(13,23,'프로미스나인 팬클럽 플로버 3년차'),(14,24,'싸피 8기'),(15,25,'상민 센세 제자'),(16,25,'서칸 센세 제자'),(17,29,'마이크로소프트 1년 근무'),(18,30,'파크하얏트 부산 전산실 근무'),(20,32,'싸피 8기');
/*!40000 ALTER TABLE `apply_career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apply_exp`
--

DROP TABLE IF EXISTS `apply_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_exp` (
  `apply_exp_seq` int NOT NULL AUTO_INCREMENT,
  `apply_seq` int DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`apply_exp_seq`),
  KEY `FK_ApplyExp_Apply_idx` (`apply_seq`),
  CONSTRAINT `FK_ApplyExp_Apply` FOREIGN KEY (`apply_seq`) REFERENCES `apply` (`apply_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_exp`
--

LOCK TABLES `apply_exp` WRITE;
/*!40000 ALTER TABLE `apply_exp` DISABLE KEYS */;
INSERT INTO `apply_exp` VALUES (1,2,'소주 5병 먹고 기억 잃어봄'),(2,2,'정신차려보니 3차 와 있음'),(3,3,'이메일 분류 AI 제작 프로젝트'),(4,9,'싸피'),(5,10,'IOT 프로젝트 진행 경험'),(6,10,'임베디드 프로그래밍 경험'),(7,11,'시그널 프로젝트여'),(8,12,'스프링 6개월차'),(9,13,'싸피 해봄'),(10,14,'IOT 프로젝트 진행 경험'),(11,14,'임베디드 프로그래밍 경험'),(12,15,'스프링 6개월차'),(13,17,'IOT 프로젝트 진행 경험'),(14,17,'임베디드 프로그래밍 경험'),(15,18,'스프링 6개월차'),(16,19,'후후후후'),(17,20,'싸피 해봄'),(18,21,'IOT 프로젝트 진행 경험'),(19,21,'임베디드 프로그래밍 경험'),(20,22,'스프링 6개월차'),(21,23,'어셈블리로 어셈블 가능'),(22,24,'스프링 6개월차'),(23,25,'시그널 프로젝트여'),(24,26,'싸피 해봄'),(26,28,'이메일 분류 AI 모델 개발'),(27,29,'싸피 2학기 진행중'),(28,30,'IOT 프로젝트 진행 경험'),(29,30,'임베디드 프로그래밍 경험'),(31,32,'스프링 6개월차');
/*!40000 ALTER TABLE `apply_exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apply_skill`
--

DROP TABLE IF EXISTS `apply_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_skill` (
  `apply_skill_seq` int NOT NULL AUTO_INCREMENT,
  `apply_seq` int DEFAULT NULL,
  `skill_code` varchar(10) NOT NULL,
  PRIMARY KEY (`apply_skill_seq`),
  KEY `FK_ApplyPosition_Apply_idx` (`apply_seq`),
  KEY `FK_ApplySkill_CommonCode_idx` (`skill_code`),
  CONSTRAINT `FK_ApplySkill_Apply` FOREIGN KEY (`apply_seq`) REFERENCES `apply` (`apply_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ApplySkill_CommonCode` FOREIGN KEY (`skill_code`) REFERENCES `common_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_skill`
--

LOCK TABLES `apply_skill` WRITE;
/*!40000 ALTER TABLE `apply_skill` DISABLE KEYS */;
INSERT INTO `apply_skill` VALUES (1,1,'WE102'),(2,1,'WE105'),(3,1,'WE109'),(4,2,'WE110'),(5,2,'PL106'),(6,2,'PL102'),(7,3,'WE104'),(8,3,'AI105'),(9,3,'PL112'),(10,3,'AI102'),(11,4,'WE102'),(12,4,'WE105'),(13,4,'WE109'),(14,4,'WE111'),(15,4,'PL106'),(16,5,'WE110'),(17,5,'PL106'),(18,6,'WE100'),(19,7,'WE101'),(20,8,'WE105'),(21,9,'WE101'),(22,10,'WE101'),(23,11,'WE102'),(24,11,'WE105'),(25,12,'WE105'),(26,13,'WE101'),(27,13,'WE102'),(28,13,'WE104'),(29,14,'WE101'),(30,15,'WE102'),(31,16,'WE103'),(32,17,'PL108'),(33,18,'WE105'),(34,20,'WE101'),(35,21,'WE101'),(36,22,'WE105'),(37,24,'WE105'),(38,25,'WE102'),(39,26,'WE103'),(44,28,'WE102'),(45,28,'WE106'),(46,28,'WE105'),(47,28,'WE109'),(48,29,'WE110'),(49,30,'WE110'),(50,30,'PL106'),(51,30,'DB102'),(54,32,'WE107'),(55,32,'PL102');
/*!40000 ALTER TABLE `apply_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `auth_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `auth_code` varchar(10) NOT NULL,
  `auth_dt` datetime DEFAULT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_auth` tinyint unsigned NOT NULL DEFAULT '0',
  `code` varchar(500) NOT NULL,
  PRIMARY KEY (`auth_seq`),
  KEY `FK_Auth_User_idx` (`user_seq`),
  KEY `FK_Auth_CommonCode_idx` (`auth_code`),
  CONSTRAINT `FK_Auth_CommonCode` FOREIGN KEY (`auth_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Auth_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,3,'AU101','2023-02-15 21:38:54','2023-02-15 21:38:24',1,'59c8d9cd-e81c-45d3-b1f7-2cb216dcfb2d'),(2,4,'AU101','2023-02-15 21:39:25','2023-02-15 21:38:54',1,'8c9bafda-1845-4606-b3c7-03a9d27f7b68'),(3,5,'AU101','2023-02-15 21:46:19','2023-02-15 21:41:48',1,'ef04a410-cd0e-4b4f-9261-d6bca50b4c44'),(4,6,'AU101','2023-02-15 21:46:30','2023-02-15 21:46:19',1,'b3dfc19b-235a-496c-8912-e0ef742db241'),(5,7,'AU101','2023-02-16 00:15:15','2023-02-16 00:14:45',1,'c953742c-0791-432a-95ec-866de42054ee'),(6,1,'AU101','2023-02-16 00:15:15','2023-02-15 21:46:19',1,'b3dfc19b-235a-496c-8912-e0ef742db241'),(7,2,'AU101','2023-02-16 00:15:15','2023-02-15 21:46:19',1,'b3dfc19b-235a-496c-8912-e0ef742db241'),(8,0,'AU101','2023-02-16 00:15:15','2023-02-15 21:46:19',1,'b3dfc19b-235a-496c-8912-e0ef742db241'),(9,8,'AU101','2023-02-16 10:10:49','2023-02-16 10:10:37',1,'2ae52513-509e-4528-be33-827867e98cde'),(10,9,'AU101','2023-02-16 10:11:47','2023-02-16 10:11:35',1,'8866899a-3d83-4758-b5d8-6509393bf81c'),(11,10,'AU101','2023-02-16 10:13:17','2023-02-16 10:13:08',1,'34ac8dcf-e720-447a-a218-1428577fe268'),(12,11,'AU101','2023-02-16 10:32:20','2023-02-16 10:32:11',1,'96fd73cf-0d5e-4af7-b021-9a5617da4b84'),(13,12,'AU101','2023-02-16 17:14:33','2023-02-16 17:14:17',1,'34ab1598-d6a8-425a-9f44-5a75e20a8c8f'),(14,13,'AU101',NULL,'2023-02-16 21:15:00',0,'3373bdd1-976a-45be-950e-a1963bf00fc3'),(15,14,'AU101','2023-02-16 22:07:07','2023-02-16 22:06:48',1,'4cd4e90a-2907-4732-9877-a7e9a3ecf689');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `black_user`
--

DROP TABLE IF EXISTS `black_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `black_user` (
  `black_user_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `project_seq` int NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`black_user_seq`),
  KEY `FK_BlackList_User_idx` (`user_seq`),
  KEY `FK_BlackList_Project_idx` (`project_seq`),
  CONSTRAINT `FK_BlackList_Project` FOREIGN KEY (`project_seq`) REFERENCES `project` (`project_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_BlackList_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `black_user`
--

LOCK TABLES `black_user` WRITE;
/*!40000 ALTER TABLE `black_user` DISABLE KEYS */;
INSERT INTO `black_user` VALUES (9,4,17,'2023-02-16 21:31:29');
/*!40000 ALTER TABLE `black_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_code`
--

DROP TABLE IF EXISTS `common_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_code` (
  `code` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `group_code` varchar(10) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`code`),
  KEY `FK_CommonCode_GroupCode_idx` (`group_code`),
  CONSTRAINT `FK_CommonCode_GroupCode` FOREIGN KEY (`group_code`) REFERENCES `group_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='공통 코드';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_code`
--

LOCK TABLES `common_code` WRITE;
/*!40000 ALTER TABLE `common_code` DISABLE KEYS */;
INSERT INTO `common_code` VALUES ('11','서울특별시','LO','시도 구분',NULL),('21','부산광역시','LO','시도 구분',NULL),('22','대구광역시','LO','시도 구분',NULL),('23','인천광역시','LO','시도 구분',NULL),('24','광주광역시','LO','시도 구분',NULL),('25','대전광역시','LO','시도 구분',NULL),('26','울산광역시','LO','시도 구분',NULL),('29','세종특별자치시','LO','시도 구분',NULL),('31','경기도','LO','시도 구분',NULL),('32','강원도','LO','시도 구분',NULL),('33','충청북도','LO','시도 구분',NULL),('34','충청남도','LO','시도 구분',NULL),('35','전라북도','LO','시도 구분',NULL),('36','전라남도','LO','시도 구분',NULL),('37','경상북도','LO','시도 구분',NULL),('38','경상남도','LO','시도 구분',NULL),('39','제주특별자치도','LO','시도 구분',NULL),('AI100','Keras','AI','인공지능 기술스택 구분','/static/icon/AI/keras.png'),('AI101','Matplotlib','AI','인공지능 기술스택 구분','/static/icon/AI/matplotlib.png'),('AI102','Pandas','AI','인공지능 기술스택 구분','/static/icon/AI/pnadas.png'),('AI103','Pytorch','AI','인공지능 기술스택 구분','/static/icon/AI/pytorch.png'),('AI104','Scikitlearn','AI','인공지능 기술스택 구분','/static/icon/AI/scikitlearn.png'),('AI105','Tensorflow','AI','인공지능 기술스택 구분','/static/icon/AI/Tensorflow.png'),('AI106','Theano','AI','인공지능 기술스택 구분','/static/icon/AI/theano.png'),('AS100','대기중','AS','팀원선택 상태구분',NULL),('AS101','확정','AS','팀원선택 상태구분',NULL),('AS102','거절','AS','팀원선택 상태구분',NULL),('AS103','미선택','AS','팀원선택 상태구분',NULL),('AS104','지원취소','AS','팀원선택 상태구분',NULL),('AS109','모집 마감','AS','팀원선택 상태구분',NULL),('AU100','비밀번호찾기','AU','인증 종류 구분',NULL),('AU101','이메일인증','AU','인증 종류 구분',NULL),('AUS100','블랙리스트','AUS','관리자 회원 상태구분',NULL),('DB100','MongoDB','DB','데이터베이스 기술스택 구분','/static/icon/DB/mongodb.png'),('DB101','MsSql','DB','데이터베이스 기술스택 구분','/static/icon/DB/mssql.png'),('DB102','MySql','DB','데이터베이스 기술스택 구분','/static/icon/DB/mysql.png'),('DB103','Oracle','DB','데이터베이스 기술스택 구분','/static/icon/DB/oracle.svg'),('DB104','Pgsql','DB','데이터베이스 기술스택 구분','/static/icon/DB/pgsql.svg'),('FI100','Web','FI','분야 구분',NULL),('FI101','Android','FI','분야 구분',NULL),('FI102','IOS','FI','분야 구분',NULL),('FI103','Dev','FI','분야 구분',NULL),('FI104','IoT','FI','분야 구분',NULL),('FI105','AI','FI','분야 구분',NULL),('FI106','DB','FI','분야 구분',NULL),('PAS100','공고 마감','PAS','지원한 공고 상태구분',NULL),('PAS101','합격','PAS','지원한 공고 상태구분',NULL),('PAS102','불합격','PAS','지원한 공고 상태구분',NULL),('PAS103','심사중','PAS','지원한 공고 상태구분',NULL),('PAS104','지원취소','PAS','지원한 공고 상태 구분',NULL),('PAS105','선발','PAS','지원한 공고 상태 구분',NULL),('PAS106','프로젝트 진행중','PAS','지원한 공고 상태 구분',NULL),('PAS109','모집 마감','PAS','지원한 공고 상태 구분',NULL),('PL100','Assembly','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/assembly.svg'),('PL101','C','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/c3.svg'),('PL102','C++','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/cpp3.svg'),('PL103','C#','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/csharp2.svg'),('PL104','Fortran','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/fortran.svg'),('PL105','Go','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/go.svg'),('PL106','Java','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/java.svg'),('PL107','Kotlin','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/kotlin.svg'),('PL108','Matlab','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/matlab.svg'),('PL109','Next.js','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/next.svg'),('PL110','Perl','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/perl.svg'),('PL111','Php','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/php.svg'),('PL112','Python','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/python.svg'),('PL113','R','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/r.svg'),('PL114','Ruby','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/ruby.svg'),('PL115','Rust','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/rust.svg'),('PL116','Scala','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/scala.svg'),('PL117','Swift','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/swift.svg'),('PL118','TypeScript','PL','프로그래밍언어 기술스택 구분','/static/icon/PL/typescript.svg'),('PM100','미팅전','PM','사전미팅 상태구분',NULL),('PM101','미팅완료','PM','사전미팅 상태구분',NULL),('PM102','미선택','PM','사전미팅 상태구분',NULL),('PO100','FrontEnd','PO','포지션 구분',NULL),('PO101','BackEnd','PO','포지션 구분',NULL),('PO102','디자이너','PO','포지션 구분',NULL),('PO103','PM','PO','포지션 구분',NULL),('PO104','DA','PO','포지션 구분',NULL),('PPS100','모집 취소','PPS','작성한 공고 상태구분',NULL),('PPS101','모집 마감','PPS','작성한 공고 상태구분',NULL),('PPS102','모집 중','PPS','작성한 공고 상태구분',NULL),('PS100','진행 중','PS','프로젝트 상태구분',NULL),('PS101','진행 완료','PS','프로젝트 상태구분',NULL),('PS102','모집 중','PS','프로젝트 상태구분',NULL),('TD100','진행 중','TD','To Do list 진행상태 구분',NULL),('TD101','완료','TD','To Do list 진행상태 구분',NULL),('WE100','Angular','WE','웹 기술스택 구분','/static/icon/WE/angular.svg'),('WE101','Apache','WE','웹 기술스택 구분','/static/icon/WE/apache.svg'),('WE102','CSS','WE','웹 기술스택 구분','/static/icon/WE/css.svg'),('WE103','Django','WE','웹 기술스택 구분','/static/icon/WE/django.svg'),('WE104','Flask','WE','웹 기술스택 구분','/static/icon/WE/flask.png'),('WE105','HTML','WE','웹 기술스택 구분','/static/icon/WE/html.svg'),('WE106','Jquery','WE','웹 기술스택 구분','/static/icon/WE/jquery.png'),('WE107','Nginx','WE','웹 기술스택 구분','/static/icon/WE/nginx.svg'),('WE108','Rails','WE','웹 기술스택 구분','/static/icon/WE/rails.svg'),('WE109','React','WE','웹 기술스택 구분','/static/icon/WE/reactjs.svg'),('WE110','Spring','WE','웹 기술스택 구분','/static/icon/WE/spring.png'),('WE111','Vue.js','WE','웹 기술스택 구분','/static/icon/WE/vue.svg');
/*!40000 ALTER TABLE `common_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_code`
--

DROP TABLE IF EXISTS `group_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_code` (
  `code` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='그룹 공통 코드';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_code`
--

LOCK TABLES `group_code` WRITE;
/*!40000 ALTER TABLE `group_code` DISABLE KEYS */;
INSERT INTO `group_code` VALUES ('AI','인공지능 기술스택 구분'),('AS','팀원선택 상태구분'),('AU','인증 종류 구분'),('AUS','관리자 회원 상태구분'),('DB','데이터베이스 기술스택 구분'),('FI','분야 구분'),('LO','시도 구분'),('PAS','지원한 공고 상태구분'),('PL','프로그래밍언어 기술스택 구분'),('PM','사전미팅 상태구분'),('PO','포지션 구분'),('PPS','작성한 공고 상태구분'),('PS','프로젝트 상태구분'),('SK','기술스택 구분'),('TD','To Do list 진행상태 구분'),('US','회원 구분'),('WE','웹 기술스택 구분');
/*!40000 ALTER TABLE `group_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_file`
--

DROP TABLE IF EXISTS `image_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_file` (
  `image_file_seq` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `size` int NOT NULL,
  `type` varchar(100) NOT NULL,
  `url` varchar(500) NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_file_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COMMENT='회원 프로필 사진, 프로젝트 대표 사진 파일 정보 ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_file`
--

LOCK TABLES `image_file` WRITE;
/*!40000 ALTER TABLE `image_file` DISABLE KEYS */;
INSERT INTO `image_file` VALUES (0,'유저 기본 프로필',0,'png','/static/userImage/noProfileImg.png','2023-01-22 12:06:16'),(1,'프로젝트 기본 프로필',0,'png','/static/projectImage/noProfileImg.png','2023-01-22 12:06:16'),(2,'odung2.gif',36472,'gif','/static/userImage/dba079af-c528-470a-a116-ee2334a30990.gif','2023-02-16 08:47:08'),(3,'metamong.jfif',1625,'jfif','/static/userImage/83305b58-5b19-4ec4-b21c-448119f3af91.jfif','2023-02-15 21:49:57'),(4,'ntm.jpg',5371,'jpg','/static/userImage/d3a13a1b-c55a-4c49-b5f4-93bdad586a36.jpg','2023-02-16 00:17:11'),(5,'다운로드.gif',1400476,'gif','/static/userImage/a833749f-f600-479f-a894-d8b3f88be096.gif','2023-02-16 15:29:59'),(6,'signal.png',111994,'png','/static/projectImage/fde67e2a-572a-4ecd-8249-e0aed1be0b93.png','2023-02-16 08:59:10'),(7,'patpat.png',3987,'png','/static/projectImage/b18ae568-6f09-4d6a-a98b-5c34d3f38929.png','2023-02-16 09:02:37'),(8,'tonny.png',3849,'png','/static/projectImage/a775f968-7ea0-4273-aa72-4eafa25b1906.png','2023-02-16 09:33:07'),(9,'gym.png',387752,'png','/static/projectImage/42b6458b-df81-44ae-898b-33a7385493fb.png','2023-02-16 09:38:32'),(10,'알린.jpg',60157,'jpg','/static/userImage/85484b37-7729-4eab-8f1a-8e21200b8353.jpg','2023-02-16 10:36:58'),(11,'테이블.jpg',21296,'jpg','/static/userImage/ff502e90-8125-4aef-9ae6-b7ce99a466f9.jpg','2023-02-16 11:19:29'),(12,'해커맨.png',64631,'png','/static/userImage/64659c11-dc30-4cd8-b8d0-07b90ee53d45.png','2023-02-16 11:20:53'),(13,'funteer.png',6364,'png','/static/projectImage/2723bdb7-bebc-47d6-805c-7a591df6258f.png','2023-02-16 16:02:15'),(14,'fish-bread-logo2.png',13341,'png','/static/userImage/a71fcc89-7192-40f8-92f4-16be84a75ceb.png','2023-02-16 17:16:40'),(15,'냥그릇.png',24982,'png','/static/projectImage/fca2933a-e12b-4ed6-9325-f23ff4bab4c7.png','2023-02-16 17:22:49'),(16,'tify.png',2729,'png','/static/projectImage/114af562-34f7-40c6-8e03-1aea90e8b276.png','2023-02-16 17:31:55'),(17,'뽀로로.jfif',10110,'jfif','/static/projectImage/175eb677-901b-4487-88bf-393ba9bee929.jfif','2023-02-16 17:41:46'),(18,'1S4K4BAOWU_1.jpg',414760,'jpg','/static/projectImage/b7c6aabd-73fd-424f-ae9a-123cadaa901c.jpg','2023-02-16 20:34:25');
/*!40000 ALTER TABLE `image_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter` (
  `letter_seq` int NOT NULL AUTO_INCREMENT,
  `from_user_seq` int NOT NULL,
  `to_user_seq` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `is_trash` tinyint unsigned NOT NULL DEFAULT '0',
  `is_read` tinyint unsigned NOT NULL DEFAULT '0',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`letter_seq`),
  KEY `FK_Letter_User_From_idx` (`from_user_seq`),
  KEY `FK_Letter_User_To_idx` (`to_user_seq`),
  KEY `FK_Letter_CommonCode_idx` (`is_trash`),
  CONSTRAINT `FK_Letter_User_From` FOREIGN KEY (`from_user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Letter_User_To` FOREIGN KEY (`to_user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
INSERT INTO `letter` VALUES (1,3,4,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/9\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 00:15:53'),(2,3,4,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/2\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 00:16:07'),(3,3,4,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/4\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 00:16:56'),(4,3,4,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/5\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 00:17:05'),(5,3,4,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/6\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 00:17:13'),(6,9,8,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/16\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 10:26:23'),(7,9,6,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/16\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,0,'2023-02-16 10:26:25'),(8,9,10,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/16\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 11:13:54'),(9,0,10,'프로젝트 퇴출 안내','<div>경고 3 번으로 팀장에 의해 프로젝트 팀 빌딩 서비스 시그널 프로젝트에서 퇴출 되었습니다.</div><br> <div>보증금 100개의 하트는 소멸되었음을 알려드립니다.</div><br>',0,1,'2023-02-16 14:33:45'),(10,0,8,'프로젝트 퇴출 안내','<div>경고 3 번으로 팀장에 의해 프로젝트 팀 빌딩 서비스 시그널 프로젝트에서 퇴출 되었습니다.</div><br> <div>보증금 100개의 하트는 소멸되었음을 알려드립니다.</div><br>',0,1,'2023-02-16 14:48:22'),(11,4,5,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/13\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 15:31:09'),(12,4,3,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/13\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 15:35:12'),(13,4,11,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/13\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 15:35:34'),(14,4,7,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/13\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 15:36:29'),(15,4,7,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/12\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:17:03'),(16,4,3,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/12\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:17:05'),(17,4,5,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/12\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:17:08'),(18,4,12,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/12\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:17:26'),(19,4,3,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/10\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:29:15'),(20,4,7,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/10\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:29:38'),(21,4,12,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/10\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:29:41'),(22,4,5,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/10\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,0,'2023-02-16 17:30:25'),(23,4,7,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/8\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:39:35'),(24,4,12,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/8\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:39:36'),(25,4,3,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/8\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 17:39:38'),(26,5,7,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/17\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 20:17:11'),(27,5,3,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/17\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 20:17:13'),(28,5,12,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/17\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 20:17:15'),(29,5,4,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/17\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,1,'2023-02-16 20:17:18'),(30,5,11,'팀원 확정 메일','<div>팀원으로 선정되셨습니다!! 마이페이지를 확인해주세요 (ง˙∇˙)ว</div>\n<br>\n<a href=\"/posting/17\" style=\"color:#574B9F; text-decoration:underline;\">지원한 공고 확인하기 &gt;&gt;</a>\n\n<a href=\"/myprofile\" style=\"color: #574B9F; text-decoration:underline;\">마이페이지로 가기 &gt; &gt;</a>',0,0,'2023-02-16 20:17:21'),(31,0,4,'프로젝트 퇴출 안내','<div>경고 3 번으로 팀장에 의해 프로젝트 팀 매칭 서비스  프로젝트에서 퇴출 되었습니다.</div><br> <div>보증금 70개의 하트는 소멸되었음을 알려드립니다.</div><br>',0,1,'2023-02-16 21:31:29');
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `view` int unsigned NOT NULL DEFAULT '0',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notice_seq`),
  KEY `FK_Notice_User_idx` (`user_seq`),
  CONSTRAINT `FK_Notice_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,0,'[시그널 위크] 2022년 1분기 시그널 위크 등록','❗ 2022년 1분기 시그널 위크 프로젝트 등록 안내\n\n프로젝트 등록 접수 : 2022.02.01 ~ 2022.02.28\n시그널 위크 프로젝트 투표 기간 : 2022.03.01 ~ 2022.03.30\n\n\n❗ 투표 방법\n\n1. 시그널 위크 -> 시그널 위크 프로젝트\n2. 2022년 1분기 시그널 위크 게시물에 투표 아이콘 클릭\n3. 투표완료!\n\n\n❗ 시그널 위크 점수 산정 방식\n\n1. 투표 총합\n2. 시그널 위크 게시물 조회수\n\n\n❗ 시그널 위크 수상작 발표\n\n발표 일시 : 2022.03.31\n시그널 위크 점수 산정 방식을 통해 선정된 1 ~ 3위의 프로젝트가 2022년 1분기 명예의 전당에 등록됩니다.',13,'2022-01-15 20:19:07'),(2,0,'[시그널 위크] 2022년 2분기 시그널 위크 등록','❗ 2022년 2분기 시그널 위크 프로젝트 등록 안내\n\n프로젝트 등록 접수 : 2022.05.01 ~ 2022.05.31\n시그널 위크 프로젝트 투표 기간 : 2022.06.01 ~ 2022.06.29\n\n\n❗ 투표 방법\n\n1. 시그널 위크 -> 시그널 위크 프로젝트\n2. 2022년 2분기 시그널 위크 게시물에 투표 아이콘 클릭\n3. 투표완료!\n\n\n❗ 시그널 위크 점수 산정 방식\n\n1. 투표 총합\n2. 시그널 위크 게시물 조회수\n\n\n❗ 시그널 위크 수상작 발표\n\n발표 일시 : 2022.06.30\n시그널 위크 점수 산정 방식을 통해 선정된 1 ~ 3위의 프로젝트가 2022년 2분기 명예의 전당에 등록됩니다.\n\n',16,'2022-04-15 20:21:23'),(3,0,'[시그널 위크] 2022년 3분기 시그널 위크 등록','❗ 2022년 3분기 시그널 위크 프로젝트 등록 안내\n\n프로젝트 등록 접수 : 2022.08.01 ~ 2022.08.31\n시그널 위크 프로젝트 투표 기간 : 2022.09.01 ~ 2022.09.29\n\n\n❗ 투표 방법\n\n1. 시그널 위크 -> 시그널 위크 프로젝트\n2. 2022년 3분기 시그널 위크 게시물에 투표 아이콘 클릭\n3. 투표완료!\n\n\n❗ 시그널 위크 점수 산정 방식\n\n1. 투표 총합\n2. 시그널 위크 게시물 조회수\n\n\n❗ 시그널 위크 수상작 발표\n\n발표 일시 : 2022.09.30\n시그널 위크 점수 산정 방식을 통해 선정된 1 ~ 3위의 프로젝트가 2022년 3분기 명예의 전당에 등록됩니다.\n\n',3,'2022-07-15 20:46:56'),(4,0,'[시그널 위크] 2022년 4분기 시그널 위크 등록','❗ 2022년 4분기 시그널 위크 프로젝트 등록 안내\n\n프로젝트 등록 접수 : 2022.11.01 ~ 2022.11.30\n시그널 위크 프로젝트 투표 기간 : 2022.12.01 ~ 2022.12.30\n\n\n❗ 투표 방법\n\n1. 시그널 위크 -> 시그널 위크 프로젝트\n2. 2022년 1분기 시그널 위크 게시물에 투표 아이콘 클릭\n3. 투표완료!\n\n\n❗ 시그널 위크 점수 산정 방식\n\n1. 투표 총합\n2. 시그널 위크 게시물 조회수\n\n\n❗ 시그널 위크 수상작 발표\n\n발표 일시 : 2022.12.31\n시그널 위크 점수 산정 방식을 통해 선정된 1 ~ 3위의 프로젝트가 2022년 4분기 명예의 전당에 등록됩니다.\n\n',15,'2022-10-15 20:47:48'),(5,0,'[시그널 위크] 2023년 1분기 시그널 위크 등록','❗ 2023년 1분기 시그널 위크 프로젝트 등록 안내\n\n프로젝트 등록 접수 : 2023.01.16 ~ 2023.02.12\n시그널 위크 프로젝트 투표 기간 : 2023.02.13 ~ 2023.02.16\n\n\n❗ 투표 방법\n\n1. 시그널 위크 -> 시그널 위크 프로젝트\n2. 2023년 1분기 시그널 위크 게시물에 투표 아이콘 클릭\n3. 투표완료!\n\n\n❗ 시그널 위크 점수 산정 방식\n\n1. 투표 총합\n2. 시그널 위크 게시물 조회수\n\n\n❗ 시그널 위크 수상작 발표\n\n발표 일시 : 2023.02.17\n시그널 위크 점수 산정 방식을 통해 선정된 1 ~ 3위의 프로젝트가 2023년 1분기 명예의 전당에 등록됩니다.\n\n',54,'2023-01-01 20:50:29');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `open_profile`
--

DROP TABLE IF EXISTS `open_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `open_profile` (
  `open_profile_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`open_profile_seq`),
  KEY `FK_OpenProfile_User_idx` (`user_seq`),
  CONSTRAINT `FK_OpenProfile_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_profile`
--

LOCK TABLES `open_profile` WRITE;
/*!40000 ALTER TABLE `open_profile` DISABLE KEYS */;
INSERT INTO `open_profile` VALUES (1,5,'2023-02-16 00:19:58'),(2,4,'2023-02-16 00:21:41'),(3,3,'2023-02-16 08:49:34'),(4,9,'2023-02-16 14:43:46'),(5,11,'2023-02-16 14:54:43'),(6,12,'2023-02-16 17:17:49');
/*!40000 ALTER TABLE `open_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posting`
--

DROP TABLE IF EXISTS `posting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posting` (
  `posting_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `content` text NOT NULL,
  `posting_start_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `posting_end_dt` datetime NOT NULL,
  `level` int NOT NULL,
  `posting_code` varchar(10) NOT NULL DEFAULT 'PPS102',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`posting_seq`),
  KEY `FK_Posting_CommonCode_idx` (`posting_code`),
  KEY `FK_Posting_User_idx` (`user_seq`),
  KEY `FK_Posting_Project_idx` (`posting_seq`),
  CONSTRAINT `FK_Posting_CommonCode` FOREIGN KEY (`posting_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Posting_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posting`
--

LOCK TABLES `posting` WRITE;
/*!40000 ALTER TABLE `posting` DISABLE KEYS */;
INSERT INTO `posting` VALUES (1,5,'어쩔','2023-02-15 21:54:21','2023-02-23 21:53:45',3,'PPS101','2023-02-15 21:54:21'),(2,3,'❗ 프로젝트 팀 빌딩을 도와주는 서비스 시그널\n- 비대면 팀 구성 서비스를 제공하는 서비스 입니다.\n- 팀 구성뿐만 아니라 프로젝트 진행을 위한 서비스, 시그널 위크를 통한 프로젝트 결과물을 평가할 수 있는 서비스까지 계획중 입니다.','2023-02-15 21:55:39','2023-02-16 21:50:04',3,'PPS101','2023-02-15 21:55:39'),(3,4,'집에서 반려동물을 키우는 사람들을 위한 전용 SNS으로써 기존의 SNS와는 다르게 자신이 키우는 반려동물에 관해 글을 작성하고 정보 공유 기능을 제공하는 서비스','2023-02-15 22:00:47','2023-02-21 21:55:01',2,'PPS102','2023-02-15 22:00:47'),(4,3,'유기견을 위한 플랫폼 PATPAT 입니다.','2023-02-15 22:01:09','2023-02-16 21:57:11',3,'PPS101','2023-02-15 22:01:09'),(5,3,'통역, Tonny \n해외에서도 간편하고 빠르게 실시간 통역 서비스!\n번역, Bunny\n간단하고 깔끔한 번역이 필요하다면? 토니버니의 번역 서비스!','2023-02-15 22:12:19','2023-02-16 22:08:33',3,'PPS101','2023-02-15 22:12:19'),(6,3,'푸쉬업, 플랭크, 런지, 버피 운동을 통한 게임 서비스','2023-02-15 22:14:24','2023-02-16 22:08:33',5,'PPS101','2023-02-15 22:14:24'),(7,3,'지식을 공유하는 개발자 중심 커뮤니티 서비스','2023-02-15 22:16:31','2023-02-24 22:14:33',4,'PPS102','2023-02-15 22:16:31'),(8,4,'1인 가구가 식품을 합리적이고 효율적으로 구매할 수 있는 공동 구매형 쇼핑몰 개발','2023-02-15 22:16:56','2023-02-15 22:11:04',3,'PPS101','2023-02-15 22:16:56'),(9,3,'집에서 즐길 수 있는 포차! 방구석 포차!','2023-02-15 22:18:05','2023-02-16 22:14:33',2,'PPS101','2023-02-15 22:18:05'),(10,4,'본인이 받고 싶은 선물을 등록, 공유. 공유 받은 링크를 통한 결제.\n내부에 마련된 쇼핑몰(GiftHub)과 외부 링크를 통해 선물 등록 가능','2023-02-15 22:24:07','2023-02-28 22:20:01',4,'PPS101','2023-02-15 22:24:07'),(11,4,'- 학부모는 비대면으로 학원 등록부터 출결, 성적 관리까지 학생 학원에 관한\n모든 프로세스를 한번에 해결 가능\n- 학원장은 학원 전반적인 관리를 웹 어플리케이션 하나로 처리 가능\n- 강사는 반과 학생 관리 그리고 본인 포트폴리오 관리를 통해 이력 관리 가능\n- webRTC 기술을 이용한 학부모와 강사/학원장 간 1:1 상담 기능 ','2023-02-15 22:27:00','2023-02-28 22:20:01',4,'PPS102','2023-02-15 22:27:00'),(12,4,'IoT를 통한 길고양이 데이터 수집\n지도를 통해 고양이 급식소 위치 공유와 커뮤니티 서비스','2023-02-15 22:29:05','2023-02-15 22:20:01',5,'PPS101','2023-02-15 22:29:05'),(13,4,'기부형 크라우드 펀딩을 통한 봉사활동 중개 플랫폼 \n\n펀딩 참여자는 기부형으로 펀딩에 참여, 펀딩 개최 단체는 봉사 운영 자금을 펀딩으로 모금하여 봉사 진행.\n\n참여자는 기부와 더불어 봉사에 보탬이 되었다는 뿌듯함과 따뜻함을 얻고 봉사 단체는 봉사활동 운영에 필요한 자금이 공급됨으로써 봉사활동을 보다 더 원활하게 진행이 가능함 -> 사회적으로 선순환적인 구조에 더불어 기부와 봉사에 더욱 접근성이 좋아짐.','2023-02-15 22:31:51','2023-02-15 22:20:01',4,'PPS101','2023-02-15 22:31:51'),(14,4,' 통합 관광 정보 및 플래너 기능을 갖춘 SNS 서비스\n외국인에게 전통적인 한국 문화들을 소개할 뿐만 아니라,\n커뮤니티 기능을 통해 진짜, 한국문화(PC방, MT, 찜질방 등)을 공유하고 서로 친구가 될 수 있는 서비스','2023-02-15 22:34:26','2023-02-15 22:20:01',3,'PPS102','2023-02-15 22:34:26'),(15,5,'IoT 제품들은 인터넷을 통해 서로 인지하고 연결됐을 때 더 큰 시너지를 낼 수 있다. 이런 의미에서 Node.js는 IoT의 한 축이 될 수 있다. Node.js는 인터넷 서비스를 효율적으로 만들기 위한 API와 모듈들을 제공한다. 또 안정적이면서 낮은 성능의 기기에서도 높은 성능을 제공해 IoT의 요구사항을 충족시키는 것이 바로 Node.js다.','2023-02-16 10:13:09','2023-02-23 10:09:49',4,'PPS102','2023-02-16 10:13:09'),(16,9,'함께 해요','2023-02-16 10:17:04','2023-02-16 10:14:46',1,'PPS101','2023-02-16 10:17:04'),(17,5,'팀 매칭 서비스 프로젝트 만들어 봅시다','2023-02-16 20:10:37','2023-02-22 20:04:32',3,'PPS101','2023-02-16 20:10:37'),(18,5,'쓰레기 배출 막는 프로젝트','2023-02-16 21:27:37','2023-02-17 21:26:31',4,'PPS102','2023-02-16 21:27:37');
/*!40000 ALTER TABLE `posting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posting_meeting`
--

DROP TABLE IF EXISTS `posting_meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posting_meeting` (
  `posting_meeting_seq` int NOT NULL AUTO_INCREMENT,
  `posting_seq` int DEFAULT NULL,
  `apply_seq` int DEFAULT NULL,
  `from_user_seq` int NOT NULL,
  `to_user_seq` int DEFAULT NULL,
  `meeting_dt` datetime NOT NULL,
  `posting_meeting_code` varchar(10) NOT NULL DEFAULT 'PM102',
  PRIMARY KEY (`posting_meeting_seq`),
  KEY `FK_PostingMeeting_Posting_idx` (`posting_seq`),
  KEY `FK_PostingMeeting_Users_idx` (`from_user_seq`),
  KEY `FK_PostingMeeting_Users_To_idx` (`to_user_seq`),
  KEY `FK_PostingMeeting_CommonCode_idx` (`posting_meeting_code`),
  KEY `FK_PostingMeeting_Apply_idx` (`apply_seq`),
  CONSTRAINT `FK_PostingMeeting_Apply` FOREIGN KEY (`apply_seq`) REFERENCES `apply` (`apply_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PostingMeeting_CommonCode` FOREIGN KEY (`posting_meeting_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_PostingMeeting_Posting` FOREIGN KEY (`posting_seq`) REFERENCES `posting` (`posting_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PostingMeeting_Users_From` FOREIGN KEY (`from_user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PostingMeeting_Users_To` FOREIGN KEY (`to_user_seq`) REFERENCES `user` (`user_seq`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posting_meeting`
--

LOCK TABLES `posting_meeting` WRITE;
/*!40000 ALTER TABLE `posting_meeting` DISABLE KEYS */;
INSERT INTO `posting_meeting` VALUES (1,1,NULL,5,NULL,'2023-02-15 19:00:00','PM101'),(2,1,NULL,5,NULL,'2023-02-15 20:00:00','PM101'),(3,1,NULL,5,NULL,'2023-02-16 21:00:00','PM101'),(4,1,NULL,5,NULL,'2023-02-17 22:00:00','PM101'),(5,1,NULL,5,NULL,'2023-02-18 22:00:00','PM101'),(6,1,NULL,5,NULL,'2023-02-20 22:00:00','PM101'),(7,1,NULL,5,NULL,'2023-02-19 22:00:00','PM101'),(8,2,NULL,3,NULL,'2023-02-15 22:00:01','PM101'),(9,2,1,3,4,'2023-02-16 00:00:00','PM101'),(10,2,NULL,3,NULL,'2023-02-16 01:00:00','PM101'),(11,2,NULL,3,NULL,'2023-02-16 02:00:00','PM101'),(12,2,NULL,3,NULL,'2023-02-16 03:00:00','PM101'),(13,2,NULL,3,NULL,'2023-02-16 04:00:00','PM101'),(14,3,NULL,4,NULL,'2023-02-16 20:00:00','PM102'),(15,3,26,4,5,'2023-02-17 20:00:00','PM100'),(16,3,NULL,4,NULL,'2023-02-16 19:00:00','PM102'),(17,3,NULL,4,NULL,'2023-02-17 19:00:00','PM102'),(18,3,NULL,4,NULL,'2023-02-18 10:00:00','PM102'),(19,3,NULL,4,NULL,'2023-02-18 11:00:00','PM102'),(20,3,NULL,4,NULL,'2023-02-18 12:00:00','PM102'),(21,3,NULL,4,NULL,'2023-02-18 14:00:00','PM102'),(22,3,NULL,4,NULL,'2023-02-18 15:00:00','PM102'),(23,4,4,3,4,'2023-02-15 00:00:00','PM101'),(24,5,5,3,4,'2023-02-15 00:00:01','PM101'),(25,5,NULL,3,NULL,'2023-02-15 01:00:01','PM101'),(26,5,NULL,3,NULL,'2023-02-15 02:00:01','PM101'),(27,5,NULL,3,NULL,'2023-02-15 03:00:01','PM101'),(28,5,NULL,3,NULL,'2023-02-15 04:00:01','PM101'),(29,5,NULL,3,NULL,'2023-02-15 05:00:01','PM101'),(30,6,3,3,4,'2023-02-15 00:00:01','PM101'),(31,6,NULL,3,NULL,'2023-02-15 01:00:01','PM101'),(32,7,NULL,3,NULL,'2023-02-16 00:00:00','PM102'),(33,8,21,4,3,'2023-02-20 18:00:00','PM101'),(34,8,NULL,4,NULL,'2023-02-20 19:00:00','PM101'),(35,8,NULL,4,NULL,'2023-02-20 20:00:00','PM101'),(36,8,24,4,7,'2023-02-21 18:00:00','PM101'),(37,8,NULL,4,NULL,'2023-02-21 19:00:00','PM101'),(38,8,23,4,12,'2023-02-21 20:00:00','PM101'),(39,9,2,3,4,'2023-02-16 00:00:00','PM101'),(40,9,NULL,3,NULL,'2023-02-16 01:00:00','PM101'),(41,9,NULL,3,NULL,'2023-02-16 02:00:00','PM101'),(42,9,NULL,3,NULL,'2023-02-16 03:00:00','PM101'),(43,9,NULL,3,NULL,'2023-02-16 04:00:00','PM101'),(44,9,NULL,3,NULL,'2023-02-16 05:00:00','PM101'),(45,10,17,4,3,'2023-02-25 10:00:00','PM101'),(46,10,18,4,7,'2023-02-25 09:00:00','PM101'),(47,10,20,4,5,'2023-02-25 11:00:00','PM101'),(48,10,19,4,12,'2023-02-25 12:00:00','PM101'),(49,10,NULL,4,NULL,'2023-02-26 10:00:00','PM101'),(50,10,NULL,4,NULL,'2023-02-26 11:00:00','PM101'),(51,10,NULL,4,NULL,'2023-02-26 12:00:00','PM101'),(52,10,NULL,4,NULL,'2023-02-26 09:00:00','PM101'),(53,11,NULL,4,NULL,'2023-02-18 10:00:00','PM102'),(54,11,NULL,4,NULL,'2023-02-18 11:00:00','PM102'),(55,11,NULL,4,NULL,'2023-02-18 12:00:00','PM102'),(56,11,NULL,4,NULL,'2023-02-18 13:00:00','PM102'),(57,11,NULL,4,NULL,'2023-02-18 14:00:00','PM102'),(58,11,NULL,4,NULL,'2023-02-18 15:00:00','PM102'),(59,11,NULL,4,NULL,'2023-02-18 16:00:00','PM102'),(60,11,NULL,4,NULL,'2023-02-19 13:00:00','PM102'),(61,11,NULL,4,NULL,'2023-02-19 14:00:00','PM102'),(62,11,NULL,4,NULL,'2023-02-19 15:00:00','PM102'),(63,11,NULL,4,NULL,'2023-02-19 16:00:00','PM102'),(64,12,14,4,3,'2023-02-18 10:00:00','PM101'),(65,12,NULL,4,NULL,'2023-02-18 11:00:00','PM101'),(66,12,NULL,4,NULL,'2023-02-18 12:00:00','PM101'),(67,12,16,4,12,'2023-02-18 14:00:00','PM101'),(68,12,NULL,4,NULL,'2023-02-18 15:00:00','PM101'),(69,12,15,4,7,'2023-02-18 16:00:00','PM101'),(70,12,NULL,4,NULL,'2023-02-19 13:00:00','PM101'),(71,12,NULL,4,NULL,'2023-02-19 14:00:00','PM101'),(72,12,NULL,4,NULL,'2023-02-19 15:00:00','PM101'),(73,12,13,4,5,'2023-02-19 16:00:00','PM101'),(74,12,NULL,4,NULL,'2023-02-19 10:00:00','PM101'),(75,12,NULL,4,NULL,'2023-02-19 11:00:00','PM101'),(76,12,NULL,4,NULL,'2023-02-19 12:00:00','PM101'),(77,13,NULL,4,NULL,'2023-02-18 10:00:00','PM101'),(78,13,NULL,4,NULL,'2023-02-18 11:00:00','PM101'),(79,13,NULL,4,NULL,'2023-02-18 12:00:00','PM101'),(80,13,NULL,4,NULL,'2023-02-18 13:00:00','PM101'),(81,13,NULL,4,NULL,'2023-02-18 14:00:00','PM101'),(82,13,NULL,4,NULL,'2023-02-17 10:00:00','PM101'),(83,13,NULL,4,NULL,'2023-02-17 11:00:00','PM101'),(84,13,11,4,11,'2023-02-17 12:00:00','PM101'),(85,13,9,4,5,'2023-02-17 13:00:00','PM101'),(86,13,NULL,4,NULL,'2023-02-17 14:00:00','PM101'),(87,13,NULL,4,NULL,'2023-02-17 15:00:00','PM101'),(88,13,12,4,7,'2023-02-17 16:00:00','PM101'),(89,13,10,4,3,'2023-02-16 10:00:00','PM101'),(90,13,NULL,4,NULL,'2023-02-16 11:00:00','PM101'),(91,13,NULL,4,NULL,'2023-02-16 12:00:00','PM101'),(92,13,NULL,4,NULL,'2023-02-16 13:00:00','PM101'),(93,13,NULL,4,NULL,'2023-02-16 14:00:00','PM101'),(94,14,NULL,4,NULL,'2023-02-17 10:00:00','PM102'),(95,14,NULL,4,NULL,'2023-02-17 11:00:00','PM102'),(96,14,NULL,4,NULL,'2023-02-17 12:00:00','PM102'),(97,14,NULL,4,NULL,'2023-02-17 13:00:00','PM102'),(98,14,NULL,4,NULL,'2023-02-17 14:00:00','PM102'),(99,14,NULL,4,NULL,'2023-02-16 10:00:00','PM102'),(100,14,NULL,4,NULL,'2023-02-16 11:00:00','PM102'),(101,14,NULL,4,NULL,'2023-02-16 12:00:00','PM102'),(102,14,NULL,4,NULL,'2023-02-16 13:00:00','PM102'),(103,14,NULL,4,NULL,'2023-02-16 14:00:00','PM102'),(104,15,NULL,5,NULL,'2023-02-16 09:00:01','PM102'),(105,15,NULL,5,NULL,'2023-02-17 09:00:00','PM102'),(106,15,22,5,7,'2023-02-18 09:00:00','PM100'),(107,15,NULL,5,NULL,'2023-02-19 09:00:00','PM102'),(108,15,NULL,5,NULL,'2023-02-21 09:00:00','PM102'),(109,15,NULL,5,NULL,'2023-02-20 09:00:00','PM102'),(110,15,NULL,5,NULL,'2023-02-20 10:00:00','PM102'),(111,15,NULL,5,NULL,'2023-02-20 11:00:00','PM102'),(112,15,NULL,5,NULL,'2023-02-20 12:00:00','PM102'),(113,15,NULL,5,NULL,'2023-02-20 13:00:00','PM102'),(114,15,NULL,5,NULL,'2023-02-20 15:00:00','PM102'),(115,16,6,9,6,'2023-02-16 08:00:00','PM101'),(116,16,7,9,8,'2023-02-16 09:00:00','PM101'),(117,16,NULL,9,NULL,'2023-02-16 10:00:00','PM101'),(118,16,8,9,10,'2023-02-16 11:00:00','PM101'),(119,17,29,5,12,'2023-02-16 18:00:01','PM101'),(120,17,32,5,7,'2023-02-16 17:00:01','PM101'),(121,17,NULL,5,NULL,'2023-02-16 15:00:01','PM101'),(122,17,NULL,5,NULL,'2023-02-23 14:00:00','PM101'),(123,17,NULL,5,NULL,'2023-02-23 12:00:00','PM101'),(124,17,28,5,4,'2023-02-23 11:00:00','PM101'),(125,17,25,5,11,'2023-02-23 09:00:00','PM101'),(126,18,NULL,5,NULL,'2023-02-16 19:00:01','PM102'),(127,18,NULL,5,NULL,'2023-02-16 20:00:01','PM102'),(128,18,NULL,5,NULL,'2023-02-16 21:00:01','PM102'),(129,18,NULL,5,NULL,'2023-02-25 21:00:00','PM102'),(130,18,NULL,5,NULL,'2023-02-25 22:00:00','PM102');
/*!40000 ALTER TABLE `posting_meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posting_position`
--

DROP TABLE IF EXISTS `posting_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posting_position` (
  `posting_position_seq` int NOT NULL AUTO_INCREMENT,
  `posting_seq` int DEFAULT NULL,
  `position_code` varchar(10) NOT NULL,
  `position_cnt` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`posting_position_seq`),
  KEY `FK_PostingPosition_CommonCode_idx` (`position_code`),
  KEY `FK_PostingPosition_Posting_idx` (`posting_seq`),
  CONSTRAINT `FK_PostingPosition_CommonCode` FOREIGN KEY (`position_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_PostingPosition_Posting` FOREIGN KEY (`posting_seq`) REFERENCES `posting` (`posting_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posting_position`
--

LOCK TABLES `posting_position` WRITE;
/*!40000 ALTER TABLE `posting_position` DISABLE KEYS */;
INSERT INTO `posting_position` VALUES (4,2,'PO100',3),(5,2,'PO101',3),(6,1,'PO102',1),(7,1,'PO100',1),(8,1,'PO101',1),(9,3,'PO100',2),(10,3,'PO101',2),(11,3,'PO102',1),(14,4,'PO100',3),(15,5,'PO100',3),(16,5,'PO101',3),(17,6,'PO101',1),(18,6,'PO100',1),(20,8,'PO100',3),(21,8,'PO101',2),(22,9,'PO100',3),(23,9,'PO101',3),(24,10,'PO100',3),(25,10,'PO101',2),(26,11,'PO100',3),(27,11,'PO101',1),(28,12,'PO100',3),(29,12,'PO101',2),(30,13,'PO100',3),(31,13,'PO101',2),(32,14,'PO100',3),(33,14,'PO101',2),(40,7,'PO100',1),(41,15,'PO100',3),(42,15,'PO101',3),(45,16,'PO100',4),(46,17,'PO101',3),(47,17,'PO100',3),(48,18,'PO102',3);
/*!40000 ALTER TABLE `posting_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posting_question`
--

DROP TABLE IF EXISTS `posting_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posting_question` (
  `posting_question_seq` int NOT NULL AUTO_INCREMENT,
  `posting_seq` int DEFAULT NULL,
  `num` int NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`posting_question_seq`),
  KEY `FK_PostingQuestions_Posting_idx` (`posting_seq`),
  CONSTRAINT `FK_PostingQuestions_Posting` FOREIGN KEY (`posting_seq`) REFERENCES `posting` (`posting_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posting_question`
--

LOCK TABLES `posting_question` WRITE;
/*!40000 ALTER TABLE `posting_question` DISABLE KEYS */;
INSERT INTO `posting_question` VALUES (2,2,1,'개발 스타일에 대해서 자유롭게 말씀해주세요'),(3,2,2,'프로젝트를 진행하면서 힘들었던 경험에 대해서 말씀해주세요'),(4,1,1,'없느디 '),(5,3,1,'사용해 본 기술스택이 무엇입니까?'),(6,3,2,'기술 스택의 스킬이 상, 중, 하 중 어느 정도 입니까?'),(9,4,1,'반려동물을 키우고 계신가요?'),(10,5,1,'영어 잘하시나요? '),(11,5,2,'영어 관련 자격증이 있으신가요?'),(12,6,1,'게임 잘하시나요?'),(14,8,1,'프로젝트 기술스택 이외에 사용할 수 있는 기술 스택이 있나요?'),(15,8,2,'이전 프로젝트 협업 경험이 있나요?'),(16,9,1,'주량이 어떻게 되십니까?'),(17,10,1,'Spring Boot 사용 경험이 있나요?'),(18,10,2,'프로젝트가 대면으로 진행 되는 데 참고해야 할 사항이 있나요?'),(19,11,1,'이전 프로젝트 경험이 있나요?'),(20,14,1,'이전 프로젝트 경험이 있습니까?'),(27,7,1,'스택오버플로우 아시나요?'),(28,15,1,'잘하세요?'),(29,16,1,'열정적으로 참여하실 수 있으신가요?'),(30,17,1,'대면 가능하신가요'),(31,18,1,'프론트 할줄 아세요?');
/*!40000 ALTER TABLE `posting_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posting_skill`
--

DROP TABLE IF EXISTS `posting_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posting_skill` (
  `posting_skill_seq` int NOT NULL AUTO_INCREMENT,
  `posting_seq` int DEFAULT NULL,
  `skill_code` varchar(10) NOT NULL,
  PRIMARY KEY (`posting_skill_seq`),
  KEY `FK_PostingSkill_Posting_idx` (`posting_seq`),
  KEY `FK_PostingSkill_CommonCode_idx` (`skill_code`),
  CONSTRAINT `FK_PostingSkill_CommonCode` FOREIGN KEY (`skill_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_PostingSkill_Posting` FOREIGN KEY (`posting_seq`) REFERENCES `posting` (`posting_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb3 COMMENT='공고 모집 스택';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posting_skill`
--

LOCK TABLES `posting_skill` WRITE;
/*!40000 ALTER TABLE `posting_skill` DISABLE KEYS */;
INSERT INTO `posting_skill` VALUES (7,2,'WE110'),(8,2,'PL106'),(9,2,'WE109'),(10,2,'WE105'),(11,2,'WE102'),(12,2,'DB102'),(13,2,'WE107'),(14,1,'WE101'),(15,1,'WE100'),(16,1,'WE102'),(17,1,'WE105'),(18,1,'WE104'),(19,1,'AI103'),(20,3,'PL106'),(21,3,'WE102'),(22,3,'WE105'),(23,3,'WE111'),(24,3,'DB102'),(35,4,'WE110'),(36,4,'PL106'),(37,4,'WE109'),(38,4,'WE102'),(39,4,'WE105'),(40,5,'WE110'),(41,5,'PL106'),(42,5,'WE102'),(43,5,'WE105'),(44,6,'WE110'),(45,6,'PL106'),(46,6,'WE109'),(51,8,'WE106'),(52,8,'PL106'),(53,8,'DB102'),(54,8,'WE102'),(55,8,'WE105'),(56,9,'WE110'),(57,9,'PL106'),(58,10,'WE109'),(59,10,'WE110'),(60,10,'DB102'),(61,11,'WE111'),(62,11,'WE110'),(63,11,'PL106'),(64,11,'DB102'),(65,12,'WE110'),(66,12,'WE109'),(67,12,'DB102'),(68,13,'WE109'),(69,13,'WE110'),(70,13,'PL118'),(71,13,'DB102'),(72,13,'WE102'),(73,13,'WE105'),(74,14,'WE110'),(75,14,'WE109'),(76,14,'DB102'),(77,14,'WE102'),(102,7,'WE110'),(103,7,'PL106'),(104,7,'WE105'),(105,7,'WE102'),(106,15,'PL117'),(107,15,'PL107'),(108,15,'PL106'),(109,15,'WE110'),(110,15,'WE102'),(111,15,'WE109'),(118,16,'WE101'),(119,16,'WE110'),(120,16,'WE109'),(121,17,'WE102'),(122,17,'WE103'),(123,17,'WE104'),(124,17,'WE111'),(125,17,'WE110'),(126,17,'PL112'),(127,17,'PL117'),(128,17,'PL118'),(129,18,'WE102'),(130,18,'WE103'),(131,18,'WE106'),(132,18,'WE101'),(133,18,'WE100'),(134,18,'WE104');
/*!40000 ALTER TABLE `posting_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_seq` int NOT NULL AUTO_INCREMENT,
  `posting_seq` int DEFAULT NULL,
  `subject` varchar(50) NOT NULL,
  `local_code` varchar(10) NOT NULL,
  `field_code` varchar(10) NOT NULL,
  `is_contact` tinyint(1) NOT NULL,
  `week_cnt` int unsigned NOT NULL DEFAULT '1',
  `term` int NOT NULL,
  `git_url` varchar(200) DEFAULT NULL,
  `content` text,
  `evaluation_dt` date DEFAULT NULL,
  `project_code` varchar(10) NOT NULL DEFAULT 'PS102',
  `project_image_file_seq` int DEFAULT '1',
  `evaluation_cnt` int unsigned NOT NULL DEFAULT '1',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_seq`),
  KEY `FK_Project_CommonCode_idx` (`project_code`),
  KEY `FK_Project_ImageFile_idx` (`project_image_file_seq`),
  KEY `FK_Project_CommonCode_idx1` (`local_code`),
  KEY `FK_Project_CommonCode_idx2` (`field_code`),
  KEY `FK_Project_Posting_idx` (`posting_seq`),
  CONSTRAINT `FK_Project_CommonCode` FOREIGN KEY (`project_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Project_CommonCode_Field` FOREIGN KEY (`field_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Project_CommonCode_Local` FOREIGN KEY (`local_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_Project_ImageFile` FOREIGN KEY (`project_image_file_seq`) REFERENCES `image_file` (`image_file_seq`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_Project_Posting` FOREIGN KEY (`posting_seq`) REFERENCES `posting` (`posting_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,1,'영화 리뷰를 모아서 추천해주는 프로젝트 ','24','FI105',0,1,10,NULL,NULL,'2023-02-22','PS101',1,1,'2023-02-15 21:54:21'),(2,2,'팀 빌딩 서비스 시그널','21','FI100',1,1,10,'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12E207','팀 빌딩 서비스 입니다.','2023-02-23','PS100',6,1,'2023-02-15 21:55:39'),(3,3,'애완동물들을 키우시는 애호가들을 위한 SNS 사이트 제작 프로젝트','22','FI100',1,1,10,NULL,NULL,NULL,'PS102',1,1,'2023-02-15 22:00:47'),(4,4,'유기견을 위한 플랫폼 PATPAT','21','FI100',0,1,10,NULL,NULL,'2023-02-23','PS100',7,1,'2023-02-15 22:01:09'),(5,5,'실시간 통역서비스 Tonny Bunny','21','FI100',1,1,10,NULL,NULL,'2023-02-23','PS100',8,1,'2023-02-15 22:12:19'),(6,6,'WebRTC 를 이용한 운동 서비스 Gym & Glory','21','FI104',1,1,10,NULL,NULL,'2023-02-23','PS100',9,1,'2023-02-15 22:14:24'),(7,7,'개발자 중심 커뮤니티 트라이캐치','21','FI100',0,1,10,NULL,NULL,NULL,'PS102',1,1,'2023-02-15 22:16:31'),(8,8,'1인 가구를 위한 식품 쇼핑몰 제작','11','FI100',1,1,10,NULL,NULL,'2023-02-23','PS100',17,1,'2023-02-15 22:16:56'),(9,9,'WebRTC 를 이용한 포차! 방구석 포차','11','FI100',1,1,10,NULL,NULL,'2023-02-23','PS100',1,1,'2023-02-15 22:18:05'),(10,10,'TIFY (This Is For You)','21','FI100',1,1,10,NULL,NULL,'2023-02-23','PS100',16,1,'2023-02-15 22:24:07'),(11,11,'1:1 화상 상담이 가능한 학원/학생 관리 플랫폼','21','FI100',1,1,10,NULL,NULL,NULL,'PS102',1,1,'2023-02-15 22:27:00'),(12,12,'냥그릇','11','FI100',1,1,10,NULL,NULL,'2023-02-23','PS100',15,1,'2023-02-15 22:29:05'),(13,13,'FUNTEER','11','FI100',1,1,10,NULL,NULL,'2023-02-23','PS100',13,1,'2023-02-15 22:31:51'),(14,14,'Trudy','11','FI100',1,1,10,NULL,NULL,NULL,'PS102',1,1,'2023-02-15 22:34:26'),(15,15,'집안의 가구를 한번에 조작할수있는 앱','21','FI104',1,1,10,NULL,NULL,NULL,'PS102',1,1,'2023-02-16 10:13:09'),(16,16,'프로젝트 팀 빌딩 서비스 시그널','11','FI100',0,1,10,NULL,NULL,'2023-02-23','PS100',1,1,'2023-02-16 10:17:04'),(17,17,'프로젝트 팀 매칭 서비스 ','21','FI100',1,4,3,NULL,NULL,'2023-02-22','PS101',18,1,'2023-02-16 20:10:37'),(18,18,'환경 오염의 주범인 쓰레기 배출 막는 프로젝트','21','FI100',1,1,10,NULL,NULL,NULL,'PS102',1,1,'2023-02-16 21:27:37');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_evaluation`
--

DROP TABLE IF EXISTS `project_evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_evaluation` (
  `project_evaluation_seq` int NOT NULL AUTO_INCREMENT,
  `project_seq` int NOT NULL,
  `from_user_seq` int NOT NULL,
  `to_user_seq` int NOT NULL,
  `num` int NOT NULL,
  `score` int NOT NULL,
  `week_cnt` int NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_evaluation_seq`),
  KEY `FK_Evaluation_Project_idx` (`project_seq`),
  KEY `FK_ProjectEvaluation_ProjectEvaluationQuestion_idx` (`num`),
  KEY `FK_ProjectEvaluation_ProjectUser_From_idx` (`from_user_seq`),
  KEY `FK_ProjectEvaluation_ProjectUser_To_idx` (`to_user_seq`),
  KEY `FK_ProjectEvaluation_ProjectUser_idx` (`from_user_seq`,`to_user_seq`),
  CONSTRAINT `FK_Evaluation_Project` FOREIGN KEY (`project_seq`) REFERENCES `project` (`project_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ProjectEvaluation_ProjectEvaluationQuestion` FOREIGN KEY (`num`) REFERENCES `project_evaluation_question` (`project_evaluation_question_seq`),
  CONSTRAINT `FK_ProjectEvaluation_ProjectUser_fromUser` FOREIGN KEY (`from_user_seq`) REFERENCES `project_user` (`project_user_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ProjectEvaluation_ProjectUser_toUser` FOREIGN KEY (`to_user_seq`) REFERENCES `project_user` (`project_user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb3 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_evaluation`
--

LOCK TABLES `project_evaluation` WRITE;
/*!40000 ALTER TABLE `project_evaluation` DISABLE KEYS */;
INSERT INTO `project_evaluation` VALUES (146,17,40,41,1,40,1,'2023-02-16 21:18:40'),(147,17,40,41,2,40,1,'2023-02-16 21:18:40'),(148,17,40,41,3,40,1,'2023-02-16 21:18:40'),(149,17,40,41,4,40,1,'2023-02-16 21:18:40'),(150,17,40,41,5,40,1,'2023-02-16 21:18:40'),(151,17,43,40,1,50,1,'2023-02-16 21:18:44'),(152,17,43,40,2,50,1,'2023-02-16 21:18:44'),(153,17,43,40,3,50,1,'2023-02-16 21:18:44'),(154,17,43,40,4,50,1,'2023-02-16 21:18:44'),(155,17,43,40,5,50,1,'2023-02-16 21:18:44'),(166,17,41,40,1,40,1,'2023-02-16 21:18:52'),(167,17,41,40,2,40,1,'2023-02-16 21:18:52'),(168,17,41,40,3,40,1,'2023-02-16 21:18:52'),(169,17,41,40,4,50,1,'2023-02-16 21:18:52'),(170,17,41,40,5,50,1,'2023-02-16 21:18:52'),(171,17,40,43,1,40,1,'2023-02-16 21:18:52'),(172,17,40,43,2,40,1,'2023-02-16 21:18:52'),(173,17,40,43,3,50,1,'2023-02-16 21:18:52'),(174,17,40,43,4,40,1,'2023-02-16 21:18:52'),(175,17,40,43,5,40,1,'2023-02-16 21:18:52'),(176,17,43,41,1,50,1,'2023-02-16 21:18:56'),(177,17,43,41,2,50,1,'2023-02-16 21:18:56'),(178,17,43,41,3,50,1,'2023-02-16 21:18:56'),(179,17,43,41,4,50,1,'2023-02-16 21:18:56'),(180,17,43,41,5,50,1,'2023-02-16 21:18:56'),(196,17,41,43,1,40,1,'2023-02-16 21:19:08'),(197,17,41,43,2,40,1,'2023-02-16 21:19:08'),(198,17,41,43,3,40,1,'2023-02-16 21:19:08'),(199,17,41,43,4,50,1,'2023-02-16 21:19:08'),(200,17,41,43,5,50,1,'2023-02-16 21:19:08'),(206,17,41,40,1,40,2,'2023-02-16 21:24:49'),(207,17,41,40,2,40,2,'2023-02-16 21:24:49'),(208,17,41,40,3,50,2,'2023-02-16 21:24:49'),(209,17,41,40,4,50,2,'2023-02-16 21:24:49'),(210,17,41,40,5,50,2,'2023-02-16 21:24:49'),(211,17,43,40,1,50,2,'2023-02-16 21:24:53'),(212,17,43,40,2,50,2,'2023-02-16 21:24:53'),(213,17,43,40,3,50,2,'2023-02-16 21:24:53'),(214,17,43,40,4,50,2,'2023-02-16 21:24:53'),(215,17,43,40,5,50,2,'2023-02-16 21:24:53'),(221,17,43,41,1,50,2,'2023-02-16 21:25:03'),(222,17,43,41,2,50,2,'2023-02-16 21:25:03'),(223,17,43,41,3,50,2,'2023-02-16 21:25:03'),(224,17,43,41,4,50,2,'2023-02-16 21:25:03'),(225,17,43,41,5,50,2,'2023-02-16 21:25:03'),(226,17,41,43,1,40,2,'2023-02-16 21:25:11'),(227,17,41,43,2,40,2,'2023-02-16 21:25:11'),(228,17,41,43,3,50,2,'2023-02-16 21:25:11'),(229,17,41,43,4,50,2,'2023-02-16 21:25:11'),(230,17,41,43,5,50,2,'2023-02-16 21:25:11'),(241,17,40,41,1,50,2,'2023-02-16 21:25:29'),(242,17,40,41,2,50,2,'2023-02-16 21:25:29'),(243,17,40,41,3,50,2,'2023-02-16 21:25:29'),(244,17,40,41,4,50,2,'2023-02-16 21:25:29'),(245,17,40,41,5,50,2,'2023-02-16 21:25:29'),(256,17,40,43,1,30,2,'2023-02-16 21:25:42'),(257,17,40,43,2,30,2,'2023-02-16 21:25:42'),(258,17,40,43,3,30,2,'2023-02-16 21:25:42'),(259,17,40,43,4,30,2,'2023-02-16 21:25:42'),(260,17,40,43,5,30,2,'2023-02-16 21:25:42'),(271,17,43,40,1,50,3,'2023-02-16 21:27:19'),(272,17,43,40,2,50,3,'2023-02-16 21:27:19'),(273,17,43,40,3,50,3,'2023-02-16 21:27:19'),(274,17,43,40,4,50,3,'2023-02-16 21:27:19'),(275,17,43,40,5,50,3,'2023-02-16 21:27:19'),(276,17,41,40,1,40,3,'2023-02-16 21:27:21'),(277,17,41,40,2,50,3,'2023-02-16 21:27:21'),(278,17,41,40,3,40,3,'2023-02-16 21:27:21'),(279,17,41,40,4,50,3,'2023-02-16 21:27:21'),(280,17,41,40,5,40,3,'2023-02-16 21:27:21'),(286,17,43,41,1,50,3,'2023-02-16 21:27:28'),(287,17,43,41,2,50,3,'2023-02-16 21:27:28'),(288,17,43,41,3,50,3,'2023-02-16 21:27:28'),(289,17,43,41,4,50,3,'2023-02-16 21:27:28'),(290,17,43,41,5,50,3,'2023-02-16 21:27:28'),(306,17,41,43,1,40,3,'2023-02-16 21:27:44'),(307,17,41,43,2,50,3,'2023-02-16 21:27:44'),(308,17,41,43,3,40,3,'2023-02-16 21:27:44'),(309,17,41,43,4,50,3,'2023-02-16 21:27:44'),(310,17,41,43,5,40,3,'2023-02-16 21:27:44'),(311,17,40,41,1,50,3,'2023-02-16 21:28:12'),(312,17,40,41,2,50,3,'2023-02-16 21:28:12'),(313,17,40,41,3,50,3,'2023-02-16 21:28:12'),(314,17,40,41,4,50,3,'2023-02-16 21:28:12'),(315,17,40,41,5,50,3,'2023-02-16 21:28:12'),(321,17,40,43,1,40,3,'2023-02-16 21:28:24'),(322,17,40,43,2,40,3,'2023-02-16 21:28:24'),(323,17,40,43,3,40,3,'2023-02-16 21:28:24'),(324,17,40,43,4,40,3,'2023-02-16 21:28:24'),(325,17,40,43,5,40,3,'2023-02-16 21:28:24');
/*!40000 ALTER TABLE `project_evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_evaluation_question`
--

DROP TABLE IF EXISTS `project_evaluation_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_evaluation_question` (
  `project_evaluation_question_seq` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  PRIMARY KEY (`project_evaluation_question_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_evaluation_question`
--

LOCK TABLES `project_evaluation_question` WRITE;
/*!40000 ALTER TABLE `project_evaluation_question` DISABLE KEYS */;
INSERT INTO `project_evaluation_question` VALUES (1,'의사소통에 적극적으로 참여했나요?'),(2,'약속 시간을 잘 지켰나요?'),(3,'얼마나 프로젝트에 성실히 임했나요?'),(4,'얼마나 목표를 이행하였나요?'),(5,'얼마나 프로젝트에 기여했나요?');
/*!40000 ALTER TABLE `project_evaluation_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_file`
--

DROP TABLE IF EXISTS `project_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_file` (
  `project_file_seq` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `size` int NOT NULL,
  `type` varchar(100) NOT NULL,
  `url` varchar(500) NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_file_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COMMENT='ppt파일 readme 파일 정보 저장';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_file`
--

LOCK TABLES `project_file` WRITE;
/*!40000 ALTER TABLE `project_file` DISABLE KEYS */;
INSERT INTO `project_file` VALUES (1,'제목을 입력해주세요_-001.pdf',266031,'pdf','/static/ppt/96d9467c-f353-4a38-ad87-b791b09fc842.pdf','2023-02-15 23:46:38'),(2,'기본과제필수 1.md',910,'md','/static/readme/24e5cf08-d2fb-40f8-9a58-04c19cfcd2cb.md','2023-02-15 23:46:38'),(3,'7조_공통프로젝트_기획서.pdf',373741,'pdf','/static/ppt/38127c7d-4d61-4d65-a57f-1cff316e8940.pdf','2023-02-16 08:56:37'),(4,'README.md',34,'md','/static/readme/5f33cf1e-59ca-493d-b694-e952faf77790.md','2023-02-16 08:56:37'),(5,'7조_공통프로젝트_기획서.pdf',373741,'pdf','/static/ppt/b23b80d4-7502-4547-b3c6-bcf925207af4.pdf','2023-02-16 09:18:18'),(6,'README.md',34,'md','/static/readme/42d80c3a-4f73-4b96-b618-ff318fa95628.md','2023-02-16 09:18:18'),(7,'7조_공통프로젝트_기획서.pdf',373741,'pdf','/static/ppt/1dbf7adb-7826-4a94-8a78-f0745b5909e4.pdf','2023-02-16 09:34:26'),(8,'README.md',34,'md','/static/readme/45efce87-31ca-4686-b571-fbed7fb4e0b2.md','2023-02-16 09:34:26'),(9,'7조_공통프로젝트_기획서.pdf',373741,'pdf','/static/ppt/00b110e6-45b1-46c3-90a5-b9f38961ebca.pdf','2023-02-16 09:38:05'),(10,'README.md',34,'md','/static/readme/35604b85-ac57-449a-8b15-9eb284321d24.md','2023-02-16 09:38:05'),(11,'공통프로젝트 산출물.pdf',2032067,'pdf','/static/ppt/1b84fbed-f547-4138-9755-a88d2845dd0e.pdf','2023-02-16 17:25:06'),(12,'공통프로젝트 산출물.pdf',2032067,'pdf','/static/ppt/7e55af52-0f5b-480d-a063-6d9b4561f6b6.pdf','2023-02-16 17:39:14'),(13,'README.md',2034,'md','/static/readme/2e971755-ba7b-4d20-a1f0-2fef83e42f0c.md','2023-02-16 17:39:14'),(14,'Figma 사용법.pdf',1829789,'pdf','/static/ppt/d088f97a-c2ae-4156-bf47-aaad035c6285.pdf','2023-02-16 17:43:35'),(15,'README.md',2034,'md','/static/readme/1d5669e1-5890-4b25-a1c0-8903b1e75921.md','2023-02-16 17:43:35');
/*!40000 ALTER TABLE `project_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_notion_docs`
--

DROP TABLE IF EXISTS `project_notion_docs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_notion_docs` (
  `project_notion_docs_seq` int NOT NULL AUTO_INCREMENT,
  `project_seq` int NOT NULL,
  `url` varchar(200) NOT NULL,
  `num` int NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_notion_docs_seq`),
  KEY `FK_NotionDocs_Project_idx` (`project_seq`),
  CONSTRAINT `FK_NotionDocs_Project` FOREIGN KEY (`project_seq`) REFERENCES `project` (`project_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_notion_docs`
--

LOCK TABLES `project_notion_docs` WRITE;
/*!40000 ALTER TABLE `project_notion_docs` DISABLE KEYS */;
INSERT INTO `project_notion_docs` VALUES (2,17,'bcab84cdd8aa4a309736a0d8f2bab7df',1,'2023-02-16 20:21:50');
/*!40000 ALTER TABLE `project_notion_docs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_position`
--

DROP TABLE IF EXISTS `project_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_position` (
  `project_position_seq` int NOT NULL AUTO_INCREMENT,
  `project_seq` int DEFAULT NULL,
  `position_code` varchar(10) NOT NULL,
  `position_cnt` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`project_position_seq`),
  KEY `FK_PostingPosition_CommonCode_idx` (`position_code`),
  KEY `FK_ProjectPosition_Posting_idx` (`project_seq`),
  CONSTRAINT `FK_ProjectPosition_CommonCode` FOREIGN KEY (`position_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_ProjectPosition_Project` FOREIGN KEY (`project_seq`) REFERENCES `project` (`project_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COMMENT='공고 모집 포지션';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_position`
--

LOCK TABLES `project_position` WRITE;
/*!40000 ALTER TABLE `project_position` DISABLE KEYS */;
INSERT INTO `project_position` VALUES (1,1,'PO101',1),(2,9,'PO101',2),(3,6,'PO101',2),(4,5,'PO101',2),(5,4,'PO101',1),(6,4,'PO100',1),(7,2,'PO101',1),(8,2,'PO100',1),(9,16,'PO100',1),(10,13,'PO101',3),(11,13,'PO100',2),(12,12,'PO101',3),(13,12,'PO100',2),(14,10,'PO101',2),(15,10,'PO100',3),(16,8,'PO101',3),(17,8,'PO100',1),(18,17,'PO101',1),(19,17,'PO100',1),(20,17,'PO102',1);
/*!40000 ALTER TABLE `project_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_to_do`
--

DROP TABLE IF EXISTS `project_to_do`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_to_do` (
  `project_to_do_seq` int NOT NULL AUTO_INCREMENT,
  `project_seq` int NOT NULL,
  `user_seq` int NOT NULL,
  `content` text NOT NULL,
  `to_do_code` varchar(10) NOT NULL DEFAULT 'TD100',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_to_do_seq`),
  KEY `FK_ToDo_Project_idx` (`project_seq`),
  KEY `FK_ToDo_Users_idx` (`user_seq`),
  KEY `FK_ToDo_CommonCode_idx` (`to_do_code`),
  CONSTRAINT `FK_ToDo_CommonCode` FOREIGN KEY (`to_do_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_ToDo_Project` FOREIGN KEY (`project_seq`) REFERENCES `project` (`project_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ToDo_Users` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_to_do`
--

LOCK TABLES `project_to_do` WRITE;
/*!40000 ALTER TABLE `project_to_do` DISABLE KEYS */;
INSERT INTO `project_to_do` VALUES (1,17,11,'개발팀 페이지 css','TD100','2023-02-16 20:21:02'),(2,17,4,'화상회의 페이지 화면 구성','TD100','2023-02-16 20:21:10'),(3,17,4,'지원서 페이지 화면 구성','TD101','2023-02-16 20:21:25'),(4,17,7,'코드 리뷰 하기','TD101','2023-02-16 20:21:33'),(5,17,4,'지원서 등록 구현','TD101','2023-02-16 20:22:00'),(6,17,7,'알고리즘 스터디','TD100','2023-02-16 20:23:09');
/*!40000 ALTER TABLE `project_to_do` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_user`
--

DROP TABLE IF EXISTS `project_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_user` (
  `project_user_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `project_seq` int DEFAULT NULL,
  `warning_cnt` int NOT NULL DEFAULT '0',
  `position_code` varchar(10) NOT NULL,
  `is_leader` tinyint unsigned NOT NULL DEFAULT '0',
  `heart_cnt` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`project_user_seq`),
  KEY `FK_ProjectUsers_Users_idx` (`user_seq`),
  KEY `FK_ProjectUsers_Project_idx` (`project_seq`),
  KEY `FK_PorjectUsers_CommonCode_idx` (`position_code`),
  CONSTRAINT `FK_PorjectUsers_CommonCode` FOREIGN KEY (`position_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_ProjectUsers_Project` FOREIGN KEY (`project_seq`) REFERENCES `project` (`project_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ProjectUsers_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_user`
--

LOCK TABLES `project_user` WRITE;
/*!40000 ALTER TABLE `project_user` DISABLE KEYS */;
INSERT INTO `project_user` VALUES (1,5,1,0,'PO101',1,100),(2,3,2,0,'PO101',1,100),(3,4,3,0,'PO103',1,100),(4,3,4,0,'PO101',1,100),(5,3,5,0,'PO101',1,100),(6,3,6,0,'PO101',1,100),(7,3,7,0,'PO101',1,100),(8,4,8,0,'PO101',1,100),(9,3,9,0,'PO101',1,100),(10,4,10,0,'PO101',1,100),(11,4,11,0,'PO101',1,100),(12,4,12,0,'PO101',1,100),(13,4,13,0,'PO101',1,100),(14,4,14,0,'PO101',1,100),(15,4,9,0,'PO101',0,100),(16,4,6,0,'PO101',0,100),(17,4,5,0,'PO101',0,100),(18,4,4,0,'PO100',0,100),(19,4,2,0,'PO100',0,100),(20,5,15,0,'PO100',1,100),(21,9,16,0,'PO100',1,100),(25,5,13,0,'PO100',0,100),(26,3,13,0,'PO101',0,100),(27,11,13,0,'PO100',0,100),(28,7,13,0,'PO101',0,100),(29,5,12,0,'PO101',0,100),(30,3,12,0,'PO100',0,100),(31,7,12,0,'PO100',0,100),(32,12,12,0,'PO101',0,100),(33,3,10,0,'PO101',0,100),(34,7,10,0,'PO100',0,100),(35,12,10,0,'PO100',0,100),(36,5,10,0,'PO100',0,100),(37,3,8,0,'PO101',0,100),(38,12,8,0,'PO101',0,100),(39,7,8,0,'PO100',0,100),(40,5,17,0,'PO102',1,0),(41,11,17,0,'PO100',0,0),(43,7,17,0,'PO101',0,0),(44,5,18,0,'PO102',1,100);
/*!40000 ALTER TABLE `project_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_user_heart_log`
--

DROP TABLE IF EXISTS `project_user_heart_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_user_heart_log` (
  `project_user_heart_log_seq` int NOT NULL AUTO_INCREMENT,
  `project_user_seq` int NOT NULL,
  `heart_cnt` int NOT NULL,
  `content` text NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_user_heart_log_seq`),
  KEY `FK_ProjectUserHeartLog_ProjectUser_idx` (`project_user_seq`),
  CONSTRAINT `FK_ProjectUserHeartLog_ProjectUser` FOREIGN KEY (`project_user_seq`) REFERENCES `project_user` (`project_user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb3 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_user_heart_log`
--

LOCK TABLES `project_user_heart_log` WRITE;
/*!40000 ALTER TABLE `project_user_heart_log` DISABLE KEYS */;
INSERT INTO `project_user_heart_log` VALUES (1,1,100,'프로젝트 시작','2023-02-15 21:54:21'),(2,2,100,'팀 빌딩 서비스 시그널 프로젝트 시작','2023-02-15 21:55:40'),(3,3,100,'프로젝트 시작','2023-02-15 22:00:47'),(4,4,100,'유기견을 위한 플랫폼 PATPAT 프로젝트 시작','2023-02-15 22:01:09'),(5,5,100,'실시간 통역서비스 Tonny Bunny 프로젝트 시작','2023-02-15 22:12:19'),(6,6,100,'WebRTC 를 이용한 운동 서비스 Gym & Glory 프로젝트 시작','2023-02-15 22:14:24'),(7,7,100,'개발자 중심 커뮤니티 트라이캐치 프로젝트 시작','2023-02-15 22:16:31'),(8,8,100,'프로젝트 시작','2023-02-15 22:16:56'),(9,9,100,'WebRTC 를 이용한 포차! 방구석 포차 프로젝트 시작','2023-02-15 22:18:05'),(10,10,100,'프로젝트 시작','2023-02-15 22:24:07'),(11,11,100,'프로젝트 시작','2023-02-15 22:27:00'),(12,12,100,'프로젝트 시작','2023-02-15 22:29:05'),(13,13,100,'프로젝트 시작','2023-02-15 22:31:51'),(14,14,100,'프로젝트 시작','2023-02-15 22:34:26'),(15,1,-100,'영화 리뷰를 모아서 추천해주는 프로젝트  종료로 인한 보증금 반환','2023-02-15 23:31:55'),(16,15,100,'WebRTC 를 이용한 포차! 방구석 포차 프로젝트 시작','2023-02-16 01:26:39'),(17,16,100,'WebRTC 를 이용한 운동 서비스 Gym & Glory 프로젝트 시작','2023-02-16 01:27:06'),(18,17,100,'실시간 통역서비스 Tonny Bunny 프로젝트 시작','2023-02-16 01:27:17'),(19,18,100,'유기견을 위한 플랫폼 PATPAT 프로젝트 시작','2023-02-16 01:27:31'),(20,19,100,'팀 빌딩 서비스 시그널 프로젝트 시작','2023-02-16 01:27:45'),(21,20,100,'집안의 가구를 한번에 조작할수있는 앱 프로젝트 시작','2023-02-16 10:13:09'),(22,21,100,'프로젝트 팀 빌딩 서비스 시그널 프로젝트 시작','2023-02-16 10:17:04'),(32,25,100,'FUNTEER 프로젝트 시작','2023-02-16 15:36:56'),(33,26,100,'FUNTEER 프로젝트 시작','2023-02-16 15:36:56'),(34,27,100,'FUNTEER 프로젝트 시작','2023-02-16 15:36:56'),(35,28,100,'FUNTEER 프로젝트 시작','2023-02-16 15:36:56'),(36,29,100,'냥그릇 프로젝트 시작','2023-02-16 17:17:53'),(37,30,100,'냥그릇 프로젝트 시작','2023-02-16 17:17:53'),(38,31,100,'냥그릇 프로젝트 시작','2023-02-16 17:17:53'),(39,32,100,'냥그릇 프로젝트 시작','2023-02-16 17:17:53'),(40,33,100,'TIFY (This Is For You) 프로젝트 시작','2023-02-16 17:30:33'),(41,34,100,'TIFY (This Is For You) 프로젝트 시작','2023-02-16 17:30:33'),(42,35,100,'TIFY (This Is For You) 프로젝트 시작','2023-02-16 17:30:33'),(43,36,100,'TIFY (This Is For You) 프로젝트 시작','2023-02-16 17:30:33'),(44,37,100,'1인 가구를 위한 식품 쇼핑몰 제작 프로젝트 시작','2023-02-16 17:40:03'),(45,38,100,'1인 가구를 위한 식품 쇼핑몰 제작 프로젝트 시작','2023-02-16 17:40:03'),(46,39,100,'1인 가구를 위한 식품 쇼핑몰 제작 프로젝트 시작','2023-02-16 17:40:03'),(47,40,100,'프로젝트 팀 매칭 서비스  프로젝트 시작','2023-02-16 20:10:37'),(48,41,100,'프로젝트 팀 매칭 서비스  프로젝트 시작','2023-02-16 20:20:12'),(50,43,100,'프로젝트 팀 매칭 서비스  프로젝트 시작','2023-02-16 20:20:12'),(68,44,100,'환경 오염의 주범인 쓰레기 배출 막는 프로젝트 프로젝트 시작','2023-02-16 21:27:37'),(70,40,-100,'프로젝트 팀 매칭 서비스  종료로 인한 보증금 반환','2023-02-16 21:40:58'),(71,41,-100,'프로젝트 팀 매칭 서비스  종료로 인한 보증금 반환','2023-02-16 21:40:58'),(72,43,-100,'프로젝트 팀 매칭 서비스  종료로 인한 보증금 반환','2023-02-16 21:40:58');
/*!40000 ALTER TABLE `project_user_heart_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna` (
  `qna_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `title` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `is_top` tinyint unsigned NOT NULL DEFAULT '0',
  `view` int unsigned NOT NULL DEFAULT '0',
  `answer` text,
  `is_answer` tinyint unsigned NOT NULL DEFAULT '0',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`qna_seq`),
  KEY `FK_Qna_User_idx` (`user_seq`),
  CONSTRAINT `FK_Qna_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
INSERT INTO `qna` VALUES (1,3,'시그널 위크 등록 방법','시그널 위크 등록은 어떻게 하나요?',1,20,NULL,0,'2023-02-15 21:48:47'),(2,3,'시그널 위크 수상 내역 확인 방법','시그널 위크 수상 내역은 어디서 확인할 수 있나요?',1,38,NULL,0,'2023-02-15 21:49:26'),(3,4,'오픈 프로필 등록 방법','오픈 프로필 등록을 하고 싶은 데 어디서 신청해야 하나요?\n따로 신청 폼이 있을까요?',0,5,NULL,0,'2023-02-16 22:48:52'),(4,3,'시그널 위크 수상 보상','시그널 위크 3위안에 들게 되면 어떤 보상이 있나요?\n상금이나 하트 보상이 있나요?',0,2,NULL,0,'2023-02-16 22:55:48'),(5,4,'새로운 스킬 추가 방법','현재 선택 가능한 스킬 이외에 스킬들은 어떻게 추가 할 수 있나요? \nnode js 가 빠져있어서 새롭게 추가하고 싶습니다!',0,0,NULL,0,'2023-02-16 23:04:46'),(6,4,'하트 보증금 관련 문의','하트 보증금은 프로젝트 완료 후 돌려받을 수 있나요?',0,8,NULL,0,'2023-02-16 23:05:45');
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signalweek`
--

DROP TABLE IF EXISTS `signalweek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signalweek` (
  `signalweek_seq` int NOT NULL AUTO_INCREMENT,
  `signalweek_schedule_seq` int NOT NULL,
  `project_seq` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `ucc_url` varchar(500) NOT NULL,
  `deploy_url` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `ppt_file_seq` int DEFAULT NULL,
  `readme_file_seq` int DEFAULT NULL,
  `view` int DEFAULT '0',
  PRIMARY KEY (`signalweek_seq`),
  KEY `FK_Signalweek_Project_idx` (`project_seq`),
  KEY `FK_Signalweek_SignalweekLog_idx` (`signalweek_schedule_seq`),
  CONSTRAINT `FK_Signalweek_Project` FOREIGN KEY (`project_seq`) REFERENCES `project` (`project_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Signalweek_SignalweekSchedule` FOREIGN KEY (`signalweek_schedule_seq`) REFERENCES `signalweek_schedule` (`signalweek_schedule_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signalweek`
--

LOCK TABLES `signalweek` WRITE;
/*!40000 ALTER TABLE `signalweek` DISABLE KEYS */;
INSERT INTO `signalweek` VALUES (1,1,1,'영화 리뷰 추천 프로젝트','https://www.youtube.com/watch?v=R12op-QMC0E&ab_channel=CharliePuth-Topic','https://www.youtube.com/watch?v=R12op-QMC0E&ab_channel=CharliePuth-Topic','요즘 영화 고르기 힘든데 영화 추천해주는 사이트 입니다',1,2,0),(2,2,2,'팀 빌딩 서비스 시그널','https://www.youtube.com/watch?v=rzGPQ0Jk-To','https://www.ssafysignal.site/','팀 빌딩 서비스 시그널',3,4,7),(3,2,4,'유기견을 위한 플랫폼 PATPAT','https://www.youtube.com/watch?v=nYo7tsNZWQk','https://i8e104.p.ssafy.io/','유기견을 위한 플랫폼 PATPAT',5,6,6),(4,1,5,'실시간 통역 서비스 Tonny Bunny','https://www.youtube.com/watch?v=kIZLMN-Skgc','https://i8e105.p.ssafy.io/','실시간 통역 서비스 Tonny Bunny',7,8,0),(5,1,6,'Gym & Glory','https://www.youtube.com/watch?v=cgsqsVxd5xc','https://i8e107.p.ssafy.io/','Gym & Glory',9,10,0),(6,2,12,'냥그릇 이다냥','https://youtu.be/b8pZfM0H950','https://i8e108.p.ssafy.io/','냥그릇 이다냥\r\n일등 우리꺼다냥 ',11,10,4),(7,2,10,'TIFY','https://www.youtube.com/watch?v=7PrTh3hpZlk&t=6828s','https://i8e208.p.ssafy.io','TIFY 입니두\r\n본인이 받고 싶은 선물을 등록, 공유. 공유 받은 링크를 통한 결제.\r\n내부에 마련된 쇼핑몰(GiftHub)과 외부 링크를 통해 선물 등록 가능',12,13,4),(8,2,8,'1인 가구 식품 쇼핑몰','https://www.youtube.com/watch?v=ciWmE0sp-6o','https://www.youtube.com/watch?v=ciWmE0sp-6o','식품쇼핑몰이라 쓰고 가구 쇼핑몰이라 읽는다',14,15,3);
/*!40000 ALTER TABLE `signalweek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signalweek_rank`
--

DROP TABLE IF EXISTS `signalweek_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signalweek_rank` (
  `signalweek_rank_seq` int NOT NULL AUTO_INCREMENT,
  `signalweek_seq` int NOT NULL,
  `signalweek_schedule_seq` int NOT NULL,
  `ranking` int NOT NULL,
  PRIMARY KEY (`signalweek_rank_seq`),
  KEY `FK_signalweek_idx` (`signalweek_seq`),
  KEY `FK_signalweek_schedule_idx` (`signalweek_schedule_seq`),
  CONSTRAINT `FK_signalweek` FOREIGN KEY (`signalweek_seq`) REFERENCES `signalweek` (`signalweek_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_signalweek_schedule` FOREIGN KEY (`signalweek_schedule_seq`) REFERENCES `signalweek_schedule` (`signalweek_schedule_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signalweek_rank`
--

LOCK TABLES `signalweek_rank` WRITE;
/*!40000 ALTER TABLE `signalweek_rank` DISABLE KEYS */;
INSERT INTO `signalweek_rank` VALUES (1,4,1,1),(2,5,1,2),(3,1,1,3),(4,5,3,1),(5,1,3,2),(6,4,3,3);
/*!40000 ALTER TABLE `signalweek_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signalweek_schedule`
--

DROP TABLE IF EXISTS `signalweek_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signalweek_schedule` (
  `signalweek_schedule_seq` int NOT NULL AUTO_INCREMENT,
  `open_start_dt` date NOT NULL,
  `open_end_dt` date NOT NULL,
  `vote_start_dt` date NOT NULL,
  `vote_end_dt` date NOT NULL,
  `quarter` int NOT NULL,
  `year` int NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`signalweek_schedule_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signalweek_schedule`
--

LOCK TABLES `signalweek_schedule` WRITE;
/*!40000 ALTER TABLE `signalweek_schedule` DISABLE KEYS */;
INSERT INTO `signalweek_schedule` VALUES (1,'2022-11-01','2022-11-30','2022-12-01','2022-12-30',4,2022,'2022-10-15 21:09:30'),(2,'2023-01-16','2023-02-12','2023-02-13','2023-02-17',1,2023,'2023-02-15 21:19:35'),(3,'2022-08-01','2022-08-30','2022-09-01','2022-09-30',3,2022,'2022-07-15 21:09:30');
/*!40000 ALTER TABLE `signalweek_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signalweek_vote`
--

DROP TABLE IF EXISTS `signalweek_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signalweek_vote` (
  `signalweek_vote_seq` int NOT NULL AUTO_INCREMENT,
  `signalweek_seq` int NOT NULL,
  `from_user_seq` int NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `signalweek_schedule_seq` int DEFAULT NULL,
  PRIMARY KEY (`signalweek_vote_seq`),
  KEY `FK_SignalweekVote_Signalweek_From_idx` (`from_user_seq`),
  KEY `FK_SignalweekVote_Signalweek_idx` (`signalweek_seq`),
  KEY `signalweek_schedule_seq` (`signalweek_schedule_seq`),
  CONSTRAINT `FK_SignalweekVote_Signalweek` FOREIGN KEY (`signalweek_seq`) REFERENCES `signalweek` (`signalweek_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_SignalweekVote_User_From` FOREIGN KEY (`from_user_seq`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `signalweek_vote_ibfk_1` FOREIGN KEY (`signalweek_schedule_seq`) REFERENCES `signalweek_schedule` (`signalweek_schedule_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signalweek_vote`
--

LOCK TABLES `signalweek_vote` WRITE;
/*!40000 ALTER TABLE `signalweek_vote` DISABLE KEYS */;
INSERT INTO `signalweek_vote` VALUES (1,1,5,'2023-02-16 00:31:54',1),(3,3,7,'2023-02-16 11:42:39',2),(8,3,9,'2023-02-16 14:08:54',2),(9,2,9,'2023-02-16 14:09:06',2),(14,2,12,'2023-02-16 17:45:00',2),(15,2,4,'2023-02-16 17:45:02',2),(16,2,3,'2023-02-16 19:54:58',2),(17,2,11,'2023-02-16 19:55:01',2),(18,2,7,'2023-02-16 19:55:04',2),(19,2,5,'2023-02-16 19:55:26',2),(20,6,11,'2023-02-16 19:55:58',2),(22,6,7,'2023-02-16 19:56:30',2),(23,3,11,'2023-02-16 19:56:48',2),(24,3,4,'2023-02-16 19:57:04',2);
/*!40000 ALTER TABLE `signalweek_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signalweek_vote_history`
--

DROP TABLE IF EXISTS `signalweek_vote_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `signalweek_vote_history` (
  `signalweek_vote_history_seq` int NOT NULL AUTO_INCREMENT,
  `signalweek_seq` int NOT NULL,
  `user_seq` int NOT NULL,
  PRIMARY KEY (`signalweek_vote_history_seq`),
  KEY `FK_SignalweekVoteHistory_Signalweek_idx` (`signalweek_seq`),
  KEY `FK_SignalweekVoteHistory_User_idx` (`user_seq`),
  CONSTRAINT `FK_SignalweekVoteHistory_Signalweek` FOREIGN KEY (`signalweek_seq`) REFERENCES `signalweek` (`signalweek_seq`),
  CONSTRAINT `FK_SignalweekVoteHistory_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signalweek_vote_history`
--

LOCK TABLES `signalweek_vote_history` WRITE;
/*!40000 ALTER TABLE `signalweek_vote_history` DISABLE KEYS */;
INSERT INTO `signalweek_vote_history` VALUES (4,2,3),(5,2,4),(6,2,7),(7,2,11),(8,2,5),(9,3,3),(10,3,11),(11,6,11),(12,7,11),(13,8,7),(14,6,3),(15,3,7),(16,6,7),(17,7,7),(18,3,4),(19,2,12),(20,7,4),(21,8,4),(22,8,11),(23,3,5),(24,2,14),(25,3,14),(26,6,14),(27,7,3);
/*!40000 ALTER TABLE `signalweek_vote_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `nickname` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_image_file_seq` int NOT NULL DEFAULT '0',
  `heart_cnt` int unsigned NOT NULL DEFAULT '0',
  `birth` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `FK_User_ImageFile_idx` (`user_image_file_seq`),
  CONSTRAINT `FK_User_ImageFile` FOREIGN KEY (`user_image_file_seq`) REFERENCES `image_file` (`image_file_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'관리자','admin@test.com','{bcrypt}$2a$10$tvLZlMS7m3hTkND5JbflXum.VQKyXn66DOZDgJ9h3CpTsy9TGvITO','관리자','010-9999-9999','2023-02-04 18:08:14',0,0,'2023-01-21'),(1,'coach','coach@ssafy.com','{bcrypt}$2a$10$xBGBVx/8wF2aRWliJrqV5.IjmxbYJxCQsAtQGiMD1buXw.W/mnhna','코치','010-1234-5678','2023-02-03 16:51:18',0,0,'2023-02-17'),(2,'con','con@ssafy.com','{bcrypt}$2a$10$.uU3fR7DDmZ6M0fq8zDTpOKC6pSWj9AKHmNkbdEgu0JEHRSz6sz.6','컨설턴트','010-1234-5678','2023-02-03 16:52:07',0,0,'2023-02-17'),(3,'박상민','tablemin_park@daum.net','{bcrypt}$2a$10$qhKOOkWQx6hz0DUY5j8VtO5tEznDUgHfnfcAQZndESUUcLoau5bwe','상민','010-5793-2055','2023-02-15 21:38:24',2,10000,'1997-05-06'),(4,'나유진','nyj3230@naver.com','{bcrypt}$2a$10$b0VqD3S3/H/hXxyERqmzdOHrXgiNeht/6QIHzyrQzK3gBMsMYtU/6','나유','010-8001-3235','2023-02-15 21:38:54',3,700,'1999-11-05'),(5,'김현진','kjinabc@naver.com','{bcrypt}$2a$10$V7y.cRsjrGabaLLePxYKzuP/NKVRrH1td.UtsndTICUJ9v30Kh4rS','김현진','010-4937-2341','2023-02-15 21:41:48',5,500,'1997-11-03'),(6,'인모님','test1@test.com','{bcrypt}$2a$10$5u/4o2.FP.W/LTi8ZT7xyOrtFXPdSW7lMF9nX0W2P83j.tqA39phi','Table park','010-1234-5678','2023-02-15 21:46:19',11,900,'1997-08-30'),(7,'권혁근','xkhg0611x@naver.com','{bcrypt}$2a$10$AHsULTlRD/2Q.xnR.NDr9.q7S9zPGSsMdJx9bJC/eEUvERlqF0TuK','혁근','010-4801-5358','2023-02-16 00:14:45',4,600,'1997-06-11'),(8,'TEST2','test2@test.com','{bcrypt}$2a$10$CPIlu1SqIoknAmKhCe2Z8.PwoK5dVy4tIjU8HINp7Q0jWOCFZgYaq','서버고인물','010-1234-5678','2023-02-16 10:10:37',12,900,'1997-08-30'),(9,'TEST3','test3@test.com','{bcrypt}$2a$10$.RHpenJZNt8vsI5oWv.BT.CuwJNSJ8kNEqWcAsQGy4HCUlKWIEoTC','Subin','010-1234-5678','2023-02-16 10:11:35',0,900,'1999-01-01'),(10,'TEST4','test4@test.com','{bcrypt}$2a$10$c0DEL8LYjUQnB7j23Hh1Q.1iE7Ha2.JLqG83cawoPwpue2eTeT436','hyeok','010-1234-5678','2023-02-16 10:13:08',0,900,'1997-01-01'),(11,'황수빈','marybin99@naver.com','{bcrypt}$2a$10$uFqPyD1YVJk.NmvPr16q9enVW1aGy.gFn0IX/Q2EvO6kilnmP.DQW','수빈','010-5746-3078','2023-02-16 10:32:11',10,900,'1999-01-21'),(12,'정인모','cat10830@naver.com','{bcrypt}$2a$10$MDUns3Zv/kMjfWT7K49snetk.M7cn6iC/e2nktDANsFdr42o8PDsa','인모짱','010-8725-5693','2023-02-16 17:14:17',14,2700,'1997-08-30'),(13,'김덕배','kjinabc@gmail.com','{bcrypt}$2a$10$6oHJuIbYW0z6sgKM.Ggrbu/lovifkuE.tkq9OaZZxq67lNhwDTxOy','김덕배','010-4937-2341','2023-02-16 21:15:00',0,0,'1997-11-03'),(14,'나유진','nyj3230@gmail.com','{bcrypt}$2a$10$veWUFsnemiy3MtMUo38Nv./LfaJDvXjrT5Zlj.2piaQVl4yyKFCwi','나유진','010-8001-3235','2023-02-16 22:06:48',0,0,'1999-11-05');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auth`
--

DROP TABLE IF EXISTS `user_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_auth` (
  `user_auth_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`user_auth_seq`),
  KEY `FK_UserRoles_User_idx` (`user_seq`),
  CONSTRAINT `FK_UserRoles_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth`
--

LOCK TABLES `user_auth` WRITE;
/*!40000 ALTER TABLE `user_auth` DISABLE KEYS */;
INSERT INTO `user_auth` VALUES (0,0,'ADMIN'),(1,1,'USER'),(2,2,'USER'),(3,3,'USER'),(4,4,'USER'),(5,5,'USER'),(6,6,'USER'),(7,7,'USER'),(8,8,'USER'),(9,9,'USER'),(10,10,'USER'),(11,11,'USER'),(12,12,'USER'),(13,14,'USER');
/*!40000 ALTER TABLE `user_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_career`
--

DROP TABLE IF EXISTS `user_career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_career` (
  `user_career_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `content` varchar(500) NOT NULL,
  PRIMARY KEY (`user_career_seq`),
  KEY `FK_UsersCareer_Users_idx` (`user_seq`),
  CONSTRAINT `FK_UsersCareer_Users` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_career`
--

LOCK TABLES `user_career` WRITE;
/*!40000 ALTER TABLE `user_career` DISABLE KEYS */;
INSERT INTO `user_career` VALUES (3,7,'싸피 8기'),(4,11,'상민 센세 제자'),(5,11,'서칸 센세 제자'),(6,3,'따릉이 무사고 20년차'),(7,12,'좀 높음');
/*!40000 ALTER TABLE `user_career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_exp`
--

DROP TABLE IF EXISTS `user_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_exp` (
  `user_exp_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`user_exp_seq`),
  KEY `FK_UserExp_User_idx` (`user_seq`),
  CONSTRAINT `FK_UserExp_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_exp`
--

LOCK TABLES `user_exp` WRITE;
/*!40000 ALTER TABLE `user_exp` DISABLE KEYS */;
INSERT INTO `user_exp` VALUES (1,3,'IOT 프로젝트 진행 경험'),(2,3,'임베디드 프로그래밍 경험'),(3,7,'스프링 6개월차'),(4,4,'이메일 분류 AI 모델 개발'),(6,11,'시그널 프로젝트여'),(9,5,'싸피 해봄'),(10,12,'후후후후');
/*!40000 ALTER TABLE `user_exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_heart_log`
--

DROP TABLE IF EXISTS `user_heart_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_heart_log` (
  `user_heart_log_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `heart_cnt` int NOT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL,
  PRIMARY KEY (`user_heart_log_seq`),
  KEY `FK_heartLog_Users_idx` (`user_seq`),
  CONSTRAINT `FK_heartLog_Users` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb3 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_heart_log`
--

LOCK TABLES `user_heart_log` WRITE;
/*!40000 ALTER TABLE `user_heart_log` DISABLE KEYS */;
INSERT INTO `user_heart_log` VALUES (1,4,1000,'2023-02-15 21:45:29','하트 충전'),(2,3,1000,'2023-02-15 21:46:37','하트 충전'),(3,6,1000,'2023-02-15 21:47:49','하트 충전'),(4,5,1000,'2023-02-15 21:52:41','하트 충전'),(5,5,-100,'2023-02-15 21:54:21','하고 싶은거 하는 프로젝트에 팀장으로 팀 등록 확정'),(6,3,-100,'2023-02-15 21:55:39','팀 빌딩 서비스 시그널에 팀장으로 팀 등록 확정'),(7,4,-100,'2023-02-15 22:00:47','애완동물들을 키우시는 애호가들을 위한 SNS 사이트 제작 프로젝트에 팀장으로 팀 등록 확정'),(8,3,-100,'2023-02-15 22:01:09','유기견을 위한 플랫폼 PATPAT에 팀장으로 팀 등록 확정'),(9,3,-100,'2023-02-15 22:12:19','실시간 통역서비스 Tonny Bunny에 팀장으로 팀 등록 확정'),(10,3,-100,'2023-02-15 22:14:24','WebRTC 를 이용한 운동 서비스 Gym & Glory에 팀장으로 팀 등록 확정'),(11,3,-100,'2023-02-15 22:16:31','개발자 중심 커뮤니티 트라이캐치에 팀장으로 팀 등록 확정'),(12,4,-100,'2023-02-15 22:16:56','1인 가구를 위한 식품 쇼핑몰 제작에 팀장으로 팀 등록 확정'),(13,3,-100,'2023-02-15 22:18:05','WebRTC 를 이용한 포차! 방구석 포차에 팀장으로 팀 등록 확정'),(14,4,-100,'2023-02-15 22:24:07','TIFY (This Is For You)에 팀장으로 팀 등록 확정'),(15,4,-100,'2023-02-15 22:27:00','1:1 화상 상담이 가능한 학원/학생 관리 플랫폼에 팀장으로 팀 등록 확정'),(16,4,-100,'2023-02-15 22:29:05','냥그릇에 팀장으로 팀 등록 확정'),(17,4,-100,'2023-02-15 22:31:51','FUNTEER에 팀장으로 팀 등록 확정'),(18,4,-100,'2023-02-15 22:34:26','Trudy에 팀장으로 팀 등록 확정'),(19,5,100,'2023-02-15 23:31:55','영화 리뷰를 모아서 추천해주는 프로젝트  종료로 인한 보증금 반환'),(20,4,-100,'2023-02-16 00:16:26','WebRTC 를 이용한 포차! 방구석 포차에 팀 등록 확정'),(21,4,-100,'2023-02-16 00:16:27','팀 빌딩 서비스 시그널에 팀 등록 확정'),(22,4,-100,'2023-02-16 00:17:19','유기견을 위한 플랫폼 PATPAT에 팀 등록 확정'),(34,7,1000,'2023-02-16 00:17:54','하트 충전'),(39,4,1000,'2023-02-16 00:20:47','하트 충전'),(40,4,-100,'2023-02-16 00:20:51','실시간 통역서비스 Tonny Bunny에 팀 등록 확정'),(41,4,-100,'2023-02-16 00:20:53','WebRTC 를 이용한 운동 서비스 Gym & Glory에 팀 등록 확정'),(42,5,-100,'2023-02-16 10:13:09','집안의 가구를 한번에 조작할수있는 앱에 팀장으로 팀 등록 확정'),(43,9,1000,'2023-02-16 10:14:40','하트 충전'),(44,9,-100,'2023-02-16 10:17:04','프로젝트 팀 빌딩 서비스 시그널에 팀장으로 팀 등록 확정'),(45,8,1000,'2023-02-16 10:19:33','하트 충전'),(46,10,1000,'2023-02-16 10:21:45','하트 충전'),(47,6,-100,'2023-02-16 10:26:41','프로젝트 팀 빌딩 서비스 시그널에 팀 등록 확정'),(48,8,-100,'2023-02-16 10:27:01','프로젝트 팀 빌딩 서비스 시그널에 팀 등록 확정'),(49,10,-100,'2023-02-16 11:14:08','프로젝트 팀 빌딩 서비스 시그널에 팀 등록 확정'),(50,11,1000,'2023-02-16 15:32:31','하트 충전'),(51,3,-100,'2023-02-16 15:35:16','FUNTEER에 팀 등록 확정'),(52,11,-100,'2023-02-16 15:35:36','FUNTEER에 팀 등록 확정'),(53,5,-100,'2023-02-16 15:35:40','FUNTEER에 팀 등록 확정'),(54,7,-100,'2023-02-16 15:36:45','FUNTEER에 팀 등록 확정'),(55,12,3000,'2023-02-16 17:16:26','하트 충전'),(56,3,-100,'2023-02-16 17:17:20','냥그릇에 팀 등록 확정'),(57,7,-100,'2023-02-16 17:17:27','냥그릇에 팀 등록 확정'),(58,12,-100,'2023-02-16 17:17:31','냥그릇에 팀 등록 확정'),(59,5,-100,'2023-02-16 17:17:31','냥그릇에 팀 등록 확정'),(60,3,10000,'2023-02-16 17:18:17','하트 충전'),(61,3,-100,'2023-02-16 17:29:23','TIFY (This Is For You)에 팀 등록 확정'),(62,12,-100,'2023-02-16 17:30:07','TIFY (This Is For You)에 팀 등록 확정'),(63,7,-100,'2023-02-16 17:30:11','TIFY (This Is For You)에 팀 등록 확정'),(64,5,-100,'2023-02-16 17:30:27','TIFY (This Is For You)에 팀 등록 확정'),(65,3,-100,'2023-02-16 17:39:46','1인 가구를 위한 식품 쇼핑몰 제작에 팀 등록 확정'),(66,7,-100,'2023-02-16 17:40:00','1인 가구를 위한 식품 쇼핑몰 제작에 팀 등록 확정'),(67,12,-100,'2023-02-16 17:40:01','1인 가구를 위한 식품 쇼핑몰 제작에 팀 등록 확정'),(68,5,-100,'2023-02-16 20:10:37','프로젝트 팀 매칭 서비스 에 팀장으로 팀 등록 확정'),(69,7,-100,'2023-02-16 20:17:57','프로젝트 팀 매칭 서비스 에 팀 등록 확정'),(70,11,-100,'2023-02-16 20:18:02','프로젝트 팀 매칭 서비스 에 팀 등록 확정'),(71,4,-100,'2023-02-16 20:19:33','프로젝트 팀 매칭 서비스 에 팀 등록 확정'),(72,5,-100,'2023-02-16 21:27:37','환경 오염의 주범인 쓰레기 배출 막는 프로젝트에 팀장으로 팀 등록 확정'),(73,5,100,'2023-02-16 21:40:58','프로젝트 팀 매칭 서비스  종료로 인한 보증금 반환'),(74,11,100,'2023-02-16 21:40:58','프로젝트 팀 매칭 서비스  종료로 인한 보증금 반환'),(75,7,100,'2023-02-16 21:40:58','프로젝트 팀 매칭 서비스  종료로 인한 보증금 반환');
/*!40000 ALTER TABLE `user_heart_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_position`
--

DROP TABLE IF EXISTS `user_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_position` (
  `user_position_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `position_code` varchar(10) NOT NULL,
  PRIMARY KEY (`user_position_seq`),
  KEY `FK_UserPosition_User_idx` (`user_seq`),
  KEY `FK_UserPosition_CommonCode_idx` (`position_code`),
  CONSTRAINT `FK_UserPosition_CommonCode` FOREIGN KEY (`position_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_UserPosition_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_position`
--

LOCK TABLES `user_position` WRITE;
/*!40000 ALTER TABLE `user_position` DISABLE KEYS */;
INSERT INTO `user_position` VALUES (1,3,'PO101'),(2,3,'PO104'),(3,4,'PO100'),(5,7,'PO101'),(6,4,'PO101'),(7,4,'PO104'),(8,5,'PO100'),(9,5,'PO101'),(10,11,'PO103'),(11,11,'PO100'),(12,11,'PO102'),(13,12,'PO101');
/*!40000 ALTER TABLE `user_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_skill`
--

DROP TABLE IF EXISTS `user_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_skill` (
  `user_skill_seq` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `skill_code` varchar(10) NOT NULL,
  PRIMARY KEY (`user_skill_seq`),
  KEY `FK_UserSkills_Users_idx` (`user_seq`),
  KEY `FK_UserSkill_CommonCode_idx` (`skill_code`),
  CONSTRAINT `FK_UserSkill_CommonCode` FOREIGN KEY (`skill_code`) REFERENCES `common_code` (`code`),
  CONSTRAINT `FK_UserSkill_User` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_skill`
--

LOCK TABLES `user_skill` WRITE;
/*!40000 ALTER TABLE `user_skill` DISABLE KEYS */;
INSERT INTO `user_skill` VALUES (1,3,'PL106'),(2,3,'WE110'),(3,3,'WE111'),(4,3,'WE107'),(5,3,'DB102'),(6,3,'WE105'),(7,4,'PL106'),(8,4,'WE110'),(9,4,'PL102'),(10,4,'PL101'),(11,4,'WE109'),(12,4,'DB102'),(14,4,'WE102'),(15,4,'WE105'),(16,4,'WE111'),(17,4,'PL111'),(18,4,'PL112'),(19,7,'WE110'),(20,7,'PL106'),(21,5,'WE103'),(22,5,'PL106'),(23,5,'PL112'),(24,5,'WE109'),(25,5,'WE111'),(26,5,'WE110'),(27,5,'PL117'),(28,5,'PL118'),(29,11,'WE102'),(30,11,'WE103'),(31,11,'WE105'),(32,11,'WE109'),(33,12,'AI102'),(34,12,'AI103'),(35,12,'PL112');
/*!40000 ALTER TABLE `user_skill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:51:39
