# Quick Start Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Setup Steps

### 1. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env and add your MONGO_URI
npm install
npm run start
```

Backend will run on `http://localhost:4000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Seed Database (Optional)
```bash
cd backend
npm run seed
```

This will populate the database with sample employees and tasks.

## Testing the API

### Create an Employee
```bash
curl -X POST http://localhost:4000/api/v1/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"Developer"}'
```

### Create a Task
```bash
curl -X POST http://localhost:4000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Implement login","description":"Add JWT auth","status":"todo","priority":"high"}'
```

## Project Structure
- `backend/` - Node.js/Express API
- `frontend/` - React/Vite frontend
- `scripts/` - Seed data JSON file
- `README.md` - Full documentation

## Next Steps
1. Set up MongoDB Atlas and update `.env` file
2. Run both backend and frontend servers
3. Seed the database with sample data
4. Test the application in browser
5. Deploy to production (Netlify + Render)

