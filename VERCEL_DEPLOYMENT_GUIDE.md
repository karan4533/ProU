# Vercel Deployment Guide

## ✅ Build Test Results

The build was successful! ✅
```
✓ 91 modules transformed.
dist/index.html                   0.49 kB │ gzip:  0.32 kB
dist/assets/index-D2epQ3xX.css   15.49 kB │ gzip:  3.63 kB
dist/assets/index-D6Ty7E3z.js   234.33 kB │ gzip: 74.84 kB
✓ built in 3.60s
```

## Prerequisites

1. **Backend deployed** (Render, Railway, or similar)
   - Your backend should be deployed and accessible via HTTPS
   - Note the backend URL (e.g., `https://your-app.onrender.com`)

2. **GitHub repository** (already done ✅)
   - Repository: https://github.com/karan4533/ProU

3. **Vercel account**
   - Sign up at https://vercel.com (free tier available)

## Step-by-Step Deployment

### Step 1: Deploy Backend First (if not done)

1. **Deploy backend to Render/Railway**:
   - Go to https://render.com or https://railway.app
   - Connect your GitHub repository
   - Select the `backend` folder
   - Set environment variables:
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
   - Deploy and note the backend URL

### Step 2: Deploy Frontend to Vercel

#### Option A: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

2. **Import GitHub Repository**:
   - Select "Import Git Repository"
   - Choose `karan4533/ProU`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables**:
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.onrender.com/api/v1
     ```
   - Replace `your-backend-url.onrender.com` with your actual backend URL

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for environment variables, add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api/v1
     ```

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Step 3: Update CORS on Backend

After getting your Vercel URL, update backend CORS:

1. **Update backend `.env` or environment variables**:
   ```
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```

2. **Restart backend** (if needed)

### Step 4: Verify Deployment

1. **Visit your Vercel URL** (e.g., `https://your-app.vercel.app`)
2. **Test login/register**
3. **Test CRUD operations**
4. **Check browser console for errors**

## Environment Variables Reference

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.onrender.com/api/v1
```

### Backend (Render/Railway)
```
PORT=4000
DB_HOST=your-mysql-host
DB_PORT=3306
DB_NAME=mydb
DB_USER=admin
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### API Calls Fail (CORS Error)
- Verify `VITE_API_URL` is set correctly in Vercel
- Check backend CORS configuration includes your Vercel URL
- Ensure backend is deployed and accessible

### 404 Errors on Routes
- Vercel should handle this with the `vercel.json` rewrite rules
- If not, check that `vercel.json` is in the `frontend` directory

### Environment Variables Not Working
- Vercel requires `VITE_` prefix for Vite projects
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

## Quick Commands

```bash
# Test build locally
cd frontend
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (if using CLI)
vercel
vercel --prod
```

## Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render/Railway
- [ ] Environment variables set correctly
- [ ] CORS configured on backend
- [ ] Test login/register
- [ ] Test CRUD operations
- [ ] Test on mobile device
- [ ] Update README with deployment URLs

## Next Steps

1. **Update README.md** with deployment URLs
2. **Add screenshots** of deployed application
3. **Test all features** on production
4. **Monitor for errors** in Vercel dashboard

---

**Your Vercel deployment URL will be**: `https://your-app-name.vercel.app`

