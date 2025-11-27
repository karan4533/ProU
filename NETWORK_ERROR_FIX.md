# Network Error Troubleshooting

## Common Causes & Solutions

### 1. CORS Issue
**Symptom**: Network error in browser console, CORS policy error

**Solution**: Backend CORS is configured, but let's verify:
- Backend allows: `http://localhost:5173`
- Check browser console for specific CORS error

### 2. Backend Not Running
**Check**: 
```bash
curl http://localhost:4000/health
```

**If not running**:
```bash
cd backend
npm run start
```

### 3. Frontend Can't Reach Backend
**Check API URL**: Frontend uses `http://localhost:4000/api/v1`

**Test manually**:
```bash
curl http://localhost:4000/api/v1/auth/login
```

### 4. Port Issues
**Backend**: Should be on port 4000
**Frontend**: Should be on port 5173

**Check**:
```bash
netstat -ano | findstr :4000
netstat -ano | findstr :5173
```

### 5. Browser Console Error
**Check browser console** (F12) for:
- CORS errors
- Network errors
- 401/403 errors
- Connection refused

---

## Quick Fixes

### Fix 1: Restart Both Servers

**Backend**:
```bash
cd backend
# Stop current server (Ctrl+C)
npm run start
```

**Frontend**:
```bash
cd frontend
# Stop current server (Ctrl+C)
npm run dev
```

### Fix 2: Clear Browser Cache
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Try incognito/private mode

### Fix 3: Check CORS Configuration

Make sure backend `.env` has:
```env
CORS_ORIGIN=http://localhost:5173
```

### Fix 4: Verify API Endpoint

Test login endpoint:
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

Should return a token.

---

## Debug Steps

1. **Open browser console** (F12)
2. **Check Network tab** - See what requests are failing
3. **Check Console tab** - See error messages
4. **Try the request manually** with curl

---

## Common Error Messages

### "Network Error" or "ERR_CONNECTION_REFUSED"
- Backend not running
- Wrong port
- Firewall blocking

### "CORS policy" error
- CORS not configured correctly
- Wrong origin in CORS settings

### "401 Unauthorized"
- Token expired
- Not logged in
- Invalid credentials

### "404 Not Found"
- Wrong API endpoint
- Route not defined

---

## Quick Test

1. **Test backend health**:
   ```bash
   curl http://localhost:4000/health
   ```

2. **Test login endpoint**:
   ```bash
   curl -X POST http://localhost:4000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"admin123"}'
   ```

3. **Check browser console** for specific error

---

## Still Not Working?

Share the exact error message from:
- Browser console (F12)
- Network tab (what request failed?)
- Backend terminal (any errors?)

This will help identify the exact issue!

