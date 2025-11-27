# Fix Network Error on Vercel

## Problem
Login page loads but getting network errors when trying to connect to backend.

## Common Causes

### 1. Missing Environment Variable (MOST LIKELY)

**Fix:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api/v1
   ```
   Replace `your-backend-url.onrender.com` with your actual backend URL
3. **IMPORTANT**: Select "Production", "Preview", and "Development" environments
4. Click "Save"
5. **Redeploy** the project (Deployments → Redeploy)

### 2. Backend Not Deployed

**Check:**
- Is your backend deployed to Render/Railway?
- Can you access: `https://your-backend-url.onrender.com/health`?
- If not, deploy backend first!

### 3. CORS Configuration

**Backend needs to allow your Vercel URL:**
1. Go to your backend deployment (Render/Railway)
2. Add environment variable:
   ```
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
   Or add multiple origins:
   ```
   CORS_ORIGIN=https://your-vercel-app.vercel.app,https://pro-u.vercel.app
   ```
3. Restart backend

### 4. Backend URL Format

**Correct format:**
```
https://your-backend.onrender.com/api/v1
```

**Wrong formats:**
```
http://your-backend.onrender.com/api/v1  ❌ (no https)
https://your-backend.onrender.com        ❌ (missing /api/v1)
your-backend.onrender.com/api/v1         ❌ (missing https://)
```

## Step-by-Step Fix

### Step 1: Deploy Backend (if not done)

1. Go to https://render.com or https://railway.app
2. Create new service
3. Connect GitHub repo: `karan4533/ProU`
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
5. Add environment variables:
   ```
   PORT=4000
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_NAME=mydb
   DB_USER=admin
   DB_PASSWORD=your-password
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
6. Deploy and note the backend URL

### Step 2: Set Frontend Environment Variable

1. Vercel Dashboard → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api/v1
   ```
3. Select all environments (Production, Preview, Development)
4. Save

### Step 3: Update Backend CORS

1. Backend deployment → Environment Variables
2. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
3. Restart backend

### Step 4: Redeploy Frontend

1. Vercel → Deployments
2. Click "Redeploy"
3. Wait for completion

### Step 5: Test

1. Open browser console (F12)
2. Try to login
3. Check for errors:
   - If "Network Error" → Backend not accessible or CORS issue
   - If "404" → Wrong API URL
   - If "500" → Backend error (check backend logs)

## Quick Test

Test backend directly:
```bash
# Replace with your backend URL
curl https://your-backend.onrender.com/health
```

Should return:
```json
{"status":"OK","timestamp":"..."}
```

If this works, backend is running. If not, backend needs to be deployed/fixed.

## Debugging

### Check Browser Console
1. Open DevTools (F12)
2. Go to Network tab
3. Try to login
4. Look for failed requests
5. Check:
   - Request URL (is it correct?)
   - Status code (404, 500, CORS error?)
   - Response (what error message?)

### Check Vercel Environment Variables
1. Vercel Dashboard → Settings → Environment Variables
2. Verify `VITE_API_URL` is set
3. Verify it's enabled for Production/Preview

### Check Backend Logs
1. Render/Railway Dashboard
2. View deployment logs
3. Check for errors

## Common Error Messages

- **"Network Error"** → Backend not accessible or CORS blocked
- **"404 Not Found"** → Wrong API URL or endpoint doesn't exist
- **"401 Unauthorized"** → Authentication issue (this is normal if not logged in)
- **"500 Internal Server Error"** → Backend error (check backend logs)
- **"CORS policy blocked"** → Backend CORS not configured for your Vercel URL

