CREATE SCHEMA `eduq` ;

CREATE TABLE `eduq`.`auth_professor` (
  `id` INT NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `eduq`.`auth_professor` (`user`, `pass`) VALUES ('eduq', 'eduq');

