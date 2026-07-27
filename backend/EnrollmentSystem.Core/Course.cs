namespace EnrollmentSystem.Core;

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public string InstructorName { get; set; } = string.Empty;

    // Track enrolled student IDs and waitlisted student IDs in memory
    public List<int> EnrolledStudentIds { get; set; } = new();
    public List<int> WaitlistedStudentIds { get; set; } = new();
}