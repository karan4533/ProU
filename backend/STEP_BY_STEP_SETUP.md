# Step-by-Step Setup Guide - MySQL Backend

Follow these steps in order to set up and run your backend with MySQL.

## Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js installed (v18 or higher) - Check with: `node --version`
- [ ] npm installed - Check with: `npm --version`
- [ ] Docker Desktop installed (for easiest MySQL setup) - OR MySQL installed locally

---

## Step 1: Install Dependencies

Open a terminal in the `backend` folder and run:

```bash
cd backend
npm install
```

**Expected output:** You should see packages being installed. Wait for "added X packages" message.

**Troubleshooting:**
- If you get errors, make sure you're in the `backend` directory
- If Node.js is not found, install it from https://nodejs.org

---

## Step 2: Set Up MySQL Database

You have 3 options. Choose ONE:

### Option A: Docker (Easiest - Recommended) ⭐

1. **Make sure Docker Desktop is running** (check system tray)

2. **Run this command:**
   ```bash
   docker run --name mysql-employee-task \
     -e MYSQL_ROOT_PASSWORD=admin123 \
     -e MYSQL_DATABASE=mydb \
     -e MYSQL_USER=admin \
     -e MYSQL_PASSWORD=admin123 \
     -p 3306:3306 \
     -d mysql:8.0
   ```

3. **Wait 15-20 seconds** for MySQL to initialize (important!)

4. **Verify it's running:**
   ```bash
   docker ps
   ```
   You should see `mysql-employee-task` in the list.

**If container already exists:**
```bash
docker start mysql-employee-task
```

### Option B: Local MySQL Installation

1. **Install MySQL:**
   - Download from: https://dev.mysql.com/downloads/installer/
   - Or use XAMPP/WAMP which includes MySQL

2. **Start MySQL service** (check Windows Services or XAMPP Control Panel)

3. **Create database and user:**
   ```bash
   mysql -u root -p
   ```
   Then run these SQL commands:
   ```sql
   CREATE DATABASE mydb;
   CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
   GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### Option C: Cloud MySQL (Free Tier)

1. **Choose a provider:**
   - PlanetScale: https://planetscale.com
   - Railway: https://railway.app
   - Aiven: https://aiven.io

2. **Create a MySQL database** and copy the connection string

3. **Update `.env` file** with the connection string (see Step 3)

---

## Step 3: Configure Environment Variables

1. **Open the `.env` file** in the `backend` folder

2. **Verify it contains:**
   ```env
   PORT=4000
   DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

3. **If using cloud MySQL**, replace `DATABASE_URL` with your cloud connection string:
   ```env
   DATABASE_URL=mysql://user:password@host:3306/database
   ```

4. **Save the file**

**Important:** 
- For Docker: Use `mysql://admin:admin123@localhost:3306/mydb`
- For Local: Use `mysql://admin:admin123@localhost:3306/mydb` (or your credentials)
- For Cloud: Use the connection string provided by your cloud provider

---

## Step 4: Start the Backend Server

1. **Make sure you're in the `backend` directory:**
   ```bash
   cd backend
   ```

2. **Start the server:**
   ```bash
   npm run start
   ```

3. **Expected output:**
   ```
   ✅ MySQL connection established
   ✅ Database tables synced
   ✅ Database ready
   🚀 Server running on http://localhost:4000
   ```

**If you see errors:**
- **"Access denied"**: Check your MySQL username/password in `.env`
- **"Connection refused"**: Make sure MySQL is running (Docker: `docker ps`, Local: check services)
- **"Unknown database"**: Wait a bit longer (Docker needs 15-20 seconds) or create database manually

---

## Step 5: Verify Server is Running

1. **Open a new terminal** (keep the server running in the first terminal)

2. **Test the health endpoint:**
   ```bash
   curl http://localhost:4000/health
   ```
   
   Or open in browser: http://localhost:4000/health
   
   **Expected response:**
   ```json
   {"status":"OK","timestamp":"2024-..."}
   ```

---

## Step 6: Seed Sample Data (Optional but Recommended)

1. **In a new terminal**, navigate to backend:
   ```bash
   cd backend
   ```

2. **Run the seed script:**
   ```bash
   npm run seed
   ```

3. **Expected output:**
   ```
   ✅ MySQL connection established
   ✅ Database tables synced
   ✅ Connected to MySQL
   🗑️  Cleared existing data
   ✅ Created 5 employees
   ✅ Created 8 tasks
   🎉 Seeding completed successfully!
   ```

---

## Step 7: Test API Endpoints

Test that everything works:

### Test 1: Get All Employees
```bash
curl http://localhost:4000/api/v1/employees
```

### Test 2: Create an Employee
```bash
curl -X POST http://localhost:4000/api/v1/employees \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"role\":\"Developer\"}"
```

### Test 3: Get All Tasks
```bash
curl http://localhost:4000/api/v1/tasks
```

### Test 4: Get Task Metrics
```bash
curl http://localhost:4000/api/v1/tasks/metrics/tasks-by-status
```

**Expected:** You should get JSON responses with data.

---

## Step 8: Connect Frontend (If Ready)

1. **Make sure backend is running** on `http://localhost:4000`

2. **In frontend folder**, update `src/services/api.js` if needed:
   ```javascript
   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
   ```

3. **Start frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open browser:** http://localhost:5173

---

## Common Issues & Solutions

### Issue: "Cannot find module 'mysql2'"
**Solution:**
```bash
cd backend
npm install
```

### Issue: "Access denied for user 'admin'"
**Solution:**
- Check `.env` file has correct username/password
- For Docker: Use `admin` / `admin123`
- For Local: Make sure you created the user (see Step 2, Option B)

### Issue: "ECONNREFUSED" or "Connection refused"
**Solution:**
- **Docker**: Check if container is running: `docker ps`
- **Local**: Check if MySQL service is running
- **Port**: Make sure port 3306 is not blocked by firewall

### Issue: "Unknown database 'mydb'"
**Solution:**
- **Docker**: Wait 15-20 seconds after starting container
- **Local**: Create database: `CREATE DATABASE mydb;`

### Issue: "Client does not support authentication protocol"
**Solution:**
Run in MySQL:
```sql
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
```

### Issue: Server starts but API returns errors
**Solution:**
- Check MySQL is actually running
- Verify `.env` file has correct `DATABASE_URL`
- Check server terminal for error messages

---

## Quick Reference Commands

```bash
# Start MySQL (Docker)
docker start mysql-employee-task

# Stop MySQL (Docker)
docker stop mysql-employee-task

# View MySQL logs (Docker)
docker logs mysql-employee-task

# Start backend server
cd backend
npm run start

# Seed database
cd backend
npm run seed

# Test health endpoint
curl http://localhost:4000/health
```

---

## Success Checklist

You're all set when:
- [ ] MySQL is running (Docker or Local)
- [ ] `.env` file is configured correctly
- [ ] Backend server starts without errors
- [ ] Health endpoint returns `{"status":"OK"}`
- [ ] Seed script runs successfully
- [ ] API endpoints return data
- [ ] Frontend can connect to backend (if applicable)

---

## Next Steps

Once everything is working:
1. ✅ Test all CRUD operations (Create, Read, Update, Delete)
2. ✅ Test search and filtering
3. ✅ Test task assignment
4. ✅ Verify frontend integration
5. ✅ Deploy to production (optional)

---

## Need Help?

- Check `MYSQL_SETUP.md` for detailed MySQL setup
- Check `QUICK_START.md` for quick reference
- Check server terminal for error messages
- Verify all prerequisites are installed

**You're ready to go! 🚀**

