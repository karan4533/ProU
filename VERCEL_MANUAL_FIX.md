# Manual Fix for Vercel 404 Error

## Quick Fix (Do This Now!)

Since `vercel.json` might not be working, add the redirect manually in Vercel Dashboard:

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Click on your project: **pro-u-psi** (or your project name)

### Step 2: Add Redirect Rule
1. Go to **Settings** tab
2. Click **Redirects** in the left sidebar
3. Click **Add Redirect Rule**
4. Fill in:
   - **Source Path**: `/(.*)`
   - **Destination**: `/index.html`
   - **Status Code**: `200` (not 301/302)
   - **Permanent**: Leave unchecked
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **3 dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Test
- Visit: `https://pro-u-psi.vercel.app/`
- Should load the app now!

## Alternative: Verify Project Settings

If redirect doesn't work, check these settings:

### Settings → General
- **Root Directory**: Should be `frontend` (not empty, not `/`)

### Settings → Build & Development Settings
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Settings → Environment Variables
- Make sure `VITE_API_URL` is set to your backend URL

## Why This Happens

Vercel needs to know to serve `index.html` for all routes in a Single Page Application (SPA). The redirect rule tells Vercel: "For any route that doesn't match a file, serve index.html instead."

## Still Not Working?

1. **Check deployment logs**:
   - Go to Deployments → Click on latest deployment
   - Check Build Logs for errors

2. **Verify build output**:
   - In deployment logs, check if `dist/index.html` exists
   - If not, the build might be failing

3. **Clear cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or use incognito/private window

4. **Check file structure**:
   - Make sure `frontend/dist/index.html` exists after build
   - Verify `frontend/vercel.json` is committed to GitHub

