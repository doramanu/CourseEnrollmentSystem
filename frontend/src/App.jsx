import { useState } from 'react';
import './App.css';

// Mock data - mirrors our Part A seed data structure
const initialCourses = [
  { id: 1, name: 'Data Structures', capacity: 3, instructor: 'Dr. Rao', enrolled: [1, 2, 3], waitlist: [] },
  { id: 2, name: 'Operating Systems', capacity: 2, instructor: 'Dr. Mehta', enrolled: [4, 5], waitlist: [] },
  { id: 3, name: 'Database Systems', capacity: 4, instructor: 'Dr. Iyer', enrolled: [1, 6, 2, 3], waitlist: [] },
  { id: 4, name: 'Web Development', capacity: 3, instructor: 'Dr. Shah', enrolled: [2, 7, 1], waitlist: [] },
];

const students = [
  { id: 1, name: 'Aarav Sharma' },
  { id: 2, name: 'Priya Nair' },
  { id: 3, name: 'Rohan Verma' },
  { id: 4, name: 'Sneha Joshi' },
  { id: 5, name: 'Karan Malhotra' },
  { id: 6, name: 'Isha Kapoor' },
  { id: 7, name: 'Vikram Singh' },
  { id: 8, name: 'Anjali Desai' },
];

function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedStudent, setSelectedStudent] = useState(students[0].id);
  const [selectedCourse, setSelectedCourse] = useState(initialCourses[0].id);
  const [message, setMessage] = useState('');

  function handleEnroll(e) {
    e.preventDefault();
    const studentId = Number(selectedStudent);
    const courseId = Number(selectedCourse);

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;

        // Already enrolled check
        if (course.enrolled.includes(studentId)) {
          setMessage(`Student is already enrolled in ${course.name}.`);
          return course;
        }
        // Already waitlisted check
        if (course.waitlist.includes(studentId)) {
          setMessage(`Student is already on the waitlist for ${course.name}.`);
          return course;
        }
        // Full capacity -> waitlist
        if (course.enrolled.length >= course.capacity) {
          setMessage(`Course full — added to waitlist for ${course.name}.`);
          return { ...course, waitlist: [...course.waitlist, studentId] };
        }
        // Normal enrollment
        setMessage(`Enrolled successfully in ${course.name}.`);
        return { ...course, enrolled: [...course.enrolled, studentId] };
      })
    );
  }

  return (
    <div className="container">
      <h1>Course Enrollment System</h1>

      <table className="courses-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Instructor</th>
            <th>Capacity</th>
            <th>Enrolled</th>
            <th>Waitlist</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{course.capacity}</td>
              <td>{course.enrolled.length}</td>
              <td>{course.waitlist.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleEnroll} className="enroll-form">
        <h2>Enroll a Student</h2>

        <label>
          Student:
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>

        <label>
          Course:
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <button type="submit">Enroll</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;