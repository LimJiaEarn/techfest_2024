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
    professionalSummary TEXT
);

CREATE TABLE Education
(
    id INT AUTO_INCREMENT(1) PRIMARY KEY,
    resumeId INT,
    detail TEXT,
    FOREIGN KEY (resumeId) REFERENCES Resume(id)
);

CREATE TABLE WorkExperience
(
    id INT AUTO_INCREMENT(1) PRIMARY KEY,
    resumeId INT,
    detail TEXT,
    FOREIGN KEY (resumeId) REFERENCES Resume(id)
);