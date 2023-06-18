DROP procedure IF EXISTS `registerAlumno`;
DELIMITER // 
CREATE PROCEDURE registerAlumno (IN name_a VARCHAR(200), IN email VARCHAR(200), IN password_a VARCHAR(200), IN campus int, OUT cuenta_value int)
BEGIN

DECLARE cuenta_ int; -- Declare a variable to hold the cuenta value

SELECT CONCAT(campus, RIGHT(YEAR(CURRENT_DATE()), 2), LPAD(count(*) + 1, 5, '0'))
INTO cuenta_
FROM Alumno;

INSERT INTO `registro`.`alumno`
(
`cuenta`,
`name`,
`email`,
`password`,
`campus`)
VALUES
(cuenta_, name_a, email, password_a, campus);

 SET cuenta_value = cuenta_;

END //
DELIMITER ;  

-- call registerAlumno("Dessire Ochoa Lopez", "dessireochoa12@gmail.com", "nomoreplease", 1, @cuenta_);
-- 12300001