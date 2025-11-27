# Restart Server - Important Steps

## ⚠️ Important: Stop the Current Server First

If your server is still running, you need to **stop it completely** before restarting.

### Step 1: Stop the Server

In the terminal where the server is running:
- Press `Ctrl + C` to stop the server
- Wait until you see the command prompt again

### Step 2: Verify Server is Stopped

Make sure the server is not running:
```bash
# Check if port 4000 is in use (optional)
netstat -ano | findstr :4000
```

### Step 3: Restart the Server

```bash
cd backend
npm run start
```

### Step 4: Check the Output

You should now see:
```
🔍 Database Config:
  Host: localhost
  Port: 3306
  Database: mydb
  User: admin
  Password: ***SET***
✅ MySQL connection established
✅ Database tables synced
✅ Database ready
🚀 Server running on http://localhost:4000
```

---

## If You Still See Errors

1. **Make sure you stopped the old server** (Ctrl+C)
2. **Check the debug output** - it should show "Password: ***SET***"
3. **Verify .env file** is in the `backend/` folder
4. **Try a fresh terminal** - close and reopen your terminal

---

## Quick Test

After restarting, test:
```bash
curl http://localhost:4000/health
```

