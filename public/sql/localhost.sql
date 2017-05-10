-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 13-02-2017 a las 20:17:08
-- Versión del servidor: 5.5.54
-- Versión de PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `cl45-lconder`
--

-- --------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `iqbccomm_ibero` DEFAULT CHARACTER SET utf8 ;
USE `iqbccomm_ibero` ;

--
-- Estructura de tabla para la tabla `attendant`
--

CREATE TABLE IF NOT EXISTS `attendant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `second_lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `attendant`
--

INSERT INTO `attendant` (`id`, `name`, `lastname`, `second_lastname`, `email`, `phone`, `address`) VALUES
(1, 'luis', 'conde', 'rdz', 'conderodriguez.luis@outlook.com', '2221032565', '141 Pte #1316'),
(2, 'ddqwdwq', 'qwdqwdqw', 'dqwdqwdqw', 'zhemo17@gmail.com', '2225816200', 'dqwdqwd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `branch`
--

CREATE TABLE IF NOT EXISTS `branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `address` varchar(100) NOT NULL,
  `business_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`business_id`),
  KEY `fk_branch_business1_idx` (`business_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `branch`
--

INSERT INTO `branch` (`id`, `name`, `latitude`, `longitude`, `address`, `business_id`) VALUES
(1, 'test', 19.0448, -98.2012, '3 sur 316 Centro 72000', 1),
(3, 'Otro test', 19.0023, -98.2022, 'Avenida San Claudio S/N BUAP Edificio Rectoría dentro de CU, Col. San Manuel, Cd Universitaria, Cdad', 1),
(4, 'prueba', 19.0044, -98.1942, 'Circunvalación (esquina con Rio Papagayo), San Manuel, Jardines de San Manuel, 72570 Puebla, PUE', 1),
(5, 'Testweb', 19.0541, -98.2904, 'Calle 8 Nte 1207, Rincón de Sta Catarina, 72810 San Andrés Cholula, Pue., Mexico', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `business`
--

CREATE TABLE IF NOT EXISTS `business` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `rfc` varchar(15) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `graduated` tinyint(1) NOT NULL,
  `discount_description` varchar(150) NOT NULL,
  `size` varchar(45) NOT NULL,
  `business_type` varchar(15) NOT NULL,
  `logo` varchar(150) NOT NULL,
  `act` varchar(45) NOT NULL,
  `credential` varchar(45) NOT NULL,
  `voucher` varchar(45) NOT NULL,
  `street` varchar(100) NOT NULL,
  `external_number` varchar(10) NOT NULL,
  `internal_number` varchar(10) DEFAULT NULL,
  `postal_code` varchar(9) NOT NULL,
  `suburb` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `attendant_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`user_id`,`attendant_id`),
  KEY `fk_business_attendant1_idx` (`attendant_id`),
  KEY `fk_business_user1_idx` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `business`
--

INSERT INTO `business` (`id`, `name`, `rfc`, `phone`, `facebook`, `twitter`, `website`, `graduated`, `discount_description`, `size`, `business_type`, `logo`, `act`, `credential`, `voucher`, `street`, `external_number`, `internal_number`, `postal_code`, `suburb`, `city`, `state`, `active`, `user_id`, `attendant_id`) VALUES
(1, 'FSE', 'FSE123', '2221032565', 'face', 'twitter', 'www', 1, 'XD', 'Pequeña', 'Agropecuarias', 'http://res.cloudinary.com/lconder/image/upload/v1480320818/italian_w7kxe6.jpg', '', '', '', '3 Poniente', '313', '', '72000', 'Centro', 'Puebla', 21, 0, 1, 1),
(2, 'ewfewfef', 'obrnomsfioef', '2225816200', 'few', 'fwe', 'fewffew', 1, 'ejfuwefhewoifiewfiewifiewbifbewfewfewfewfewf', 'Microempresa', 'Mineras', '', '', '', '', 'dweewdf', 'ewfe', 'wefew', 'ewfewf', 'ewfewf', 'fwfewf', 21, 0, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credential`
--

CREATE TABLE IF NOT EXISTS `credential` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(45) NOT NULL,
  `career` varchar(45) NOT NULL,
  `expired_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promotions`
--

CREATE TABLE IF NOT EXISTS `promotions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `count` int(45) NOT NULL,
  `expired_at` datetime DEFAULT NULL,
  `encrypt` varchar(100) NOT NULL,
  `business_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`business_id`),
  UNIQUE KEY `encypt` (`encrypt`),
  KEY `fk_agreement_business_idx` (`business_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Volcado de datos para la tabla `promotions`
--

INSERT INTO `promotions` (`id`, `name`, `description`, `created_at`, `count`, `expired_at`, `encrypt`, `business_id`) VALUES
(13, 'other', 'other', '2017-02-06 14:57:25.038', 108, '2017-06-02 00:00:00', 'df2b71f6eb25b9768ff32a8105911d193a350eb8', 1),
(14, '2x1 en xcosa', 'esta es una prueba ', '2017-02-07 20:48:16.834', 3, '2018-01-01 00:00:00', 'a75a93ac79efb9e5cedc50c598270b33b7e01f2a', 1),
(15, 'obeipormgvober', 'feiwugferiwngfionwifneivjiewvewrvewrvew', '2017-02-08 00:27:29.676', 0, NULL, '40274693b36a385b4798bc53d4928f9715dfa97a', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `state`
--

CREATE TABLE IF NOT EXISTS `state` (
  `id_state` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_state`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

--
-- Volcado de datos para la tabla `state`
--

INSERT INTO `state` (`id_state`, `name`, `short_name`) VALUES
(1, 'Aguascalientes', 'Ags'),
(2, 'Baja California', 'BC'),
(3, 'Baja California Sur', 'BCS'),
(4, 'Campeche', 'Camp'),
(5, 'Chiapas', 'Chis'),
(6, 'Chihuahua', 'Chih'),
(7, 'Coahuila', 'Cah'),
(8, 'Colima', 'Col'),
(9, 'Ciudad de México', 'CDMX'),
(10, 'Durango', 'Dgo'),
(11, 'Guanajuato', 'Gto'),
(12, 'Guerrero', 'Gro'),
(13, 'Hidalgo', 'Hgo'),
(14, 'Jalisco', 'Jal'),
(15, 'México', 'Mex'),
(16, 'Michoacan', 'Mich'),
(17, 'Morelos', 'Mor'),
(18, 'Nayarit', 'Nay'),
(19, 'Nuevo Leon', 'NL'),
(20, 'Oaxaca', 'Oax'),
(21, 'Puebla', 'Pue'),
(22, 'Queretaro', 'Qro'),
(23, 'Quintana Roo', 'QR'),
(24, 'San Luis Potosi', 'SLP'),
(25, 'Sinaloa', 'Sin'),
(26, 'Sonora', 'Son'),
(27, 'Tabasco', 'Tab'),
(28, 'Tamaulipas', 'Tamps'),
(29, 'Tlaxcala', 'Tlax'),
(30, 'Veracruz', 'Ver'),
(31, 'Yucatan', 'Yuc'),
(32, 'Zacatecas', 'Zac');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `second_lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `mobile` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `number` varchar(45) NOT NULL,
  `town` varchar(45) NOT NULL,
  `suburb` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `postal_code` varchar(7) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `employed` tinyint(1) NOT NULL,
  `business_type` varchar(30) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `month_start` int(11) DEFAULT NULL,
  `year_start` int(11) DEFAULT NULL,
  `business_size` varchar(45) DEFAULT NULL,
  `credential_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`credential_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_student_credential1_idx` (`credential_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_promotion`
--

CREATE TABLE IF NOT EXISTS `student_promotion` (
  `promotions_id` int(11) NOT NULL,
  `promotions_business_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `student_credential_id` int(11) NOT NULL,
  PRIMARY KEY (`promotions_id`,`promotions_business_id`,`student_id`,`student_credential_id`),
  KEY `fk_student_promotion_student1_idx` (`student_id`,`student_credential_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `user`, `password`, `nickname`) VALUES
(1, 'admin', 'admin', '');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `fk_branch_business1` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `business`
--
ALTER TABLE `business`
  ADD CONSTRAINT `fk_business_attendant1` FOREIGN KEY (`attendant_id`) REFERENCES `attendant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_business_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `fk_agreement_business` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `fk_student_credential1` FOREIGN KEY (`credential_id`) REFERENCES `credential` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `student_promotion`
--
ALTER TABLE `student_promotion`
  ADD CONSTRAINT `fk_student_promotion_promotions1` FOREIGN KEY (`promotions_id`, `promotions_business_id`) REFERENCES `promotions` (`id`, `business_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_student_promotion_student1` FOREIGN KEY (`student_id`, `student_credential_id`) REFERENCES `student` (`id`, `credential_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
