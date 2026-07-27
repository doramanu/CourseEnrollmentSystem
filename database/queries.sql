-- 1. Courses at full capacity
SELECT c.id, c.name, c.capacity, COUNT(e.id) AS enrolled_count
FROM Courses c
JOIN Enrollments e ON e.course_id = c.id AND e.status = 'enrolled'
GROUP BY c.id, c.name, c.capacity
HAVING COUNT(e.id) = c.capacity;

-- 2. Students enrolled in more than 2 courses
SELECT s.id, s.name, COUNT(e.id) AS course_count
FROM Students s
JOIN Enrollments e ON e.student_id = s.id AND e.status = 'enrolled'
GROUP BY s.id, s.name
HAVING COUNT(e.id) > 2;

-- 3. For each course: enrolled count and empty seats remaining
SELECT c.id, c.name, c.capacity,
       COUNT(e.id) AS enrolled_count,
       c.capacity - COUNT(e.id) AS empty_seats
FROM Courses c
LEFT JOIN Enrollments e ON e.course_id = c.id AND e.status = 'enrolled'
GROUP BY c.id, c.name, c.capacity;

-- 4. Students not enrolled in any course
SELECT s.id, s.name
FROM Students s
LEFT JOIN Enrollments e ON e.student_id = s.id
WHERE e.id IS NULL;