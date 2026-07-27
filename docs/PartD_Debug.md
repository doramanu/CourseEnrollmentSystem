# Part D — Debug This

## Original (Broken) Code

```python
def has_available_seats(course):
    enrolled_count = 0
    for student in course.enrollments:
        if student.status = "waitlisted":
            enrolled_count += 1
    return enrolled_count < course.capacity
```

## Corrected Code

```python
def has_available_seats(course):
    enrolled_count = 0
    for student in course.enrollments:
        if student.status == "enrolled":
            enrolled_count += 1
    return enrolled_count < course.capacity
```

## The Bugs

**Bug 1 — Wrong equals sign:**
The code used `=` (assignment) instead of `==` (comparison) inside the `if` condition. In Python this is a syntax error and the program won't even run.

**Bug 2 — Checking the wrong status:**
The code counted students with status `"waitlisted"` against the course capacity. But waitlisted students haven't taken a seat — only `"enrolled"` students have. So it was counting the wrong group entirely.

## Explanation

> The original code had two bugs: it used a single `=` instead of `==` for comparison, which causes a Python syntax error and crashes immediately. It also checked for `status == "waitlisted"` instead of `"enrolled"`, meaning it counted students who don't occupy a seat rather than those who do. The fix corrects the operator and the status value being checked, so `enrolled_count` now accurately reflects seats actually taken, and the function correctly returns whether the course still has room.

