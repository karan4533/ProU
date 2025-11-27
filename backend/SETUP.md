# Backend Setup Guide

## ✅ Completed Steps
1. ✅ Dependencies installed
2. ✅ .env file created from .env.example

## 📋 Next Steps

### 1. Set Up MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user:
   - Go to Database Access → Add New Database User
   - Username: `your-username`
   - Password: `your-password` (save this!)
   - Database User Privileges: Read and write to any database
5. Whitelist your IP:
   - Go to Network Access → Add IP Address
   - Click "Add Current IP Address" or use `0.0.0.0/0` for development
6. Get your connection string:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<username>` and `<password>` with your actual credentials
   - Add database name at the end: `...mongodb.net/mydb?retryWrites=true&w=majority`

### 2. Update .env File

Edit `backend/.env` and replace the MONGO_URI:

```env
PORT=4000
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. Start the Server

```bash
cd backend
npm run start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:4000
```

### 4. Test the API

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:4000/health
```

Or use your browser: `http://localhost:4000/health`

### 5. Seed the Database (Optional)

```bash
cd backend
npm run seed
```

This will create sample employees and tasks.

### 6. Test API Endpoints

**Create an Employee:**
```bash
curl -X POST http://localhost:4000/api/v1/employees \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"role\":\"Developer\"}"
```

**Get All Employees:**
```bash
curl http://localhost:4000/api/v1/employees
```

**Create a Task:**
```bash
curl -X POST http://localhost:4000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Implement login\",\"description\":\"Add JWT auth\",\"status\":\"todo\",\"priority\":\"high\"}"
```

**Get All Tasks:**
```bash
curl http://localhost:4000/api/v1/tasks
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify your MONGO_URI in `.env` is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure your database user has the correct permissions
- Check that the cluster is running (not paused)

### Port Already in Use
- Change PORT in `.env` to a different port (e.g., 4001)
- Or stop the process using port 4000

### Module Not Found
- Run `npm install` again
- Check that you're in the `backend` directory

## 📚 API Endpoints

All endpoints are prefixed with `/api/v1`

### Employees
- `GET /api/v1/employees` - List all employees (with query params: ?q=search&role=role&page=1&limit=20)
- `POST /api/v1/employees` - Create employee
- `GET /api/v1/employees/:id` - Get employee by ID
- `PUT /api/v1/employees/:id` - Update employee
- `DELETE /api/v1/employees/:id` - Delete employee
- `GET /api/v1/employees/:id/tasks` - Get tasks assigned to employee

### Tasks
- `GET /api/v1/tasks` - List all tasks (with query params: ?status=status&assignedTo=id&sort=field:order&page=1&limit=20)
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/:id` - Get task by ID
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/tasks/metrics/tasks-by-status` - Get task counts by status

### Health Check
- `GET /health` - Server health check

