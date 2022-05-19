/* --- USERS TABLE --- */

CREATE TABLE `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(40) DEFAULT NULL,
  `user_lastname` varchar(40) DEFAULT NULL,
  `user_email` varchar(120) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4;


/* --- MESSAGES TABLE --- */

CREATE TABLE `messages` (
  `message_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `message_subject` varchar(120) NOT NULL,
  `message_content` text NOT NULL,
  `message_from` int(11) unsigned NOT NULL,
  `message_to` int(11) unsigned NOT NULL,
  `message_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `message_from` (`message_from`),
  KEY `message_to` (`message_to`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`message_from`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`message_to`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;


/* --- PROPERTIES TYPES TABLE --- */

CREATE TABLE `types` (
  `type_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  `type_slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;


/* --- PROPERTIES TABLE --- */

CREATE TABLE `properties` (
  `property_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `property_description` text,
  `property_size` float DEFAULT NULL,
  `property_adress` varchar(255) DEFAULT NULL,
  `property_city` varchar(255) DEFAULT NULL,
  `property_zipcode` varchar(10) DEFAULT NULL,
  `property_rooms` int(11) DEFAULT NULL,
  `property_price` int(11) DEFAULT NULL,
  `type_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;