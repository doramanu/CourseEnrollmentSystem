namespace EnrollmentSystem.Core;

public class EnrollmentManager
{
    private readonly Dictionary<int, Student> _students = new();
    private readonly Dictionary<int, Course> _courses = new();

    public void AddStudent(Student student) => _students[student.Id] = student;
    public void AddCourse(Course course) => _courses[course.Id] = course;

    public string EnrollStudent(int studentId, int courseId)
    {
        if (!_students.ContainsKey(studentId))
            return $"Error: Student {studentId} does not exist.";

        if (!_courses.TryGetValue(courseId, out var course))
            return $"Error: Course {courseId} does not exist.";

        // Rule: can't enroll in the same course twice
        if (course.EnrolledStudentIds.Contains(studentId))
        {
            string msg = $"Student {studentId} is already enrolled in course {courseId}.";
            Console.WriteLine(msg);
            return msg;
        }

        if (course.WaitlistedStudentIds.Contains(studentId))
        {
            string msg = $"Student {studentId} is already on the waitlist for course {courseId}.";
            Console.WriteLine(msg);
            return msg;
        }

        // Rule: full capacity -> waitlist instead
        if (course.EnrolledStudentIds.Count >= course.Capacity)
        {
            course.WaitlistedStudentIds.Add(studentId);
            string msg = $"Course {courseId} is full. Student {studentId} added to the waitlist.";
            Console.WriteLine(msg);
            return msg;
        }

        // Otherwise, enroll normally
        course.EnrolledStudentIds.Add(studentId);
        string enrolledMsg = $"Student {studentId} enrolled in course {courseId}.";
        Console.WriteLine(enrolledMsg);
        return enrolledMsg;
    }

    public string CancelEnrollment(int studentId, int courseId)
    {
        if (!_courses.TryGetValue(courseId, out var course))
            return $"Error: Course {courseId} does not exist.";

        if (!course.EnrolledStudentIds.Contains(studentId))
        {
            string msg = $"Student {studentId} was not enrolled in course {courseId}.";
            Console.WriteLine(msg);
            return msg;
        }

        course.EnrolledStudentIds.Remove(studentId);
        string cancelMsg = $"Student {studentId} cancelled enrollment in course {courseId}.";
        Console.WriteLine(cancelMsg);

        // Rule: promote first person on waitlist, if any
        if (course.WaitlistedStudentIds.Count > 0)
        {
            int promotedStudentId = course.WaitlistedStudentIds[0];
            course.WaitlistedStudentIds.RemoveAt(0);
            course.EnrolledStudentIds.Add(promotedStudentId);

            string promoteMsg = $"Student {promotedStudentId} promoted from waitlist to enrolled in course {courseId}.";
            Console.WriteLine(promoteMsg);
            return $"{cancelMsg} {promoteMsg}";
        }

        return cancelMsg;
    }
}