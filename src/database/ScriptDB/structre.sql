-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema disney_alkemy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema disney_alkemy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `disney_alkemy` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `disney_alkemy` ;

-- -----------------------------------------------------
-- Table `disney_alkemy`.`characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_alkemy`.`characters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) NULL,
  `name` VARCHAR(45) NULL,
  `age` INT NULL,
  `weight` INT NULL,
  `history` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disney_alkemy`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_alkemy`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `image` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disney_alkemy`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_alkemy`.`movies` (
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
    REFERENCES `disney_alkemy`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disney_alkemy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_alkemy`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disney_alkemy`.`characters_movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_alkemy`.`characters_movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_character` INT NOT NULL,
  `id_movie` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_character_idx` (`id_character` ASC) ,
  INDEX `id_movie_idx` (`id_movie` ASC) ,
  CONSTRAINT `id_character`
    FOREIGN KEY (`id_character`)
    REFERENCES `disney_alkemy`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_movie`
    FOREIGN KEY (`id_movie`)
    REFERENCES `disney_alkemy`.`movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
