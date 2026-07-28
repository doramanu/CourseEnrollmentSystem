# Course Enrollment System

A small Course Enrollment System built for the Arbin Instruments technical assessment — covering database design, core enrollment logic, and a React frontend.

## Features

- Enroll a student in a course
- Automatic waitlisting when a course reaches capacity
- Duplicate enrollment prevention
- Cancellation with automatic promotion of the first waitlisted student
- SQL schema with primary keys, foreign keys, and constraints
- Sample data and the required SQL queries
- React dashboard with live enrollment status, waitlists, and summary stats
- Unit tests for the core enrollment logic

## Tech Stack

| Layer | Technology |
|---|---|
| Database | SQL (MySQL/PostgreSQL-compatible schema) |
| Backend logic | C# / .NET 8 |
| Frontend | React + Vite |
| Testing | xUnit |

## Project Structure

    CourseEnrollmentSystem/
    ├── database/
    │   ├── schema.sql          - CREATE TABLE statements
    │   ├── seed.sql             - Sample data
    │   └── queries.sql          - Required SQL queries
    ├── backend/
    │   ├── EnrollmentSystem.Core/     - Models + EnrollmentManager
    │   ├── EnrollmentSystem.Demo/     - Console demo
    │   └── EnrollmentSystem.Tests/    - Unit tests
    ├── frontend/                - React + Vite app
    ├── docs/
    │   └── PartD_Debug.md
    └── NOTES.md

## How to Run

### 1. Database
Run the SQL files in order against a MySQL or PostgreSQL instance (or a browser sandbox like [db-fiddle.com](https://www.db-fiddle.com/)): `schema.sql`, then `seed.sql`, then run `queries.sql`.

### 2. Backend demo
Requires the .NET 8 SDK.

```bash
cd backend
dotnet run --project EnrollmentSystem.Demo
```

### 3. Backend tests

```bash
cd backend
dotnet test
```

### 4. Frontend
Requires Node.js and npm.

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Assignment Coverage

| Part | Description | Location |
|---|---|---|
| A | Database & SQL | `database/` |
| B | Core Enrollment Logic | `backend/EnrollmentSystem.Core/`, `backend/EnrollmentSystem.Demo/` |
| C | React Frontend | `frontend/` |
| D | Debugging Exercise | [`docs/PartD_Debug.md`](docs/PartD_Debug.md) |
| E | Reflection | [`NOTES.md`](NOTES.md) |

## Author

**Samruddhi Patil**
Built for the Arbin Instruments hiring assessment.