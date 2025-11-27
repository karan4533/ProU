# Quick: Deploy Backend to Render (5 Minutes)

## What You'll Get
A backend URL like: `https://pro-u-backend.onrender.com`

## Steps

### 1. Go to Render
👉 https://render.com → Sign up (free)

### 2. Create Web Service
- Click "New +" → "Web Service"
- Connect GitHub: `karan4533/ProU`

### 3. Settings
```
Name: pro-u-backend
Root Directory: backend
Build Command: npm install
Start Command: npm run start
```

### 4. Environment Variables (Add these)
```
PORT = 4000
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = mydb
DB_USER = admin
DB_PASSWORD = admin123
JWT_SECRET = secret-key-12345
NODE_ENV = production
CORS_ORIGIN = https://pro-q7r6zbmx2-karan4533s-projects.vercel.app
```

### 5. Deploy
- Click "Create Web Service"
- Wait 5-10 minutes
- Copy the URL (e.g., `https://pro-u-backend.onrender.com`)

### 6. Test
Open: `https://your-backend-url.onrender.com/health`
Should show: `{"status":"OK"}`

### 7. Use in Vercel
Go to Vercel → Environment Variables:
- Key: `VITE_API_URL`
- Value: `https://your-backend-url.onrender.com/api/v1`

Done! 🎉

