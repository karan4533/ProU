# Quick Fix: Network Error on Vercel

## The Problem
Login page loads but can't connect to backend (Network Error).

## Quick Fix (2 Steps)

### Step 1: Set Environment Variable in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click your project**
3. **Settings** → **Environment Variables**
4. **Add new variable**:
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api/v1
   ```
   ⚠️ **Replace with your actual backend URL!**
5. **Select all environments**: ✅ Production, ✅ Preview, ✅ Development
6. **Click "Save"**

### Step 2: Update Backend CORS

1. **Go to your backend deployment** (Render/Railway)
2. **Environment Variables** → **Add/Edit**:
   ```
   Name: CORS_ORIGIN
   Value: https://your-vercel-app.vercel.app
   ```
   ⚠️ **Replace with your actual Vercel URL!**
3. **Restart backend** (if needed)

### Step 3: Redeploy

1. **Vercel**: Deployments → Redeploy
2. **Backend**: Restart service (if CORS was updated)

## Don't Have Backend Deployed?

### Deploy Backend to Render (Free)

1. **Go to**: https://render.com
2. **Sign up** (free tier available)
3. **New** → **Web Service**
4. **Connect GitHub**: `karan4533/ProU`
5. **Settings**:
   - **Name**: `pro-u-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
6. **Environment Variables**:
   ```
   PORT=4000
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_NAME=mydb
   DB_USER=admin
   DB_PASSWORD=your-password
   JWT_SECRET=your-secret-key-change-this
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
7. **Deploy** and wait for URL (e.g., `https://pro-u-backend.onrender.com`)
8. **Copy the URL** and use it in Step 1 above

## Test Backend

After deploying, test:
```
https://your-backend.onrender.com/health
```

Should return:
```json
{"status":"OK","timestamp":"..."}
```

## Common Issues

- ❌ **"Network Error"** → Backend not deployed or wrong URL
- ❌ **"CORS blocked"** → CORS_ORIGIN not set in backend
- ❌ **"404"** → Wrong API URL (missing `/api/v1`)
- ❌ **"500"** → Backend error (check backend logs)

## Your URLs

After setup, you should have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Base**: `https://your-backend.onrender.com/api/v1`

