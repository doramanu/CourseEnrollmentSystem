# Part E — Reflection

**What was the trickiest part of this assignment, and how did you approach it?**

The most challenging part of this assignment was implementing the enrollment logic while handling different edge cases. I needed to ensure duplicate enrollments were prevented, students were added to a waitlist when a course reached capacity, and the first student on the waitlist was automatically promoted when an enrolled student cancelled. I broke the problem into smaller functions, tested each scenario individually, and used unit tests to verify the behavior matched the required rules.

**If you had another week, what would you improve or add?**

With additional time, I would connect the React frontend to the C# backend through a real API and store enrollment data in an actual database instead of using mock frontend data. I would also add authentication, course search and filtering, and an administrative view for managing students and courses.

**Did you use any AI tools?**

Yes. I used Claude to scaffold the initial structure for each part — the SQL schema, the C# enrollment logic, and the React frontend — and to explain concepts I was less familiar with, like foreign key constraints and React state management. I reworked the generated code myself afterward, restructured parts of the logic, and tested edge cases individually so I could confidently explain the full implementation.