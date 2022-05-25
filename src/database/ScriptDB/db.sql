-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema disneyAlkemy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema disneyAlkemy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `disneyAlkemy` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `disneyAlkemy` ;

-- -----------------------------------------------------
-- Table `disneyAlkemy`.`characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disneyAlkemy`.`characters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) NULL,
  `name` VARCHAR(45) NULL,
  `age` INT NULL,
  `weight` INT NULL,
  `history` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disneyAlkemy`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disneyAlkemy`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `image` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disneyAlkemy`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disneyAlkemy`.`movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) NULL,
  `title` VARCHAR(45) NULL,
  `date` DATE NULL,
  `rating` INT NULL,
  `id_genre` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_genre_idx` (`id_genre` ASC) ,
  CONSTRAINT `id_genre`
    FOREIGN KEY (`id_genre`)
    REFERENCES `disneyAlkemy`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disneyAlkemy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disneyAlkemy`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disneyAlkemy`.`charracters_movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disneyAlkemy`.`characters_movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_character` INT NOT NULL,
  `id_movie` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_charecter_idx` (`id_character` ASC) ,
  INDEX `id_movie_idx` (`id_movie` ASC) ,
  CONSTRAINT `id_charecter`
    FOREIGN KEY (`id_character`)
    REFERENCES `disneyAlkemy`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_movie`
    FOREIGN KEY (`id_movie`)
    REFERENCES `disneyAlkemy`.`movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
