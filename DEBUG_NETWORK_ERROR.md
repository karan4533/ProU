# Debug Network Error - Step by Step

## ✅ Backend is Working

The backend login endpoint works correctly and returns:
```json
{
  "data": {
    "user": {...},
    "token": "..."
  }
}
```

---

## 🔍 Debugging Steps

### Step 1: Check Browser Console

1. Open http://localhost:5173
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Try to login
5. **Copy the exact error message** you see

### Step 2: Check Network Tab

1. In DevTools, go to **Network** tab
2. Try to login
3. Look for a request to `/auth/login`
4. Click on it
5. Check:
   - **Status**: What status code? (200, 401, 404, CORS error?)
   - **Headers**: Check Request and Response headers
   - **Preview/Response**: What does the response look like?

### Step 3: Verify Frontend is Updated

Make sure you **restarted the frontend** after the code fix:

```bash
cd frontend
# Press Ctrl+C to stop
npm run dev
```

### Step 4: Clear Browser Cache

1. Press **Ctrl + Shift + Delete**
2. Select "Cached images and files"
3. Clear data
4. Or use **Ctrl + Shift + R** (hard refresh)

---

## 🧪 Test Backend from Browser

Open browser console (F12) and run:

```javascript
fetch('http://localhost:4000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

**If this works** → Backend is fine, issue is in React code
**If this fails** → CORS or backend issue

---

## 🔧 Quick Fixes to Try

### Fix 1: Restart Both Servers

**Backend:**
```bash
cd backend
# Ctrl+C
npm run start
```

**Frontend:**
```bash
cd frontend
# Ctrl+C
npm run dev
```

### Fix 2: Check CORS Headers

The CORS config was just updated. Make sure backend is restarted.

### Fix 3: Verify API URL

Check browser console - is it trying to connect to:
- ✅ `http://localhost:4000/api/v1/auth/login`
- ❌ Something else?

---

## 📋 What to Share

If still not working, share:

1. **Exact error message** from browser console
2. **Network tab details**:
   - Request URL
   - Status code
   - Error message
3. **Backend terminal output** (any errors?)

---

## 💡 Most Likely Issue

Since backend works with curl/PowerShell, the issue is likely:

1. **Frontend not restarted** (code fix not applied)
2. **Browser cache** (old code still running)
3. **CORS preflight** (OPTIONS request failing)

**Try restarting frontend and hard refresh browser first!**

