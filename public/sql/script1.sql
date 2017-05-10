-- MySQL Script generated by MySQL Workbench
-- Thu Feb  2 16:33:20 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema cl45-lconder
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cl45-lconder
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cl45-lconder` DEFAULT CHARACTER SET utf8 ;
USE `cl45-lconder` ;

-- -----------------------------------------------------
-- Table `cl45-lconder`.`attendant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`attendant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `second_lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`user` (
  `id` INT NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`business`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`business` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `rfc` VARCHAR(15) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `facebook` VARCHAR(100) NULL,
  `twitter` VARCHAR(100) NULL,
  `website` VARCHAR(100) NULL,
  `graduated` TINYINT(1) NOT NULL,
  `discount_description` VARCHAR(150) NOT NULL,
  `size` VARCHAR(45) NOT NULL,
  `business_type` VARCHAR(15) NOT NULL,
  `logo` VARCHAR(15) NOT NULL,
  `act` VARCHAR(45) NOT NULL,
  `credential` VARCHAR(45) NOT NULL,
  `voucher` VARCHAR(45) NOT NULL,
  `street` VARCHAR(100) NOT NULL,
  `external_number` VARCHAR(10) NOT NULL,
  `internal_number` VARCHAR(10) NULL,
  `postal_code` VARCHAR(9) NOT NULL,
  `suburb` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` INT NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  `attendant_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `attendant_id`),
  INDEX `fk_business_attendant1_idx` (`attendant_id` ASC),
  INDEX `fk_business_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_business_attendant1`
    FOREIGN KEY (`attendant_id`)
    REFERENCES `cl45-lconder`.`attendant` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_business_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `cl45-lconder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`promotions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `cerated_at` VARCHAR(45) NOT NULL,
  `count` VARCHAR(45) NOT NULL,
  `expired_at` DATETIME NULL,
  `business_id` INT NOT NULL,
  PRIMARY KEY (`id`, `business_id`),
  INDEX `fk_agreement_business_idx` (`business_id` ASC),
  CONSTRAINT `fk_agreement_business`
    FOREIGN KEY (`business_id`)
    REFERENCES `cl45-lconder`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`branch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `business_id` INT NOT NULL,
  PRIMARY KEY (`id`, `business_id`),
  INDEX `fk_branch_business1_idx` (`business_id` ASC),
  CONSTRAINT `fk_branch_business1`
    FOREIGN KEY (`business_id`)
    REFERENCES `cl45-lconder`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`credential`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`credential` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `photo` VARCHAR(45) NOT NULL,
  `career` VARCHAR(45) NOT NULL,
  `expired_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`student` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `second_lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `mobile` VARCHAR(45) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `number` VARCHAR(45) NOT NULL,
  `town` VARCHAR(45) NOT NULL,
  `suburb` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `postal_code` VARCHAR(7) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `last_login` DATETIME NOT NULL,
  `employed` TINYINT(1) NOT NULL,
  `business_type` VARCHAR(30) NULL,
  `position` VARCHAR(45) NULL,
  `month_start` INT NULL,
  `year_start` INT NULL,
  `business_size` VARCHAR(45) NULL,
  `credential_id` INT NOT NULL,
  PRIMARY KEY (`id`, `credential_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_student_credential1_idx` (`credential_id` ASC),
  CONSTRAINT `fk_student_credential1`
    FOREIGN KEY (`credential_id`)
    REFERENCES `cl45-lconder`.`credential` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`state` (
  `id_state` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `short_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_state`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cl45-lconder`.`student_promotion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cl45-lconder`.`student_promotion` (
  `promotions_id` INT NOT NULL,
  `promotions_business_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `student_credential_id` INT NOT NULL,
  PRIMARY KEY (`promotions_id`, `promotions_business_id`, `student_id`, `student_credential_id`),
  INDEX `fk_student_promotion_student1_idx` (`student_id` ASC, `student_credential_id` ASC),
  CONSTRAINT `fk_student_promotion_promotions1`
    FOREIGN KEY (`promotions_id` , `promotions_business_id`)
    REFERENCES `cl45-lconder`.`promotions` (`id` , `business_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_promotion_student1`
    FOREIGN KEY (`student_id` , `student_credential_id`)
    REFERENCES `cl45-lconder`.`student` (`id` , `credential_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
