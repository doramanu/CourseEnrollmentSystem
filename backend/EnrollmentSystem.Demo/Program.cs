using EnrollmentSystem.Core;

var manager = new EnrollmentManager();

// Set up sample data matching our Part A seed data
manager.AddStudent(new Student { Id = 1, Name = "Aarav Sharma", Email = "aarav@example.com", YearOfStudy = 2 });
manager.AddStudent(new Student { Id = 2, Name = "Priya Nair", Email = "priya@example.com", YearOfStudy = 3 });
manager.AddStudent(new Student { Id = 3, Name = "Rohan Verma", Email = "rohan@example.com", YearOfStudy = 1 });

manager.AddCourse(new Course { Id = 1, Name = "Data Structures", Capacity = 2, InstructorName = "Dr. Rao" });

Console.WriteLine("--- Demo: Core Enrollment Logic ---\n");

Console.WriteLine("1) Enroll student 1 in course 1 (should succeed):");
manager.EnrollStudent(1, 1);

Console.WriteLine("\n2) Enroll student 2 in course 1 (should succeed, course now full):");
manager.EnrollStudent(2, 1);

Console.WriteLine("\n3) Enroll student 3 in course 1 (course full -> should waitlist):");
manager.EnrollStudent(3, 1);

Console.WriteLine("\n4) Enroll student 1 in course 1 again (should say already enrolled):");
manager.EnrollStudent(1, 1);

Console.WriteLine("\n5) Cancel student 1's enrollment (should promote student 3 from waitlist):");
manager.CancelEnrollment(1, 1);

Console.WriteLine("\n--- Demo complete ---");