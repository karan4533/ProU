# Quick Start - MySQL Backend

## ✅ Setup Complete!

The backend is now using MySQL. Here's what you need:

- ✅ Dependencies installed (Sequelize, mysql2)
- ✅ Models configured for MySQL
- ✅ Database connection ready

## 🚀 Quick Start (Docker - Easiest)

### Step 1: Start MySQL with Docker

```bash
docker run --name mysql-employee-task \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=admin123 \
  -p 3306:3306 \
  -d mysql:8.0
```

**Wait 10-15 seconds** for MySQL to fully initialize before proceeding.

### Step 2: Verify .env file

Your `.env` file should have:
```env
PORT=4000
DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Step 3: Start the Server

```bash
cd backend
npm run start
```

You should see:
```
✅ MySQL connection established
✅ Database tables synced
✅ Database ready
🚀 Server running on http://localhost:4000
```

### Step 4: Seed Data (Optional)

```bash
npm run seed
```

## 📋 Alternative Setup Options

### Option A: Local MySQL

1. Install MySQL from https://dev.mysql.com/downloads/installer/
2. Create database:
   ```sql
   CREATE DATABASE mydb;
   CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
   GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. Update `.env`:
   ```env
   DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
   ```

### Option B: Cloud MySQL (Free)

- **PlanetScale**: https://planetscale.com (Free tier)
- **Railway**: https://railway.app (Free tier)
- **Aiven**: https://aiven.io (Free tier)

Copy the connection string and update `.env`:
```env
DATABASE_URL=mysql://user:pass@host:3306/dbname
```

## 🧪 Test the API

```bash
# Health check
curl http://localhost:4000/health

# Create employee
curl -X POST http://localhost:4000/api/v1/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"Developer"}'

# Get employees
curl http://localhost:4000/api/v1/employees
```

## 🐛 Troubleshooting

**Error: "Access denied for user"**
- Check username/password in `.env`
- For Docker: Use `admin` / `admin123`

**Error: "Unknown database 'mydb'"**
- Docker: Database is auto-created, wait a bit longer
- Local: Run `CREATE DATABASE mydb;`

**Error: "connection refused"**
- Check if MySQL is running: `docker ps`
- Verify port 3306 is not blocked
- Wait 10-15 seconds after starting Docker container

**Error: "Client does not support authentication protocol"**
- Run this in MySQL:
  ```sql
  ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
  FLUSH PRIVILEGES;
  ```

## 📚 Documentation

- `MYSQL_SETUP.md` - Detailed MySQL setup guide
- `README.md` - Full project documentation

## 🎉 You're Ready!

Your backend is now using MySQL! The API endpoints work exactly the same as before.
