# Fix Vercel 404 Error

## Problem
Getting `404: NOT_FOUND` error on Vercel deployment.

## Solution

### Option 1: Update vercel.json (Already Done ✅)
The `vercel.json` file has been updated with proper SPA routing configuration.

### Option 2: Verify Vercel Project Settings

1. **Go to Vercel Dashboard** → Your Project → Settings

2. **Check Build & Development Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Verify vercel.json is in the right place**:
   - Should be in: `frontend/vercel.json`
   - NOT in root directory

### Option 3: Manual Fix in Vercel Dashboard

If `vercel.json` isn't being picked up:

1. Go to **Project Settings** → **Build & Development Settings**
2. Set:
   - **Output Directory**: `dist`
   - **Build Command**: `npm run build`
3. Go to **Settings** → **Redirects**
4. Add redirect rule:
   - **Source**: `/(.*)`
   - **Destination**: `/index.html`
   - **Permanent**: No (temporary redirect)

### Option 4: Re-deploy

After updating `vercel.json`:

1. **Commit and push** the updated `vercel.json`:
   ```bash
   git add frontend/vercel.json
   git commit -m "Fix Vercel 404 - Update SPA routing config"
   git push origin main
   ```

2. **Vercel will auto-deploy** from GitHub
   - Or manually trigger redeploy in Vercel dashboard

### Option 5: Alternative - Use _redirects file

If `vercel.json` still doesn't work, create `frontend/public/_redirects`:

```
/*    /index.html   200
```

Then rebuild and redeploy.

## Verification

After fixing, test:
- ✅ Homepage loads: `https://your-app.vercel.app/`
- ✅ Direct route access: `https://your-app.vercel.app/login`
- ✅ Protected routes: `https://your-app.vercel.app/employees`
- ✅ No 404 errors

## Common Issues

1. **vercel.json in wrong location**
   - Should be: `frontend/vercel.json`
   - NOT: `vercel.json` (root)

2. **Root Directory not set**
   - Must set Root Directory to `frontend` in Vercel settings

3. **Build output wrong**
   - Verify `dist/` folder contains `index.html`
   - Check Output Directory is set to `dist`

4. **Cache issues**
   - Clear browser cache
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Updated vercel.json

The `vercel.json` has been updated with:
- Proper SPA rewrite rules
- Cache headers for static assets
- Correct build configuration

**Next Step**: Commit and push the updated `vercel.json`, then redeploy on Vercel.

