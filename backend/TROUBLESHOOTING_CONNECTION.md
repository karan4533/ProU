# Troubleshooting MySQL Connection Issues

## Issue: "Connection lost: The server closed the connection"

This is a common issue with MySQL 8.0 and Sequelize. Here's how to fix it:

---

## Solution 1: Update Database Configuration ✅ (Already Done)

The database configuration has been updated with:
- Increased connection timeout
- MySQL 8.0 compatibility settings
- Better retry logic

**File updated:** `backend/src/config/database.js`

---

## Solution 2: Fix MySQL Authentication

MySQL 8.0 uses `caching_sha2_password` by default, but Sequelize works better with `mysql_native_password`.

### If using Docker:

```bash
# Connect to MySQL container
docker exec -it mysql-employee-task mysql -u root -padmin123

# Then run these SQL commands:
ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

### If using Local MySQL:

```bash
mysql -u root -p

# Then run:
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
FLUSH PRIVILEGES;
EXIT;
```

---

## Solution 3: Restart MySQL Container

After making changes, restart the container:

```bash
docker restart mysql-employee-task
```

Wait 15-20 seconds for MySQL to restart.

---

## Solution 4: Test Connection Manually

Test if you can connect:

```bash
# Docker
docker exec -it mysql-employee-task mysql -u admin -padmin123 mydb

# Local
mysql -u admin -padmin123 -h localhost mydb
```

If you can connect, MySQL is working correctly.

---

## Solution 5: Check .env File

Make sure your `.env` file has the correct connection string:

```env
DATABASE_URL=mysql://admin:admin123@localhost:3306/mydb
```

**Important:** 
- No spaces around `=`
- Use `localhost` not `127.0.0.1`
- Port is `3306`

---

## Solution 6: Alternative Connection String Format

If the URL format doesn't work, try individual parameters in `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mydb
DB_USER=admin
DB_PASSWORD=admin123
```

Then remove or comment out `DATABASE_URL`.

---

## Solution 7: Recreate MySQL Container

If nothing works, recreate the container:

```bash
# Stop and remove
docker stop mysql-employee-task
docker rm mysql-employee-task

# Create new with mysql_native_password
docker run --name mysql-employee-task \
  -e MYSQL_ROOT_PASSWORD=admin123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=admin123 \
  -p 3306:3306 \
  -d mysql:8.0 \
  --default-authentication-plugin=mysql_native_password
```

Wait 15-20 seconds, then try again.

---

## Verify Fix

After applying solutions:

1. **Restart backend server:**
   ```bash
   cd backend
   npm run start
   ```

2. **Look for:**
   ```
   ✅ MySQL connection established
   ✅ Database tables synced
   ✅ Database ready
   ```

3. **Test health endpoint:**
   ```bash
   curl http://localhost:4000/health
   ```

---

## Common Error Messages

### "Access denied for user"
- Check username/password in `.env`
- Verify user exists in MySQL

### "Unknown database 'mydb'"
- Wait longer after starting container
- Or create database manually

### "Connection refused"
- Check MySQL is running: `docker ps`
- Check port 3306 is not blocked

### "Connection lost: The server closed the connection"
- Apply Solution 1 and 2 above
- Restart MySQL container
- Check connection timeout settings

---

## Still Not Working?

1. Check MySQL logs:
   ```bash
   docker logs mysql-employee-task
   ```

2. Check backend logs for specific error messages

3. Try connecting with MySQL client to verify MySQL works:
   ```bash
   docker exec -it mysql-employee-task mysql -u admin -padmin123 mydb
   ```

4. Verify `.env` file is in `backend/` folder and has correct values

---

## Quick Fix Checklist

- [ ] Database config updated (Solution 1) ✅
- [ ] MySQL authentication fixed (Solution 2)
- [ ] MySQL container restarted
- [ ] `.env` file verified
- [ ] Backend server restarted
- [ ] Connection test successful

