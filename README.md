# Employee & Task Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

A modern full-stack web application for managing employees and tasks within an organization. Built with React, Node.js, and MySQL.

[Live Demo](#deployment) • [Documentation](#api-documentation) • [Setup](#setup--installation)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Documentation](#api-documentation)
- [Assumptions](#assumptions)
- [Bonus Features](#bonus-features)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)

---

## 🎯 Overview

The Employee & Task Management System is a comprehensive solution for organizations to manage their workforce and track task assignments. The application provides an intuitive interface for creating, updating, and managing employee records, along with a robust task management system that supports assignment, status tracking, and priority management.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based user authentication
- 📊 **Dashboard Analytics** - Real-time metrics and visualizations
- 🔍 **Advanced Search & Filtering** - Quick access to employees and tasks
- 📱 **Responsive Design** - Mobile-first approach for all devices
- ⚡ **Fast Performance** - Optimized API responses with pagination
- 🎨 **Modern UI** - Clean, intuitive interface built with TailwindCSS

---

## ✨ Features

### Core Features

- **Employee Management**
  - Create, read, update, and delete employee records
  - Unique employee ID generation
  - Email uniqueness validation
  - Role-based employee categorization
  - Search and filter by name, email, or role

- **Task Management**
  - Full CRUD operations for tasks
  - Task assignment to employees
  - Status tracking (todo, in-progress, completed)
  - Priority levels (low, medium, high)
  - Due date management
  - Filter by status, employee, or priority

- **Dashboard**
  - Total employees count
  - Total tasks count
  - Tasks grouped by status
  - Visual metrics representation

- **Authentication**
  - User registration
  - Secure login with JWT tokens
  - Protected routes
  - Session management

### User Experience

- Responsive design for mobile, tablet, and desktop
- Loading states and skeleton screens
- Error handling with user-friendly messages
- Form validation (client and server-side)
- Pagination for large datasets
- Real-time search functionality

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI framework |
| **Vite** | 6.4.1 | Build tool and dev server |
| **TailwindCSS** | 3.3.6 | Utility-first CSS framework |
| **Axios** | 1.6.2 | HTTP client for API calls |
| **React Router DOM** | 6.20.1 | Client-side routing |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.18.2 | Web framework |
| **MySQL** | 8.0+ | Relational database |
| **Sequelize** | 6.35.2 | ORM for database operations |
| **JWT** | 9.0.2 | Authentication tokens |
| **bcryptjs** | 3.0.3 | Password hashing |

### Development Tools

- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
proU/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   └── database.js # Database connection setup
│   │   ├── controllers/    # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── employeeController.js
│   │   │   └── taskController.js
│   │   ├── middleware/     # Custom middleware
│   │   │   ├── auth.js     # JWT authentication
│   │   │   └── errorHandler.js
│   │   ├── models/         # Sequelize models
│   │   │   ├── Employee.js
│   │   │   ├── Task.js
│   │   │   ├── User.js
│   │   │   └── index.js
│   │   ├── routes/         # API routes
│   │   │   ├── auth.js
│   │   │   ├── employees.js
│   │   │   └── tasks.js
│   │   └── server.js       # Express server entry point
│   ├── scripts/            # Utility scripts
│   │   ├── seed.js        # Database seeding
│   │   └── seedAdmin.js   # Admin user creation
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/       # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Login.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   ├── vercel.json        # Vercel deployment config
│   └── package.json
│
├── scripts/                # Shared scripts
│   └── seed_data.json     # Sample data
│
├── .gitignore
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (8.0 or higher) - Can use Docker, local installation, or cloud service
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/karan4533/ProU.git
cd ProU
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env file with your database credentials
# See Database Setup section below
```

**Configure `.env` file:**

```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mydb
DB_USER=admin
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Start the backend server:**

```bash
npm run start
# Server runs on http://localhost:4000
```

### Step 3: Database Setup

#### Option 1: Docker (Recommended for Development)

```bash
docker run --name mysql-employee-task \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=admin123 \
  -p 3306:3306 \
  -d mysql:8.0
```

#### Option 2: Local MySQL Installation

1. Install MySQL from [mysql.com](https://dev.mysql.com/downloads/)
2. Create database and user:

```sql
CREATE DATABASE mydb;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```

#### Option 3: Cloud MySQL (For Production)

Use services like:
- **Aiven** (Free tier available)
- **PlanetScale** (Free tier available)
- **Railway** (Free tier available)

Update `.env` with cloud database credentials.

### Step 4: Seed Database (Optional)

```bash
cd backend
npm run seed
```

This creates sample employees and tasks for testing.

### Step 5: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional, for custom API URL)
echo "VITE_API_URL=http://localhost:4000/api/v1" > .env

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### Step 6: Access the Application

1. Open browser: `http://localhost:5173`
2. Register a new account or login
3. Start managing employees and tasks!

---

## 📚 API Documentation

### Base URL

- **Development**: `http://localhost:4000/api/v1`
- **Production**: `https://your-backend-url.onrender.com/api/v1`

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Authentication

**POST** `/api/v1/auth/register`
- Register a new user
- **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: `201 Created` with user data and token

**POST** `/api/v1/auth/login`
- Login user
- **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: `200 OK` with user data and token

#### Employees

**GET** `/api/v1/employees`
- Get all employees (with pagination and filtering)
- **Query Params**: `?q=search&role=Developer&page=1&limit=20`
- **Response**: `200 OK` with employees array and metadata

**GET** `/api/v1/employees/:id`
- Get employee by ID
- **Response**: `200 OK` with employee data

**POST** `/api/v1/employees`
- Create new employee
- **Body**: `{ "name": "John Doe", "email": "john@example.com", "role": "Developer", "phone": "+1234567890" }`
- **Response**: `201 Created` with employee data

**PUT** `/api/v1/employees/:id`
- Update employee
- **Body**: `{ "name": "John Doe", "role": "Senior Developer" }`
- **Response**: `200 OK` with updated employee data

**DELETE** `/api/v1/employees/:id`
- Delete employee (sets `assignedTo` to null for related tasks)
- **Response**: `204 No Content`

#### Tasks

**GET** `/api/v1/tasks`
- Get all tasks (with filtering and pagination)
- **Query Params**: `?status=todo&assignedTo=employeeId&sort=dueDate:asc&page=1&limit=20`
- **Response**: `200 OK` with tasks array and metadata

**GET** `/api/v1/tasks/:id`
- Get task by ID
- **Response**: `200 OK` with task data

**POST** `/api/v1/tasks`
- Create new task
- **Body**: `{ "title": "Implement feature", "description": "Add new feature", "status": "todo", "priority": "high", "assignedTo": "employeeId", "dueDate": "2025-12-31T00:00:00.000Z" }`
- **Response**: `201 Created` with task data

**PUT** `/api/v1/tasks/:id`
- Update task
- **Body**: `{ "status": "in-progress", "priority": "medium" }`
- **Response**: `200 OK` with updated task data

**DELETE** `/api/v1/tasks/:id`
- Delete task
- **Response**: `204 No Content`

#### Metrics

**GET** `/api/v1/tasks/metrics/tasks-by-status`
- Get task counts grouped by status
- **Response**: `200 OK` with `{ "todo": 5, "in-progress": 3, "completed": 12 }`

**GET** `/api/v1/employees/:id/tasks`
- Get all tasks assigned to a specific employee
- **Response**: `200 OK` with tasks array

#### Health Check

**GET** `/health`
- Server health check
- **Response**: `200 OK` with `{ "status": "OK", "timestamp": "..." }`

### Response Format

**Success Response:**
```json
{
  "data": { /* resource data */ },
  "meta": { /* pagination metadata */ }
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": ["Additional error details"]
}
```

---

## 💡 Assumptions

1. **Employee Deletion**: When an employee is deleted, all tasks assigned to that employee have their `assignedTo` field set to `null` (soft deletion approach, not cascade delete).

2. **Email Uniqueness**: Employee emails must be unique across the system. The system validates this on both client and server side.

3. **Role Field**: Role is a flexible string field without predefined enum values, allowing organizations to define their own role structure (e.g., "Developer", "Manager", "Designer", "Product Manager").

4. **Date Handling**: All dates are stored and handled in ISO 8601 format (UTC). The frontend handles timezone conversion for display.

5. **Authentication**: JWT-based authentication is implemented. Users must register and login to access the application. All protected routes require a valid JWT token.

6. **Task Status**: Task status is restricted to three values: `todo`, `in-progress`, `completed`. This is enforced at both API and database levels.

7. **Task Priority**: Task priority is restricted to three values: `low`, `medium`, `high`. This is enforced at both API and database levels.

8. **Database**: MySQL 8.0+ is used as the primary database. The system supports local, Docker, and cloud-hosted MySQL instances.

9. **Pagination**: Default page size is 20 items. Maximum page size is 100 items to prevent performance issues.

10. **CORS**: Cross-origin requests are allowed from configured origins only. In production, this should be restricted to your frontend domain.

---

## 🎁 Bonus Features

### Implemented Features

1. **JWT Authentication System**
   - Secure user registration and login
   - Token-based session management
   - Protected routes with authentication middleware
   - Password hashing with bcrypt

2. **Advanced Dashboard**
   - Real-time metrics visualization
   - Task status distribution charts
   - Total employees and tasks count
   - Visual indicators for quick insights

3. **Search & Filter Functionality**
   - Full-text search for employees (name, email)
   - Filter employees by role
   - Filter tasks by status, priority, and assigned employee
   - Real-time search with debouncing

4. **Pagination Support**
   - Server-side pagination for large datasets
   - Configurable page size
   - Metadata includes total count, current page, and total pages

5. **Responsive UI Design**
   - Mobile-first approach
   - TailwindCSS for modern, clean design
   - Responsive tables and forms
   - Touch-friendly interface elements

6. **Enhanced User Experience**
   - Loading states with skeleton screens
   - Error handling with user-friendly messages
   - Form validation with real-time feedback
   - Success notifications for actions

7. **Code Quality**
   - Modular component structure
   - Separation of concerns (controllers, services, models)
   - Error handling middleware
   - Consistent code formatting

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api/v1`
4. Deploy

**Live Frontend**: [Your Vercel URL]

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set Root Directory: `backend`
5. Configure environment variables:
   ```
   PORT=4000
   DB_HOST=your-database-host
   DB_PORT=3306
   DB_NAME=your-database-name
   DB_USER=your-username
   DB_PASSWORD=your-password
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
6. Deploy

**Live Backend**: [Your Render URL]

### Database Deployment

- **Aiven**: Free tier MySQL with SSL support
- **PlanetScale**: Serverless MySQL platform
- **Railway**: Easy MySQL deployment

---

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**
   - Register new user
   - Login with credentials
   - Access protected routes
   - Logout functionality

2. **Employee Management**
   - Create employee
   - View employee list
   - Update employee details
   - Delete employee
   - Search and filter employees

3. **Task Management**
   - Create task
   - Assign task to employee
   - Update task status
   - Filter tasks by status
   - Delete task

4. **Dashboard**
   - Verify metrics accuracy
   - Check real-time updates
   - Test responsive design

### API Testing with cURL

**Register User:**
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create Employee (with token):**
```bash
curl -X POST http://localhost:4000/api/v1/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"John Doe","email":"john@example.com","role":"Developer"}'
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Karan**

- GitHub: [@karan4533](https://github.com/karan4533)
- Repository: [ProU](https://github.com/karan4533/ProU)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- TailwindCSS for the utility-first CSS framework
- All open-source contributors whose packages made this project possible

---

<div align="center">

**Built with ❤️ using React, Node.js, and MySQL**

⭐ Star this repo if you find it helpful!

</div>
