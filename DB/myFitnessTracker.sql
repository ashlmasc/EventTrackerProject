-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema personalfitnesstrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `personalfitnesstrackerdb` ;

-- -----------------------------------------------------
-- Schema personalfitnesstrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `personalfitnesstrackerdb` ;
USE `personalfitnesstrackerdb` ;

-- -----------------------------------------------------
-- Table `workout`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workout` ;

CREATE TABLE IF NOT EXISTS `workout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `duration` INT NOT NULL,
  `heart_rate_avg` INT NULL,
  `is_fasted` TINYINT NULL,
  `pre_workout_meal` TINYINT NULL,
  `caffeine_consumed` TINYINT NULL,
  `notes` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS ashlmasc@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'ashlmasc'@'localhost' IDENTIFIED BY 'password';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'ashlmasc'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'ashlmasc'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `workout`
-- -----------------------------------------------------
START TRANSACTION;
USE `personalfitnesstrackerdb`;
INSERT INTO `workout` (`id`, `date`, `type`, `duration`, `heart_rate_avg`, `is_fasted`, `pre_workout_meal`, `caffeine_consumed`, `notes`) VALUES (1, '2024-01-03', 'HIIT', 1111, 143, 1, 0, 1, NULL);
INSERT INTO `workout` (`id`, `date`, `type`, `duration`, `heart_rate_avg`, `is_fasted`, `pre_workout_meal`, `caffeine_consumed`, `notes`) VALUES (DEFAULT, '2024-01-03', 'Yoga', 1076, 124, 1, 0, 1, 'T-Tapp');
INSERT INTO `workout` (`id`, `date`, `type`, `duration`, `heart_rate_avg`, `is_fasted`, `pre_workout_meal`, `caffeine_consumed`, `notes`) VALUES (DEFAULT, '2024-01-02', 'Yoga', 1093, 109, 1, 0, 1, 'T-Tapp');

COMMIT;

