# Employee & Task Management System

## Project Title
Employee & Task Management System

## Short Description
A full-stack web application for managing employees and tasks within an organization. The system provides CRUD operations for employees and tasks, with features like task assignment, status tracking, priority management, and a dashboard with metrics visualization.

## Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, Axios, React Router DOM
- **Backend**: Node.js, Express.js, MySQL, Sequelize
- **Database**: MySQL (Docker/Cloud/Local)
- **Deployment**: Netlify (Frontend), Render (Backend)

## Features
### Mandatory Features
- Employee CRUD operations (Create, Read, Update, Delete)
- Task CRUD operations with status and priority management
- Task assignment to employees
- Dashboard with metrics (total employees, total tasks, tasks by status)
- Search and filtering for employees and tasks
- Responsive design (mobile-first)
- Form validations (client and server-side)

### Bonus Features Implemented
- **JWT Authentication** - Secure user registration and login
- Dashboard with task metrics visualization
- Search and filter functionality
- Pagination support
- Responsive UI with TailwindCSS
- Error handling with user-friendly messages
- Loading states and skeletons

## Project Structure
```
my-assessment-project/
├─ README.md
├─ .gitignore
├─ frontend/
│  ├─ package.json
│  ├─ public/
│  └─ src/
│     ├─ App.jsx
│     ├─ main.jsx
│     ├─ pages/
│     │  ├─ Dashboard.jsx
│     │  ├─ Employees.jsx
│     │  └─ Tasks.jsx
│     ├─ components/
│     │  ├─ EmployeeForm.jsx
│     │  ├─ TaskForm.jsx
│     │  └─ Navbar.jsx
│     └─ services/
│        └─ api.js
├─ backend/
│  ├─ package.json
│  ├─ src/
│  │  ├─ server.js
│  │  ├─ routes/
│  │  │  ├─ employees.js
│  │  │  └─ tasks.js
│  │  ├─ models/
│  │  │  ├─ Employee.js
│  │  │  └─ Task.js
│  │  └─ controllers/
│  └─ .env.example
└─ scripts/
   └─ seed_data.json
```

## Setup & Run Locally

### Prerequisites
- Node.js (v18 or higher)
- MySQL (Docker recommended - see setup guide)
- npm or yarn

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env to add your DATABASE_URL (MySQL connection string)
npm install
npm run start
```

**MySQL Setup Options:**
- **Docker (Easiest)**: See `backend/MYSQL_SETUP.md` for Docker setup
- **Local**: Install MySQL and create database
- **Cloud**: Use PlanetScale, Railway, or Aiven free tier

The backend will run on `http://localhost:4000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Documentation

Base URL: `http://localhost:4000/api/v1`

### Employees Endpoints

#### GET /api/v1/employees
Get all employees with optional filtering and pagination.

**Query Parameters:**
- `q` (string, optional): Search by name or email
- `role` (string, optional): Filter by role
- `limit` (number, optional): Items per page (default: 20)
- `page` (number, optional): Page number (default: 1)

**Response:**
```json
{
  "data": [
    {
      "_id": "...",
      "employeeId": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Developer",
      "joinedAt": "2024-01-01T00:00:00.000Z",
      "phone": "+1234567890"
    }
  ],
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

#### POST /api/v1/employees
Create a new employee.

**Request Body:**
```json
{
  "name": "Karan",
  "email": "karan@example.com",
  "role": "Developer",
  "phone": "+1234567890"
}
```

**Response:** `201 Created`
```json
{
  "data": {
    "_id": "...",
    "employeeId": "...",
    "name": "Karan",
    "email": "karan@example.com",
    "role": "Developer",
    "joinedAt": "2024-01-15T10:00:00.000Z",
    "phone": "+1234567890"
  }
}
```

#### GET /api/v1/employees/:id
Get employee by ID.

**Response:** `200 OK` or `404 Not Found`

#### PUT /api/v1/employees/:id
Update employee.

**Response:** `200 OK` or `404 Not Found`

#### DELETE /api/v1/employees/:id
Delete employee. Sets `assignedTo` to null for all tasks assigned to this employee.

**Response:** `204 No Content`

### Tasks Endpoints

#### GET /api/v1/tasks
Get all tasks with optional filtering and pagination.

**Query Parameters:**
- `status` (string, optional): Filter by status (todo, in-progress, completed)
- `assignedTo` (string, optional): Filter by employee ID
- `sort` (string, optional): Sort field and order (e.g., `dueDate:asc`)
- `limit` (number, optional): Items per page (default: 20)
- `page` (number, optional): Page number (default: 1)

**Response:**
```json
{
  "data": [
    {
      "_id": "...",
      "taskId": "...",
      "title": "Implement login",
      "description": "Add JWT auth",
      "status": "todo",
      "priority": "high",
      "assignedTo": "employeeId",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "dueDate": "2025-12-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

#### POST /api/v1/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Implement login",
  "description": "Add JWT auth",
  "status": "todo",
  "priority": "high",
  "assignedTo": "employeeId",
  "dueDate": "2025-12-01T00:00:00.000Z"
}
```

**Response:** `201 Created`

#### GET /api/v1/tasks/:id
Get task by ID.

**Response:** `200 OK` or `404 Not Found`

#### PUT /api/v1/tasks/:id
Update task.

**Response:** `200 OK` or `404 Not Found`

#### DELETE /api/v1/tasks/:id
Delete task.

**Response:** `204 No Content`

### Bonus Endpoints

#### GET /api/v1/metrics/tasks-by-status
Get task counts grouped by status.

**Response:**
```json
{
  "data": {
    "todo": 5,
    "in-progress": 3,
    "completed": 12
  }
}
```

#### GET /api/v1/employees/:id/tasks
Get all tasks assigned to a specific employee.

**Response:**
```json
{
  "data": [/* tasks */]
}
```

## Screenshots / Demo Links

### Deployed Links
- **Frontend**: [Add your Netlify/Vercel link here]
- **Backend**: [Add your Render/Railway link here]

### Screenshots
[Add 3-4 screenshots showing:
1. Dashboard with metrics
2. Employees page with list and form
3. Tasks page with filters
4. Mobile responsive view]

## Assumptions
1. **Employee Deletion**: When an employee is deleted, all tasks assigned to that employee will have their `assignedTo` field set to `null` (not cascade deleted).
2. **Email Uniqueness**: Employee emails must be unique across the system.
3. **Role Field**: Role is a simple string field (e.g., "Developer", "Manager") without predefined enum values.
4. **Date Handling**: All dates are stored and handled in ISO 8601 format (UTC).
5. **Authentication**: JWT-based authentication implemented. Users must register/login to access the application.
6. **Task Status**: Status can only be one of: `todo`, `in-progress`, `completed`.
7. **Task Priority**: Priority can only be one of: `low`, `medium`, `high`.
8. **Database**: MySQL is used (can be local, Docker, or cloud-hosted).

## Bonus Features Implemented
- Dashboard with task metrics visualization
- Search and filter functionality for employees and tasks
- Pagination support for list endpoints
- Responsive UI design with TailwindCSS
- Comprehensive error handling
- Loading states and user feedback

## How to Test

### Seed Data
Run the seed script to populate the database with sample data:

```bash
cd backend
node scripts/seed.js
```

This will create sample employees and tasks for testing.

### Manual Testing Checklist
1. Create an employee → verify it appears in the list
2. Update employee details → verify changes are saved
3. Create a task and assign to employee → verify assignment
4. Update task status → verify status change
5. Delete employee → verify tasks have `assignedTo` set to null
6. Test search and filter functionality
7. Test pagination
8. Verify responsive design on mobile and desktop

### API Testing with cURL

**Create Employee:**
```bash
curl -X POST http://localhost:4000/api/v1/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Karan","email":"karan@example.com","role":"Developer"}'
```

**Create Task:**
```bash
curl -X POST http://localhost:4000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Implement login","description":"Add JWT auth","status":"todo","priority":"high","assignedTo":"employeeId"}'
```

## Author & Submission
- **Name**: [Your Name]
- **Email**: [Your Email]
- **Submission Date**: [Date]
- **GitHub Repository**: https://github.com/karan4533/ProU
