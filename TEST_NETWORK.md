# Network Error Debugging Guide

## ✅ Current Status

- **Backend**: ✅ Running on port 4000
- **Frontend**: ✅ Running on port 5173
- **Backend API Test**: ✅ Working (tested with PowerShell)

---

## 🔍 Debug Steps

### Step 1: Open Browser Console

1. Open http://localhost:5173
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. **Clear console** (right-click → Clear console)

### Step 2: Try to Login

1. Enter credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
2. Click "Sign in"
3. **Watch the console** - you should see:
   - `✅ API Response:` (if successful)
   - `❌ API Error:` (if failed)

### Step 3: Check Network Tab

1. In DevTools, go to **Network** tab
2. **Clear network log** (right-click → Clear)
3. Try to login again
4. Look for:
   - Request to `/auth/login`
   - Status code (200, 401, CORS error?)
   - Response preview

---

## 🧪 Test from Browser Console

After opening http://localhost:5173, open console (F12) and run:

```javascript
// Test 1: Direct fetch
fetch('http://localhost:4000/api/v1/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'admin@example.com', password: 'admin123'})
})
.then(r => r.json())
.then(d => console.log('✅ Direct fetch success:', d))
.catch(e => console.error('❌ Direct fetch error:', e));

// Test 2: Check API base URL
console.log('API Base URL:', import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1');
```

---

## 🔧 What I Just Fixed

1. **Enhanced CORS**: Added support for `127.0.0.1` and IPv6 `[::1]`
2. **Better Error Logging**: Added console logs to see exact errors
3. **Response Logging**: Added logs to see API responses

---

## ⚠️ IMPORTANT: Restart Backend

The CORS configuration was updated. **You MUST restart the backend:**

```bash
cd backend
# Press Ctrl+C to stop
npm run start
```

**Wait for**: `🚀 Server running on http://localhost:4000`

---

## 📋 What to Share

If still not working, share:

1. **Console output** (copy all red errors)
2. **Network tab details**:
   - Request URL
   - Status code
   - Response/Error message
3. **Screenshot** of the error (if possible)

---

## 💡 Most Common Issues

1. **Backend not restarted** → Restart backend after CORS change
2. **Browser cache** → Hard refresh (Ctrl+Shift+R)
3. **CORS preflight** → Check Network tab for OPTIONS request
4. **Wrong URL** → Check console for actual request URL

**Restart backend and check console!** 🚀

