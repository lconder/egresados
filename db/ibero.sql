-- MySQL Script generated by MySQL Workbench
-- Wed Jun 14 20:16:15 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ibero
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ibero
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ibero` DEFAULT CHARACTER SET latin1 ;
USE `ibero` ;

-- -----------------------------------------------------
-- Table `ibero`.`attendant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`attendant` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `second_lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 58
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`user` (
  `id` INT(11) NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`business`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`business` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATE NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `rfc` VARCHAR(15) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `facebook` VARCHAR(100) NULL DEFAULT NULL,
  `twitter` VARCHAR(100) NULL DEFAULT NULL,
  `website` VARCHAR(100) NULL DEFAULT NULL,
  `graduated` TINYINT(1) NOT NULL,
  `discount_description` VARCHAR(150) NOT NULL,
  `size` VARCHAR(45) NOT NULL,
  `business_type` VARCHAR(15) NOT NULL,
  `categorie` INT(11) NOT NULL,
  `logo` VARCHAR(150) NOT NULL,
  `act` VARCHAR(45) NOT NULL,
  `credential` VARCHAR(45) NOT NULL,
  `voucher` VARCHAR(45) NOT NULL,
  `street` VARCHAR(100) NOT NULL,
  `external_number` VARCHAR(10) NOT NULL,
  `internal_number` VARCHAR(10) NULL DEFAULT NULL,
  `postal_code` VARCHAR(9) NOT NULL,
  `suburb` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` INT(11) NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '0',
  `user_id` INT(11) NOT NULL,
  `attendant_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `attendant_id`),
  INDEX `fk_business_attendant1_idx` (`attendant_id` ASC),
  INDEX `fk_business_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_business_attendant1`
    FOREIGN KEY (`attendant_id`)
    REFERENCES `ibero`.`attendant` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_business_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ibero`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 58
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`branch` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `business_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `business_id`),
  INDEX `fk_branch_business1_idx` (`business_id` ASC),
  CONSTRAINT `fk_branch_business1`
    FOREIGN KEY (`business_id`)
    REFERENCES `ibero`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`promotions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `count` INT(45) NOT NULL,
  `expired_at` DATE NULL DEFAULT NULL,
  `business_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `business_id`),
  INDEX `fk_agreement_business_idx` (`business_id` ASC),
  CONSTRAINT `fk_agreement_business`
    FOREIGN KEY (`business_id`)
    REFERENCES `ibero`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 61
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`branch_promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`branch_promotions` (
  `id_branch` INT(11) NOT NULL,
  `id_promotion` INT(11) NOT NULL,
  `count` INT(11) NOT NULL,
  `encrypt` VARCHAR(150) NOT NULL,
  `active` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id_branch`, `id_promotion`),
  INDEX `promotion_branch_promotion` (`id_promotion` ASC),
  CONSTRAINT `branch_branch_promotion`
    FOREIGN KEY (`id_branch`)
    REFERENCES `ibero`.`branch` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `promotion_branch_promotion`
    FOREIGN KEY (`id_promotion`)
    REFERENCES `ibero`.`promotions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`business_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`business_type` (
  `id_business_type` INT(11) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id_business_type`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`categories` (
  `id_categories` INT(11) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `id_business_type` INT(11) NOT NULL,
  PRIMARY KEY (`id_categories`),
  INDEX `id_business_type_idx` (`id_business_type` ASC),
  CONSTRAINT `id_business_type`
    FOREIGN KEY (`id_business_type`)
    REFERENCES `ibero`.`business_type` (`id_business_type`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`student` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `photo` VARCHAR(150) NOT NULL,
  `mat` INT(10) NOT NULL,
  `career` VARCHAR(80) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `second_lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `mobile` VARCHAR(45) NOT NULL,
  `street_number` VARCHAR(45) NOT NULL,
  `town` VARCHAR(45) NOT NULL,
  `suburb` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `postal_code` VARCHAR(7) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `last_login` DATETIME NOT NULL,
  `employed` TINYINT(1) NOT NULL,
  `business_name` VARCHAR(150) NULL DEFAULT NULL,
  `business_type` VARCHAR(30) NULL DEFAULT NULL,
  `position` VARCHAR(45) NULL DEFAULT NULL,
  `position_level` VARCHAR(150) NULL DEFAULT NULL,
  `month_start` INT(11) NULL DEFAULT '0',
  `year_start` INT(11) NULL DEFAULT '0',
  `business_size` VARCHAR(45) NULL DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '0',
  `expired_at` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`devices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`devices` (
  `token` VARCHAR(200) NOT NULL,
  `id_student` INT(11) NOT NULL,
  PRIMARY KEY (`token`),
  INDEX `id_student_idx` (`id_student` ASC),
  CONSTRAINT `id_student`
    FOREIGN KEY (`id_student`)
    REFERENCES `ibero`.`student` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`state` (
  `id_state` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `short_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_state`))
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ibero`.`student_promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ibero`.`student_promotions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_student` INT(11) NOT NULL,
  `encrypt_promotion` VARCHAR(150) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = MyISAM
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = latin1;

ALTER TABLE `ibero`.`student` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
