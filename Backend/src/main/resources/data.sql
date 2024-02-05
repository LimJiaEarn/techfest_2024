-- Insert some initial user data
INSERT INTO Users (name, username, password)
VALUES ('alex', 'user1', 'password'),
       ('jiaearn', 'user2', 'password'),
       ('huiyao', 'user3', 'password'),
       ('joel', 'user4', 'password');

-- -- Insert a dummy resume
-- INSERT INTO Resume (name, email, phoneNumber, linkedinProfile, professionalSummary)
-- VALUES ('John Doe', 'john.doe@example.com', '1234567890', 'https://linkedin.com/in/johndoe',
--         'Experienced software developer...');
-- -- Assuming the above resume gets an ID of 1, insert related education and work experiences
-- INSERT INTO Education (resumeId, detail)
-- VALUES (1, 'BSc in Computer Science from XYZ University');
-- INSERT INTO WorkExperience (resumeId, detail)
-- VALUES (1, 'Software Developer at ABC Corp from 2015 to 2020'),
--        (1, 'Software Developer at DEF Corp from 2020 to present');
