-- MySQL Workbench Synchronization
-- Generated: 2020-05-09 15:20
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: LV-SS

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `blog` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `blog`.`TB_User` (
  `idUser` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `profileImage` VARCHAR(45) NULL DEFAULT NULL,
  `summary` MULTILINESTRING NULL,
  `email` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NULL DEFAULT NULL,
  `education` VARCHAR(45) NULL DEFAULT NULL,
  `idEmployer` INT(11) NULL DEFAULT NULL,
  `skills_languages` MULTILINESTRING NULL,
  `getting_into` MULTILINESTRING NULL,
  `projects_and_hacks` MULTILINESTRING NULL,
  `available_for` MULTILINESTRING NULL,
  `brand_color_primary` CHAR(6) NULL DEFAULT 'd7dee2',
  `brand_color_secondary` CHAR(6) NULL DEFAULT '022235',
  PRIMARY KEY (`idUser`),
  INDEX `fk_TB_User_Employer_idx` (`idEmployer` ASC) VISIBLE,
  CONSTRAINT `fk_TB_User_Employer`
    FOREIGN KEY (`idEmployer`)
    REFERENCES `blog`.`TB_Employer` (`idTB_Employer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_Links` (
  `idLinks` INT(11) NOT NULL,
  `idUser` INT(11) NOT NULL,
  `facebook_url` VARCHAR(45) NULL DEFAULT NULL,
  `youtube_url` VARCHAR(45) NULL DEFAULT NULL,
  `stackoverflow_profile` VARCHAR(45) NULL DEFAULT NULL,
  `behance_profile` VARCHAR(45) NULL DEFAULT NULL,
  `dibble_profile` VARCHAR(45) NULL DEFAULT NULL,
  `gitlab` VARCHAR(45) NULL DEFAULT NULL,
  `instagram` VARCHAR(45) NULL DEFAULT NULL,
  `mastodon` VARCHAR(45) NULL DEFAULT NULL,
  `twitch` VARCHAR(45) NULL DEFAULT NULL,
  `website_url` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idLinks`),
  INDEX `fk_Links_User_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Links_User`
    FOREIGN KEY (`idUser`)
    REFERENCES `blog`.`TB_User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_Post` (
  `idPost` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `mins_to_read` VARCHAR(45) NULL DEFAULT NULL,
  `content` MULTILINESTRING NOT NULL,
  `likes_number` INT(11) NOT NULL DEFAULT 0,
  `idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idPost`),
  INDEX `fk_Post_User1_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Post_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `blog`.`TB_User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_Comment` (
  `idComment` INT(11) NOT NULL,
  `content` MULTILINESTRING NOT NULL,
  `idUser` INT(11) NOT NULL,
  `idCommentFK` INT(11) NULL DEFAULT NULL,
  `idPost` INT(11) NOT NULL,
  PRIMARY KEY (`idComment`),
  INDEX `fk_Comment_User1_idx` (`idUser` ASC) VISIBLE,
  INDEX `fk_Comment_Comment1_idx` (`idCommentFK` ASC) VISIBLE,
  INDEX `fk_Comment_Post_idx` (`idPost` ASC) VISIBLE,
  CONSTRAINT `fk_Comment_User1`
    FOREIGN KEY (`idUser`)
    REFERENCES `blog`.`TB_User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comment_Comment1`
    FOREIGN KEY (`idCommentFK`)
    REFERENCES `blog`.`TB_Comment` (`idComment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comment_Post`
    FOREIGN KEY (`idPost`)
    REFERENCES `blog`.`TB_Post` (`idPost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_Like` (
  `User_idUser` INT(11) NOT NULL,
  `Post_idPost` INT(11) NOT NULL,
  `idLike` INT(11) NOT NULL,
  PRIMARY KEY (`idLike`),
  INDEX `fk_Like_User1_idx` (`User_idUser` ASC) VISIBLE,
  INDEX `fk_Like_Post1_idx` (`Post_idPost` ASC) VISIBLE,
  CONSTRAINT `fk_Like_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `blog`.`TB_User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Like_Post1`
    FOREIGN KEY (`Post_idPost`)
    REFERENCES `blog`.`TB_Post` (`idPost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_Tags` (
  `idTags` INT(11) NOT NULL,
  `tagname` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idTags`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_Post_Tag` (
  `Tags_idTags` INT(11) NOT NULL,
  `Post_idPost` INT(11) NOT NULL,
  PRIMARY KEY (`Tags_idTags`, `Post_idPost`),
  INDEX `fk_tagPost_Tags1_idx` (`Tags_idTags` ASC) VISIBLE,
  INDEX `fk_tagPost_Post1_idx` (`Post_idPost` ASC) VISIBLE,
  CONSTRAINT `fk_tagPost_Tags1`
    FOREIGN KEY (`Tags_idTags`)
    REFERENCES `blog`.`TB_Tags` (`idTags`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tagPost_Post1`
    FOREIGN KEY (`Post_idPost`)
    REFERENCES `blog`.`TB_Post` (`idPost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_Employer` (
  `idTB_Employer` INT(11) NOT NULL,
  `employer_name` VARCHAR(45) NULL DEFAULT NULL,
  `employer_url` VARCHAR(45) NULL DEFAULT NULL,
  `employment_title` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idTB_Employer`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `blog`.`TB_TagsSubscribed` (
  `idUser` INT(11) NOT NULL,
  `idTags` INT(11) NOT NULL,
  `idTagsSubscribed` BIGINT(20) NOT NULL,
  PRIMARY KEY (`idTagsSubscribed`),
  INDEX `fk_TB_TagsSubscribed_Tags_idx` (`idTags` ASC) VISIBLE,
  CONSTRAINT `fk_TagsSubscribed_User`
    FOREIGN KEY (`idUser`)
    REFERENCES `blog`.`TB_User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TB_TagsSubscribed_Tags`
    FOREIGN KEY (`idTags`)
    REFERENCES `blog`.`TB_Tags` (`idTags`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
