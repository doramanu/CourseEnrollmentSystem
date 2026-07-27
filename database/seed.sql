-- Courses (small capacities on purpose, so we can demo "full" and "waitlist" scenarios)
INSERT INTO Courses (name, capacity, instructor_name) VALUES
('Data Structures', 3, 'Dr. Rao'),
('Operating Systems', 2, 'Dr. Mehta'),
('Database Systems', 4, 'Dr. Iyer'),
('Web Development', 3, 'Dr. Shah');

-- Students (8 total; one — Student 8 — will be left with zero enrollments on purpose)
INSERT INTO Students (name, email, year_of_study) VALUES
('Aarav Sharma', 'aarav@example.com', 2),
('Priya Nair', 'priya@example.com', 3),
('Rohan Verma', 'rohan@example.com', 1),
('Sneha Joshi', 'sneha@example.com', 4),
('Karan Malhotra', 'karan@example.com', 2),
('Isha Kapoor', 'isha@example.com', 3),
('Vikram Singh', 'vikram@example.com', 1),
('Anjali Desai', 'anjali@example.com', 2);

-- Enrollments (15 rows)
-- Course 1 "Data Structures" capacity 3 -> fill it exactly (students 1,2,3) = FULL
INSERT INTO Enrollments (student_id, course_id, status) VALUES
(1, 1, 'enrolled'),
(2, 1, 'enrolled'),
(3, 1, 'enrolled');

-- Course 2 "Operating Systems" capacity 2 -> fill it exactly (students 4,5) = FULL
INSERT INTO Enrollments (student_id, course_id, status) VALUES
(4, 2, 'enrolled'),
(5, 2, 'enrolled');

-- Course 3 "Database Systems" capacity 4 -> only 2 enrolled, 2 empty seats
INSERT INTO Enrollments (student_id, course_id, status) VALUES
(1, 3, 'enrolled'),
(6, 3, 'enrolled');

-- Course 4 "Web Development" capacity 3 -> 2 enrolled, 1 empty seat
INSERT INTO Enrollments (student_id, course_id, status) VALUES
(2, 4, 'enrolled'),
(7, 4, 'enrolled');

-- A few more enrollments so some students are in 3+ courses
INSERT INTO Enrollments (student_id, course_id, status) VALUES
(1, 4, 'enrolled'),   -- Aarav now in 3 courses (1,3,4)
(2, 3, 'enrolled'),   -- Priya now in 3 courses (1,4,3)
(3, 3, 'enrolled'),   -- Rohan now in 2 courses
(4, 3, 'waitlisted'),   -- Karan now in 2 courses
(5, 4, 'waitlisted'),   -- ... wait, check capacity below
(6, 1, 'waitlisted'); -- Course 1 is full, so this is a waitlisted example row