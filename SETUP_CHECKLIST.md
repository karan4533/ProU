# Setup Checklist - Quick Reference

## ✅ Pre-Setup Checklist

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Docker Desktop installed (for MySQL) OR MySQL installed locally
- [ ] Code editor ready (VS Code recommended)

---

## ✅ Step-by-Step Checklist

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages

### 2. Set Up MySQL

**Choose ONE option:**

#### Option A: Docker (Recommended)
```bash
docker run --name mysql-employee-task \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=admin123 \
  -p 3306:3306 \
  -d mysql:8.0
```
- [ ] Docker command executed
- [ ] Container is running (`docker ps`)
- [ ] Waited 15-20 seconds for initialization

#### Option B: Local MySQL
- [ ] MySQL installed
- [ ] MySQL service running
- [ ] Database created: `CREATE DATABASE mydb;`
- [ ] User created: `CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';`
- [ ] Permissions granted: `GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'localhost';`

#### Option C: Cloud MySQL
- [ ] Cloud account created
- [ ] MySQL database created
- [ ] Connection string copied

### 3. Configure .env File
- [ ] `.env` file exists in `backend/` folder
- [ ] `DATABASE_URL` is set correctly
- [ ] `PORT=4000` is set
- [ ] File saved

**Example .env content:**
```env
PORT=4000
DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 4. Start Backend Server
```bash
cd backend
npm run start
```
- [ ] Server starts without errors
- [ ] See "✅ MySQL connection established"
- [ ] See "✅ Database tables synced"
- [ ] See "🚀 Server running on http://localhost:4000"

### 5. Verify Server
- [ ] Health check works: `curl http://localhost:4000/health`
- [ ] Returns: `{"status":"OK","timestamp":"..."}`

### 6. Seed Database (Optional)
```bash
cd backend
npm run seed
```
- [ ] Seed script runs successfully
- [ ] See "✅ Created X employees"
- [ ] See "✅ Created X tasks"

### 7. Test API Endpoints
- [ ] `GET /api/v1/employees` works
- [ ] `POST /api/v1/employees` works
- [ ] `GET /api/v1/tasks` works
- [ ] `GET /api/v1/tasks/metrics/tasks-by-status` works

### 8. Frontend Setup (If Ready)
```bash
cd frontend
npm install
npm run dev
```
- [ ] Frontend dependencies installed
- [ ] Frontend server running on http://localhost:5173
- [ ] Frontend can connect to backend API

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

- [ ] Checked MySQL is running (Docker: `docker ps`, Local: check services)
- [ ] Verified `.env` file has correct `DATABASE_URL`
- [ ] Checked port 3306 is not blocked
- [ ] Waited 15-20 seconds after starting Docker MySQL
- [ ] Checked server terminal for error messages
- [ ] Verified Node.js and npm versions are correct
- [ ] Ran `npm install` again if needed

---

## 📋 Quick Command Reference

```bash
# Start MySQL (Docker)
docker start mysql-employee-task

# Check MySQL status
docker ps

# Start backend
cd backend && npm run start

# Seed database
cd backend && npm run seed

# Test health
curl http://localhost:4000/health

# Test employees
curl http://localhost:4000/api/v1/employees
```

---

## ✅ Final Verification

Everything is working when:
- [ ] Backend server runs without errors
- [ ] Health endpoint returns OK
- [ ] Can create/read employees via API
- [ ] Can create/read tasks via API
- [ ] Frontend connects to backend (if applicable)

**You're all set! 🎉**

