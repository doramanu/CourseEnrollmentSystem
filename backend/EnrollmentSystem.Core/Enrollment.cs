namespace EnrollmentSystem.Core;

public enum EnrollmentStatus
{
    Enrolled,
    Waitlisted,
    Cancelled
}

public class Enrollment
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }
    public DateTime EnrollmentDate { get; set; } = DateTime.Now;
    public EnrollmentStatus Status { get; set; }
}