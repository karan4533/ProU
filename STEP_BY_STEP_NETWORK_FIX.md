# Step-by-Step: Fix Network Error on Vercel

## Current Issue
- ✅ Login page loads
- ❌ "Network Error" when trying to login
- ❌ Frontend can't connect to backend

## Root Cause
The frontend is trying to connect to `http://localhost:4000` (which doesn't exist on Vercel). You need to set the backend URL.

## Solution (Choose One)

### Option A: You Have Backend Deployed

#### Step 1: Get Your Backend URL
- If deployed on Render: `https://your-app.onrender.com`
- If deployed on Railway: `https://your-app.railway.app`
- If deployed elsewhere: Your backend URL

#### Step 2: Set Environment Variable in Vercel

1. **Open Vercel Dashboard**: https://vercel.com/dashboard
2. **Click your project** (the one showing the login page)
3. **Go to**: Settings → Environment Variables
4. **Click**: "Add New"
5. **Enter**:
   ```
   Key: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api/v1
   ```
   ⚠️ **Replace `your-backend-url.onrender.com` with your actual backend URL!**
6. **Select environments**: ✅ Production, ✅ Preview, ✅ Development
7. **Click**: "Save"

#### Step 3: Redeploy

1. **Go to**: Deployments tab
2. **Click**: The 3 dots (⋯) on the latest deployment
3. **Click**: "Redeploy"
4. **Wait**: 2-3 minutes for deployment

#### Step 4: Test

1. **Refresh** your Vercel URL
2. **Try to login** again
3. **Should work now!**

---

### Option B: You DON'T Have Backend Deployed

You need to deploy the backend first. Here's how:

#### Step 1: Deploy Backend to Render (Free)

1. **Go to**: https://render.com
2. **Sign up** (free tier available)
3. **Click**: "New +" → "Web Service"
4. **Connect GitHub**:
   - Click "Connect GitHub"
   - Authorize Render
   - Select repository: `karan4533/ProU`
5. **Configure Service**:
   ```
   Name: pro-u-backend (or your choice)
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm run start
   ```
6. **Environment Variables** (Click "Advanced"):
   ```
   PORT=4000
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_NAME=mydb
   DB_USER=admin
   DB_PASSWORD=your-password
   JWT_SECRET=change-this-to-random-string
   NODE_ENV=production
   CORS_ORIGIN=https://pro-q7r6zbmx2-karan4533s-projects.vercel.app
   ```
   ⚠️ **Important**: 
   - Replace MySQL credentials with your actual database
   - Replace `CORS_ORIGIN` with your Vercel URL
   - Use a strong random string for `JWT_SECRET`
7. **Click**: "Create Web Service"
8. **Wait**: 5-10 minutes for deployment
9. **Copy the URL**: It will be like `https://pro-u-backend.onrender.com`

#### Step 2: Test Backend

Open in browser:
```
https://your-backend-url.onrender.com/health
```

Should show:
```json
{"status":"OK","timestamp":"..."}
```

#### Step 3: Set Frontend Environment Variable

1. **Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add**:
   ```
   Key: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api/v1
   ```
   ⚠️ **Use the URL from Step 1, add `/api/v1` at the end**
3. **Select all environments**: ✅ Production, ✅ Preview, ✅ Development
4. **Save**

#### Step 4: Update Backend CORS

1. **Render Dashboard** → Your Service → Environment
2. **Update** `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
   Or for preview deployments:
   ```
   CORS_ORIGIN=https://*.vercel.app
   ```
3. **Save Changes** (Render will auto-restart)

#### Step 5: Redeploy Frontend

1. **Vercel** → Deployments → Redeploy
2. **Wait** for completion
3. **Test** login

---

## Quick Checklist

- [ ] Backend deployed? (If no, deploy to Render first)
- [ ] Backend URL working? (Test `/health` endpoint)
- [ ] `VITE_API_URL` set in Vercel? (Check Settings → Environment Variables)
- [ ] `CORS_ORIGIN` set in backend? (Check backend environment variables)
- [ ] Frontend redeployed? (After setting environment variable)
- [ ] Backend restarted? (After setting CORS_ORIGIN)

## Still Not Working?

### Check Browser Console

1. **Open DevTools**: Press `F12`
2. **Go to**: Console tab
3. **Try to login**
4. **Look for errors**:
   - "Network Error" → Backend not accessible
   - "CORS policy" → CORS not configured
   - "404" → Wrong API URL
   - "500" → Backend error

### Check Network Tab

1. **Open DevTools**: Press `F12`
2. **Go to**: Network tab
3. **Try to login**
4. **Click on the failed request** (usually `/auth/login`)
5. **Check**:
   - **Request URL**: Is it correct? Should be `https://your-backend.../api/v1/auth/login`
   - **Status**: What error code?
   - **Response**: What error message?

### Common Mistakes

1. ❌ **Missing `/api/v1`** in `VITE_API_URL`
   - ✅ Correct: `https://backend.onrender.com/api/v1`
   - ❌ Wrong: `https://backend.onrender.com`

2. ❌ **Using `http://` instead of `https://`**
   - ✅ Correct: `https://backend.onrender.com/api/v1`
   - ❌ Wrong: `http://backend.onrender.com/api/v1`

3. ❌ **Not redeploying after setting environment variable**
   - Must redeploy for changes to take effect!

4. ❌ **CORS_ORIGIN not matching Vercel URL**
   - Must match exactly or use wildcard

## Need Help?

Share:
1. Your backend URL (if deployed)
2. Screenshot of Vercel Environment Variables
3. Browser console errors (F12 → Console)
4. Network tab request details (F12 → Network → Click failed request)

