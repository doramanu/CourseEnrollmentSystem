import { useState } from 'react';
import './App.css';

const initialCourses = [
  { id: 1, name: 'Data Structures', capacity: 3, instructor: 'Dr. Rao', enrolled: [1, 2, 3], waitlist: [] },
  { id: 2, name: 'Operating Systems', capacity: 2, instructor: 'Dr. Mehta', enrolled: [4, 5], waitlist: [] },
  { id: 3, name: 'Database Systems', capacity: 4, instructor: 'Dr. Iyer', enrolled: [1, 6, 2, 3], waitlist: [] },
  { id: 4, name: 'Web Development', capacity: 3, instructor: 'Dr. Shah', enrolled: [2, 7], waitlist: [] },
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

const studentName = (id) => students.find((s) => s.id === id)?.name ?? `Student ${id}`;

function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedStudent, setSelectedStudent] = useState(students[0].id);
  const [selectedCourse, setSelectedCourse] = useState(initialCourses[0].id);
  const [message, setMessage] = useState({ text: '', type: '' });

  function handleEnroll(e) {
    e.preventDefault();
    const studentId = Number(selectedStudent);
    const courseId = Number(selectedCourse);

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;

        if (course.enrolled.includes(studentId)) {
          setMessage({ text: `${studentName(studentId)} is already enrolled in ${course.name}.`, type: 'error' });
          return course;
        }
        if (course.waitlist.includes(studentId)) {
          setMessage({ text: `${studentName(studentId)} is already on the waitlist for ${course.name}.`, type: 'error' });
          return course;
        }
        if (course.enrolled.length >= course.capacity) {
          setMessage({ text: `Course full — ${studentName(studentId)} added to the waitlist for ${course.name}.`, type: 'warning' });
          return { ...course, waitlist: [...course.waitlist, studentId] };
        }
        setMessage({ text: `${studentName(studentId)} enrolled successfully in ${course.name}.`, type: 'success' });
        return { ...course, enrolled: [...course.enrolled, studentId] };
      })
    );
  }

  function handleCancel(courseId, studentId) {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;

        const stillEnrolled = course.enrolled.filter((id) => id !== studentId);

        // Promote first waitlisted student, if any
        if (course.waitlist.length > 0) {
          const [promotedId, ...restWaitlist] = course.waitlist;
          setMessage({
            text: `${studentName(studentId)} cancelled in ${course.name}. ${studentName(promotedId)} promoted from waitlist.`,
            type: 'success',
          });
          return { ...course, enrolled: [...stillEnrolled, promotedId], waitlist: restWaitlist };
        }

        setMessage({ text: `${studentName(studentId)} cancelled enrollment in ${course.name}.`, type: 'warning' });
        return { ...course, enrolled: stillEnrolled };
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
            <th>Enrolled</th>
            <th>Waitlist</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const isFull = course.enrolled.length >= course.capacity;
            const badgeClass = isFull ? 'status-badge status-full' : 'status-badge status-open';
            const badgeText = isFull ? 'FULL' : 'OPEN';
            return (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.instructor}</td>
                <td>
                  <div className="seat-line">
                    {course.enrolled.length} / {course.capacity}{' '}
                    <span className={badgeClass}>{badgeText}</span>
                  </div>
                  <div className="chip-list">
                    {course.enrolled.map((id) => (
                      <span key={id} className="chip">
                        {studentName(id)}
                        <button
                          type="button"
                          className="chip-cancel"
                          title="Cancel enrollment"
                          onClick={() => handleCancel(course.id, id)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  {course.waitlist.length === 0 ? (
                    <span className="muted">—</span>
                  ) : (
                    <div className="chip-list">
                      {course.waitlist.map((id, idx) => (
                        <span key={id} className="chip chip-waitlist">
                          {idx + 1}. {studentName(id)}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
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

      {message.text && <p className={`message message-${message.type}`}>{message.text}</p>}
    </div>
  );
}

export default App;