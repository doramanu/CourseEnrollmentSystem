using EnrollmentSystem.Core;
using Xunit;

namespace EnrollmentSystem.Tests;

public class EnrollmentManagerTests
{
    private EnrollmentManager CreateManagerWithSampleData()
    {
        var manager = new EnrollmentManager();
        manager.AddStudent(new Student { Id = 1, Name = "Aarav", Email = "a@x.com", YearOfStudy = 1 });
        manager.AddStudent(new Student { Id = 2, Name = "Priya", Email = "p@x.com", YearOfStudy = 1 });
        manager.AddStudent(new Student { Id = 3, Name = "Rohan", Email = "r@x.com", YearOfStudy = 1 });
        manager.AddCourse(new Course { Id = 1, Name = "Data Structures", Capacity = 2, InstructorName = "Dr. Rao" });
        return manager;
    }

    [Fact]
    public void EnrollStudent_Succeeds_WhenSeatsAvailable()
    {
        var manager = CreateManagerWithSampleData();
        var result = manager.EnrollStudent(1, 1);
        Assert.Contains("enrolled in course", result);
    }

    [Fact]
    public void EnrollStudent_Waitlists_WhenCourseFull()
    {
        var manager = CreateManagerWithSampleData();
        manager.EnrollStudent(1, 1);
        manager.EnrollStudent(2, 1); // course now full (capacity 2)

        var result = manager.EnrollStudent(3, 1);

        Assert.Contains("waitlist", result);
    }

    [Fact]
    public void EnrollStudent_ReturnsMessage_WhenAlreadyEnrolled()
    {
        var manager = CreateManagerWithSampleData();
        manager.EnrollStudent(1, 1);

        var result = manager.EnrollStudent(1, 1);

        Assert.Contains("already enrolled", result);
    }

    [Fact]
    public void CancelEnrollment_PromotesFirstWaitlistedStudent()
    {
        var manager = CreateManagerWithSampleData();
        manager.EnrollStudent(1, 1);
        manager.EnrollStudent(2, 1);
        manager.EnrollStudent(3, 1); // student 3 waitlisted

        var result = manager.CancelEnrollment(1, 1);

        Assert.Contains("Student 3 promoted", result);
    }

    [Fact]
    public void CancelEnrollment_ReturnsMessage_WhenNotEnrolled()
    {
        var manager = CreateManagerWithSampleData();

        var result = manager.CancelEnrollment(1, 1);

        Assert.Contains("was not enrolled", result);
    }
}