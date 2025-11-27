# Check Your Current Setup

## Quick Diagnostic

Answer these questions to identify the issue:

### 1. Do you have a backend deployed?
- [ ] Yes, on Render
- [ ] Yes, on Railway
- [ ] Yes, elsewhere (where?)
- [ ] No, not deployed yet

**If "No"**: You need to deploy backend first. See `STEP_BY_STEP_NETWORK_FIX.md` → Option B

### 2. What's your backend URL?
- If Render: `https://________.onrender.com`
- If Railway: `https://________.railway.app`
- If other: `https://________`

### 3. Is backend accessible?
Test in browser:
```
https://your-backend-url/health
```

- [ ] ✅ Shows: `{"status":"OK","timestamp":"..."}`
- [ ] ❌ Shows error or doesn't load

**If error**: Backend is not working, check backend logs

### 4. Is VITE_API_URL set in Vercel?
- [ ] ✅ Yes, I set it
- [ ] ❌ No, not set yet

**If "No"**: 
1. Vercel Dashboard → Settings → Environment Variables
2. Add: `VITE_API_URL = https://your-backend-url/api/v1`
3. Redeploy

### 5. What's the value of VITE_API_URL?
Current value: `_________________`

Should be: `https://your-backend-url.onrender.com/api/v1`

### 6. Check browser console
1. Open your Vercel app
2. Press `F12`
3. Go to Console tab
4. Try to login
5. What error do you see?

Common errors:
- "Network Error" → Backend not accessible or wrong URL
- "CORS policy blocked" → CORS not configured
- "404 Not Found" → Wrong API URL
- "Failed to fetch" → Backend not running

### 7. Check Network tab
1. Press `F12` → Network tab
2. Try to login
3. Find the failed request (usually `/auth/login`)
4. Click on it
5. Check:
   - **Request URL**: What URL is it trying to reach?
   - **Status**: What status code? (404, 500, CORS error?)
   - **Response**: What error message?

## Most Common Issues

### Issue 1: VITE_API_URL Not Set
**Symptom**: Request goes to `http://localhost:4000`
**Fix**: Set `VITE_API_URL` in Vercel environment variables

### Issue 2: Wrong Backend URL
**Symptom**: 404 error
**Fix**: Check backend URL is correct, includes `/api/v1`

### Issue 3: CORS Error
**Symptom**: "CORS policy blocked" error
**Fix**: Set `CORS_ORIGIN` in backend environment variables

### Issue 4: Backend Not Deployed
**Symptom**: "Network Error" or "Failed to fetch"
**Fix**: Deploy backend to Render/Railway first

## Next Steps Based on Your Answers

- **If backend not deployed**: Deploy to Render (see Option B in STEP_BY_STEP_NETWORK_FIX.md)
- **If VITE_API_URL not set**: Set it in Vercel and redeploy
- **If CORS error**: Set CORS_ORIGIN in backend
- **If backend error**: Check backend logs

