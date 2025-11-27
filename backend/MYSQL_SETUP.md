# MySQL Setup Guide

## Quick Setup Options

### Option 1: MySQL with Docker (Easiest - Recommended)

1. **Install Docker Desktop** (if not installed):
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop

2. **Run MySQL container**:
   ```bash
   docker run --name mysql-employee-task \
     -e MYSQL_ROOT_PASSWORD=admin123 \
     -e MYSQL_DATABASE=mydb \
     -e MYSQL_USER=admin \
     -e MYSQL_PASSWORD=admin123 \
     -p 3306:3306 \
     -d mysql:8.0
   ```

3. **Update .env file**:
   ```env
   DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
   ```

### Option 2: Local MySQL Installation

1. **Install MySQL**:
   - Windows: Download MySQL Installer from https://dev.mysql.com/downloads/installer/
   - Or use XAMPP/WAMP which includes MySQL
   - During installation, remember the root password

2. **Create database**:
   ```bash
   # Open MySQL command line
   mysql -u root -p

   # In MySQL, run:
   CREATE DATABASE mydb;
   CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
   GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Update .env file**:
   ```env
   DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
   ```

### Option 3: Free Cloud MySQL

#### Using PlanetScale (Free Tier):
1. Go to https://planetscale.com
2. Sign up for free account
3. Create a new database
4. Copy the connection string
5. Update .env:
   ```env
   DATABASE_URL=mysql://user:pass@host:3306/dbname?ssl={"rejectUnauthorized":true}
   ```

#### Using Railway (Free Tier):
1. Go to https://railway.app
2. Create new project → Add MySQL
3. Copy the DATABASE_URL from variables
4. Update .env:
   ```env
   DATABASE_URL=mysql://user:pass@host:3306/railway
   ```

#### Using Aiven (Free Tier):
1. Go to https://aiven.io
2. Create free MySQL service
3. Copy connection string
4. Update .env

## Update .env File

Edit `backend/.env`:

**Option A: Using DATABASE_URL (Recommended)**
```env
PORT=4000
DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Option B: Using Individual Parameters**
```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mydb
DB_USER=admin
DB_PASSWORD=admin123
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Connection String Format:**
```
mysql://[username]:[password]@[host]:[port]/[database]
```

## Testing the Connection

After updating `.env`:

```bash
cd backend
npm install  # Install new dependencies (mysql2)
npm run start
```

You should see:
```
✅ MySQL connection established
✅ Database tables synced
✅ Database ready
🚀 Server running on http://localhost:4000
```

## Seed the Database

```bash
cd backend
npm run seed
```

This will:
- Create tables if they don't exist
- Clear existing data
- Insert sample employees and tasks

## Troubleshooting

### Error: `Access denied for user`
- **Cause**: Wrong username or password
- **Fix**: Double-check credentials in `.env`
- **Docker**: Default is `admin` / `admin123`

### Error: `Unknown database 'mydb'`
- **Cause**: Database not created
- **Fix**: 
  - Docker: Database is auto-created
  - Local: Run `CREATE DATABASE mydb;`

### Error: `ECONNREFUSED` or `connection refused`
- **Cause**: MySQL not running or wrong port
- **Fix**: 
  - Check if MySQL is running: `docker ps` (for Docker) or check services
  - Verify port (default is 3306)
  - Check firewall settings

### Error: `relation "employees" does not exist` or `Table doesn't exist`
- **Cause**: Tables not created
- **Fix**: The server will auto-create tables on first run. If not, run seed script: `npm run seed`

### Error: `Client does not support authentication protocol`
- **Cause**: MySQL 8.0+ uses `caching_sha2_password` by default
- **Fix**: 
  ```sql
  ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
  FLUSH PRIVILEGES;
  ```

### Docker Container Commands

```bash
# Start container
docker start mysql-employee-task

# Stop container
docker stop mysql-employee-task

# View logs
docker logs mysql-employee-task

# Connect to MySQL in container
docker exec -it mysql-employee-task mysql -u admin -padmin123 mydb

# Remove container (if needed)
docker rm mysql-employee-task
```

## Quick Start (Docker)

```bash
# 1. Start MySQL
docker run --name mysql-employee-task \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=admin123 \
  -p 3306:3306 \
  -d mysql:8.0

# 2. Wait a few seconds for MySQL to initialize

# 3. Update .env
echo "DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb" >> backend/.env

# 4. Install dependencies
cd backend
npm install

# 5. Start server (tables will be created automatically)
npm run start

# 6. Seed data (optional)
npm run seed
```

## MySQL vs PostgreSQL Notes

- MySQL uses port **3306** (PostgreSQL uses 5432)
- Connection string format: `mysql://` instead of `postgresql://`
- ENUM types work natively in MySQL
- All Sequelize features work the same way

That's it! Your backend is now using MySQL! 🎉

