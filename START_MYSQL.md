# Start MySQL Database - Quick Fix

## The Issue
Your MySQL database is not running, which is causing the 500 Internal Server Error when trying to login.

## Solution Options

### Option 1: Start Docker Desktop (If you have it installed)

1. **Start Docker Desktop**:
   - Open Docker Desktop from your Start menu
   - Wait for it to fully start (whale icon in system tray should be steady)

2. **Start MySQL container**:
   ```powershell
   docker start mysql-employee-task
   ```
   
   If the container doesn't exist, create it:
   ```powershell
   docker run --name mysql-employee-task `
     -e MYSQL_ROOT_PASSWORD=admin123 `
     -e MYSQL_DATABASE=mydb `
     -e MYSQL_USER=admin `
     -e MYSQL_PASSWORD=admin123 `
     -p 3306:3306 `
     -d mysql:8.0
   ```

3. **Wait 10-15 seconds** for MySQL to start, then try logging in again.

### Option 2: Use Local MySQL (If installed)

1. **Start MySQL service**:
   ```powershell
   # If MySQL is installed as a Windows service
   net start MySQL80
   # OR
   net start MySQL
   ```

2. **Verify MySQL is running**:
   ```powershell
   mysql -u admin -padmin123 -e "SELECT 1"
   ```

### Option 3: Use XAMPP/WAMP (If installed)

1. **Start XAMPP/WAMP Control Panel**
2. **Start MySQL service** from the control panel
3. **Verify it's running** on port 3306

---

## After Starting MySQL

1. **Restart the backend server** (if needed):
   - Stop the current backend process
   - Run: `cd backend && npm run start`

2. **Try logging in again** at http://localhost:5173

3. **If you don't have a user account yet**, register a new one first!

---

## Quick Check Commands

```powershell
# Check if MySQL is running on port 3306
netstat -ano | Select-String ":3306"

# Test database connection
cd backend
node -e "import('./src/models/index.js').then(m => m.syncDatabase().then(() => console.log('✅ Connected')).catch(e => console.error('❌', e.message)))"
```

