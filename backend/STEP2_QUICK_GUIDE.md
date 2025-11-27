# Step 2: MySQL Setup - Quick Guide

## ✅ Docker is Installed!

Since you have Docker installed, here's the easiest way to set up MySQL:

---

## Quick Setup (Copy & Paste)

### Step 1: Start MySQL Container

Copy and paste this entire command in your terminal:

```bash
docker run --name mysql-employee-task -e MYSQL_ROOT_PASSWORD=admin123 -e MYSQL_DATABASE=mydb -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin123 -p 3306:3306 -d mysql:8.0
```

**What happens:**
- Downloads MySQL 8.0 (first time only - may take 1-2 minutes)
- Creates a container named `mysql-employee-task`
- Sets up database `mydb`
- Creates user `admin` with password `admin123`
- Starts MySQL on port 3306

### Step 2: Wait 15-20 Seconds

**IMPORTANT:** MySQL needs time to initialize. Wait 15-20 seconds before proceeding.

### Step 3: Verify It's Running

Run this command:

```bash
docker ps
```

**You should see:**
```
CONTAINER ID   IMAGE        STATUS         PORTS                    NAMES
xxxxx          mysql:8.0   Up X seconds   0.0.0.0:3306->3306/tcp  mysql-employee-task
```

If you see `mysql-employee-task` in the list, you're done! ✅

---

## If Container Already Exists

If you get an error "container name already exists", use one of these:

### Option A: Start Existing Container
```bash
docker start mysql-employee-task
```

### Option B: Remove and Recreate
```bash
docker rm mysql-employee-task
```
Then run the `docker run` command again from Step 1.

---

## Verify MySQL is Ready

After waiting 15-20 seconds, check the logs:

```bash
docker logs mysql-employee-task
```

Look for: `"MySQL init process done. Ready for start up."` or `"ready for connections"`

---

## Common Commands

```bash
# Start MySQL
docker start mysql-employee-task

# Stop MySQL
docker stop mysql-employee-task

# View logs
docker logs mysql-employee-task

# Check if running
docker ps
```

---

## Troubleshooting

### "Port 3306 is already in use"
**Solution:** Another MySQL is running. Stop it or use a different port:
```bash
docker run --name mysql-employee-task -e MYSQL_ROOT_PASSWORD=admin123 -e MYSQL_DATABASE=mydb -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin123 -p 3307:3306 -d mysql:8.0
```
Then update `.env` to use port 3307.

### Container keeps stopping
**Solution:** Check logs for errors:
```bash
docker logs mysql-employee-task
```

### Can't connect
**Solution:** 
- Make sure you waited 15-20 seconds
- Check container is running: `docker ps`
- Verify logs: `docker logs mysql-employee-task`

---

## ✅ Success Checklist

- [ ] Docker command executed without errors
- [ ] Waited 15-20 seconds
- [ ] `docker ps` shows `mysql-employee-task` running
- [ ] Logs show "ready for connections"

**Once all checked, you're ready for Step 3!** 🎉

---

## Next Step

After MySQL is running, proceed to **Step 3: Configure .env File**

Your `.env` file should have:
```env
DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
```

