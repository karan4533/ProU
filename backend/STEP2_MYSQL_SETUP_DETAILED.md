# Step 2: MySQL Setup - Detailed Instructions

This guide will help you set up MySQL for the backend. Choose the option that works best for you.

---

## Option A: Docker (Easiest - Recommended) ⭐

### Prerequisites
- Docker Desktop installed and running
- Check if Docker is running: Look for Docker icon in system tray (Windows) or menu bar (Mac)

### Step-by-Step:

#### 1. Check Docker is Running
```bash
docker --version
```
If you see a version number, Docker is installed. If not, install from: https://www.docker.com/products/docker-desktop

#### 2. Run MySQL Container
Open your terminal (PowerShell, Command Prompt, or Terminal) and run:

```bash
docker run --name mysql-employee-task \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=admin123 \
  -p 3306:3306 \
  -d mysql:8.0
```

**What this does:**
- Creates a MySQL container named `mysql-employee-task`
- Sets root password to `admin123`
- Creates a database called `mydb`
- Creates a user `admin` with password `admin123`
- Maps port 3306 (MySQL default port)
- Downloads MySQL 8.0 image if not already present

#### 3. Wait for MySQL to Initialize
**IMPORTANT:** Wait 15-20 seconds after running the command. MySQL needs time to set up.

#### 4. Verify Container is Running
```bash
docker ps
```

You should see something like:
```
CONTAINER ID   IMAGE        STATUS         PORTS                    NAMES
abc123def456   mysql:8.0   Up 2 minutes   0.0.0.0:3306->3306/tcp  mysql-employee-task
```

If you see the container, you're good! ✅

#### 5. Check Container Logs (Optional)
```bash
docker logs mysql-employee-task
```

You should see messages like "MySQL init process done. Ready for start up."

### If Container Already Exists

If you get an error "container name already exists", use:

```bash
# Start existing container
docker start mysql-employee-task

# Or remove and recreate
docker rm mysql-employee-task
# Then run the docker run command again
```

### Useful Docker Commands

```bash
# Start container
docker start mysql-employee-task

# Stop container
docker stop mysql-employee-task

# View logs
docker logs mysql-employee-task

# Remove container (if needed)
docker rm mysql-employee-task
```

---

## Option B: Local MySQL Installation

### Step 1: Install MySQL

**Windows:**
1. Download MySQL Installer: https://dev.mysql.com/downloads/installer/
2. Choose "MySQL Installer for Windows"
3. Select "Developer Default" or "Server only"
4. During installation:
   - Remember the root password you set
   - Make sure "Start MySQL Server at System Startup" is checked
   - Complete the installation

**Alternative - XAMPP (Easier for Windows):**
1. Download XAMPP: https://www.apachefriends.org/
2. Install XAMPP
3. Open XAMPP Control Panel
4. Start MySQL service (click "Start" button)

### Step 2: Verify MySQL is Running

**Windows Services:**
- Press `Win + R`, type `services.msc`, press Enter
- Look for "MySQL80" or "MySQL" service
- Status should be "Running"

**XAMPP:**
- Check XAMPP Control Panel
- MySQL should show "Running" in green

### Step 3: Open MySQL Command Line

**Option 1: MySQL Command Line Client**
- Search for "MySQL Command Line Client" in Start Menu
- Enter your root password when prompted

**Option 2: XAMPP Shell**
- Open XAMPP Control Panel
- Click "Shell" button
- Type: `mysql -u root -p`
- Enter password (default for XAMPP is usually empty, just press Enter)

**Option 3: Command Prompt/PowerShell**
```bash
mysql -u root -p
```
Enter your root password.

### Step 4: Create Database and User

Once you're in MySQL (you'll see `mysql>` prompt), run these commands one by one:

```sql
CREATE DATABASE mydb;
```

```sql
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
```

```sql
GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'localhost';
```

```sql
FLUSH PRIVILEGES;
```

```sql
EXIT;
```

**What each command does:**
1. Creates database named `mydb`
2. Creates user `admin` with password `admin123`
3. Gives user full access to `mydb` database
4. Applies the changes
5. Exits MySQL

### Step 5: Test Connection

```bash
mysql -u admin -padmin123 mydb
```

If you can connect, you're all set! Type `EXIT;` to leave.

---

## Option C: Cloud MySQL (Free Tier)

### Option C1: PlanetScale

1. **Sign up:** Go to https://planetscale.com
2. **Create account** (free tier available)
3. **Create database:**
   - Click "New database"
   - Choose a name (e.g., `mydb`)
   - Select region closest to you
   - Click "Create database"
4. **Get connection string:**
   - Go to your database
   - Click "Connect"
   - Copy the connection string
   - It looks like: `mysql://username:password@host:3306/database`

### Option C2: Railway

1. **Sign up:** Go to https://railway.app
2. **Create new project**
3. **Add MySQL:**
   - Click "New" → "Database" → "Add MySQL"
4. **Get connection string:**
   - Click on MySQL service
   - Go to "Variables" tab
   - Copy `DATABASE_URL` or `MYSQL_URL`

### Option C3: Aiven

1. **Sign up:** Go to https://aiven.io
2. **Create MySQL service**
3. **Get connection string** from service overview

---

## Verify MySQL is Working

### Test 1: Check if MySQL is Running

**Docker:**
```bash
docker ps | grep mysql
```

**Local:**
- Check Windows Services
- Or XAMPP Control Panel

**Cloud:**
- Check provider dashboard (should show "Running" or "Active")

### Test 2: Test Connection

**Docker/Local:**
```bash
mysql -u admin -padmin123 -h localhost -P 3306 mydb -e "SELECT 1;"
```

If you see output, connection works! ✅

**Cloud:**
- Use the connection string from your provider
- Test in their web console or with a MySQL client

---

## Common Issues & Solutions

### Issue: "Cannot connect to MySQL server"

**Docker:**
- Wait longer (20-30 seconds)
- Check container is running: `docker ps`
- Check logs: `docker logs mysql-employee-task`

**Local:**
- Make sure MySQL service is running
- Check port 3306 is not blocked by firewall
- Verify MySQL is installed correctly

### Issue: "Access denied for user"

**Solution:**
- Double-check username and password
- For Docker: Use `admin` / `admin123`
- For Local: Make sure you created the user correctly
- Try resetting password or recreating user

### Issue: "Unknown database 'mydb'"

**Docker:**
- Wait 15-20 seconds after starting container
- Database is auto-created, just needs time

**Local:**
- Make sure you ran `CREATE DATABASE mydb;`
- Verify with: `SHOW DATABASES;` in MySQL

### Issue: Docker command fails

**"Port already in use":**
- Another MySQL instance is running on port 3306
- Stop it or use different port: `-p 3307:3306`

**"Container name already exists":**
```bash
docker rm mysql-employee-task
# Then run the docker run command again
```

---

## Next Step

Once MySQL is set up and running, proceed to **Step 3: Configure .env File**

Your `.env` file should have:
```env
DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
```

For cloud MySQL, use the connection string from your provider.

---

## Quick Reference

**Docker (Recommended):**
```bash
docker run --name mysql-employee-task \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=admin123 \
  -p 3306:3306 \
  -d mysql:8.0
```

**Verify:**
```bash
docker ps
```

**Start/Stop:**
```bash
docker start mysql-employee-task
docker stop mysql-employee-task
```

---

**You're done with Step 2 when:**
- ✅ MySQL is running (Docker container or local service)
- ✅ Database `mydb` exists
- ✅ User `admin` with password `admin123` exists
- ✅ You can connect to MySQL

**Ready for Step 3!** 🚀

