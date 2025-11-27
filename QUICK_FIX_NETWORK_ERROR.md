# Quick Fix for Network Error

## 🔍 Most Likely Issue

The network error is probably because:
1. **Frontend is trying to access protected routes** before login
2. **CORS preflight requests** need better handling
3. **Backend needs to be restarted** with updated CORS config

---

## ✅ Quick Fix Steps

### Step 1: Restart Backend (Important!)

The CORS configuration was just updated. You need to restart:

```bash
# Stop backend (Ctrl+C in backend terminal)
# Then restart:
cd backend
npm run start
```

### Step 2: Clear Browser Data

1. Open browser DevTools (F12)
2. Go to Application tab
3. Clear Local Storage
4. Clear Session Storage
5. Hard refresh (Ctrl+Shift+R)

### Step 3: Try Again

1. Go to http://localhost:5173
2. You should see login page
3. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`

---

## 🐛 If Still Getting Network Error

### Check Browser Console (F12)

Look for:
- **Red error messages** in Console tab
- **Failed requests** in Network tab (red)
- **CORS errors** (will mention "CORS policy")

### Common Errors:

**"CORS policy: No 'Access-Control-Allow-Origin' header"**
→ Backend CORS not configured (restart backend)

**"Network Error" or "ERR_CONNECTION_REFUSED"**
→ Backend not running (start backend)

**"401 Unauthorized"**
→ This is normal before login (not an error)

**"Failed to fetch"**
→ Check if backend is running

---

## 🧪 Test Backend Manually

Open PowerShell and test:

```powershell
$body = @{
    email = 'admin@example.com'
    password = 'admin123'
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:4000/api/v1/auth/login' `
    -Method Post `
    -Body $body `
    -ContentType 'application/json'
```

**If this works** → Backend is fine, issue is in frontend
**If this fails** → Backend issue (check backend logs)

---

## 🔄 Restart Everything

If nothing works, restart everything:

1. **Stop backend** (Ctrl+C)
2. **Stop frontend** (Ctrl+C)
3. **Restart backend**:
   ```bash
   cd backend
   npm run start
   ```
4. **Wait 5 seconds**
5. **Restart frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
6. **Open browser**: http://localhost:5173

---

## 📋 Verification Checklist

- [ ] Backend running: `curl http://localhost:4000/health`
- [ ] Frontend running: http://localhost:5173 opens
- [ ] Login page shows (not blank)
- [ ] Can see login form
- [ ] Browser console has no red errors
- [ ] Network tab shows requests (even if failed)

---

## 💡 Most Common Solution

**Restart the backend server** - The CORS config was just updated and needs a restart!

```bash
cd backend
# Press Ctrl+C to stop
npm run start
```

Then try the frontend again.

---

**Share the exact error message from browser console (F12) if still not working!**

