DROP TABLE IF EXISTS WorkExperience;
DROP TABLE IF EXISTS Education;
DROP TABLE IF EXISTS Resume;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    id       INT          AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Resume
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phoneNumber VARCHAR(255),
    linkedinProfile VARCHAR(255),
    education VARCHAR(255),
    workExperiences VARCHAR(255),
    skills VARCHAR(255)
);
