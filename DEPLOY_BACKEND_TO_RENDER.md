# Deploy Backend to Render - Step by Step

## Step 1: Create Render Account

1. **Go to**: https://render.com
2. **Click**: "Get Started for Free" or "Sign Up"
3. **Sign up** with:
   - GitHub (recommended - easiest)
   - Or Email
4. **Verify your email** if needed

## Step 2: Create New Web Service

1. **After logging in**, you'll see the Render Dashboard
2. **Click**: "New +" button (top right)
3. **Select**: "Web Service"

## Step 3: Connect GitHub Repository

1. **Click**: "Connect GitHub" or "Connect account"
2. **Authorize Render** to access your GitHub
3. **Select repository**: `karan4533/ProU`
4. **Click**: "Connect"

## Step 4: Configure the Service

Fill in these fields:

### Basic Settings:
- **Name**: `pro-u-backend` (or any name you like)
- **Region**: Choose closest to you (e.g., "Oregon (US West)")
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANT: Must be `backend`**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm run start`

### Environment Variables (Click "Advanced" or scroll down):

Click "Add Environment Variable" for each:

1. **PORT**
   - Key: `PORT`
   - Value: `4000`

2. **DB_HOST**
   - Key: `DB_HOST`
   - Value: `localhost` (or your MySQL host if using cloud MySQL)

3. **DB_PORT**
   - Key: `DB_PORT`
   - Value: `3306`

4. **DB_NAME**
   - Key: `DB_NAME`
   - Value: `mydb`

5. **DB_USER**
   - Key: `DB_USER`
   - Value: `admin` (or your MySQL username)

6. **DB_PASSWORD**
   - Key: `DB_PASSWORD`
   - Value: `admin123` (or your MySQL password)

7. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: `my-super-secret-jwt-key-12345` (use a random string)

8. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

9. **CORS_ORIGIN**
   - Key: `CORS_ORIGIN`
   - Value: `https://pro-q7r6zbmx2-karan4533s-projects.vercel.app` (your Vercel URL)

## Step 5: Create the Service

1. **Scroll down** to bottom
2. **Click**: "Create Web Service"
3. **Wait**: 5-10 minutes for deployment

## Step 6: Get Your Backend URL

1. **After deployment completes**, you'll see:
   - Status: "Live" (green)
   - **Your URL**: `https://pro-u-backend.onrender.com` (or similar)
   
2. **Copy this URL** - this is your backend URL!

3. **Test it**: Open in browser:
   ```
   https://your-backend-url.onrender.com/health
   ```
   Should show: `{"status":"OK","timestamp":"..."}`

## Step 7: Use This URL in Vercel

Now go back to Vercel and add:

**Key**: `VITE_API_URL`
**Value**: `https://your-backend-url.onrender.com/api/v1`

⚠️ **Important**: Add `/api/v1` at the end!

## Troubleshooting

### If deployment fails:
1. Check **Logs** tab in Render
2. Look for errors
3. Common issues:
   - MySQL connection error → Check DB credentials
   - Build error → Check Root Directory is `backend`

### If backend doesn't start:
1. Check **Logs** tab
2. Verify all environment variables are set
3. Make sure MySQL is accessible

### If health check fails:
1. Wait a few more minutes (first deployment takes time)
2. Check logs for errors
3. Verify PORT is set to 4000

## Quick Checklist

- [ ] Render account created
- [ ] GitHub connected
- [ ] Repository selected: `karan4533/ProU`
- [ ] Root Directory set to: `backend`
- [ ] All environment variables added
- [ ] Service created and deploying
- [ ] Backend URL copied
- [ ] Health check works: `/health` endpoint
- [ ] URL added to Vercel as `VITE_API_URL`

## Next Steps

After backend is deployed:
1. Copy the backend URL
2. Go to Vercel → Environment Variables
3. Add: `VITE_API_URL = https://your-backend-url.onrender.com/api/v1`
4. Redeploy frontend
5. Test login!

