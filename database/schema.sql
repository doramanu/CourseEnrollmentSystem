-- Enrollments (15 rows total)
INSERT INTO Enrollments (student_id, course_id, status) VALUES
(1, 1, 'enrolled'),
(2, 1, 'enrolled'),
(3, 1, 'enrolled');

INSERT INTO Enrollments (student_id, course_id, status) VALUES
(4, 2, 'enrolled'),
(5, 2, 'enrolled');

INSERT INTO Enrollments (student_id, course_id, status) VALUES
(1, 3, 'enrolled'),
(6, 3, 'enrolled');

INSERT INTO Enrollments (student_id, course_id, status) VALUES
(2, 4, 'enrolled'),
(7, 4, 'enrolled');

INSERT INTO Enrollments (student_id, course_id, status) VALUES
(1, 4, 'enrolled'),
(2, 3, 'enrolled'),
(3, 3, 'enrolled'),
(4, 3, 'enrolled'),
(5, 4, 'waitlisted'),
(6, 1, 'waitlisted');