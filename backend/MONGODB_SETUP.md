# MongoDB Setup Guide

## Quick Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended for Assessment)

1. **Sign up for free**: Go to https://www.mongodb.com/cloud/atlas/register

2. **Create a cluster**:
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a cloud provider and region (choose closest to you)
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Authentication Method: Password
   - Username: `admin` (or your choice)
   - Password: Generate a secure password (SAVE THIS!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Add Current IP Address" (or use `0.0.0.0/0` for development - less secure but works everywhere)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password (URL encode special characters)
   - Add database name: Change `?retryWrites=true&w=majority` to `/mydb?retryWrites=true&w=majority`

6. **Update .env file**:
   ```env
   MONGO_URI=mongodb+srv://admin:your-password@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB (If you have MongoDB installed)

1. **Install MongoDB** (if not installed):
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

2. **Update .env file**:
   ```env
   MONGO_URI=mongodb://localhost:27017/mydb
   ```

### Option 3: MongoDB Atlas Free Tier (Alternative)

If you already have a MongoDB Atlas account:
- Use an existing cluster
- Or create a new M0 free cluster
- Follow steps 3-6 from Option 1

## Testing the Connection

After updating `.env`:

```bash
cd backend
npm run start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:4000
```

## Troubleshooting

### Error: `querySrv ENOTFOUND`
- **Cause**: Connection string has placeholder values or incorrect format
- **Fix**: Make sure MONGO_URI in `.env` has real credentials, not `<user>` or `<pass>`

### Error: `Authentication failed`
- **Cause**: Wrong username or password
- **Fix**: Double-check credentials in `.env`
- **Note**: Special characters in password need URL encoding (e.g., `@` becomes `%40`)

### Error: `IP not whitelisted`
- **Cause**: Your IP address is not in MongoDB Atlas Network Access list
- **Fix**: Add your IP to Network Access in MongoDB Atlas (or use `0.0.0.0/0` for development)

### Error: `Connection timeout`
- **Cause**: Network/firewall issues or cluster is paused
- **Fix**: 
  - Check if cluster is running (not paused) in MongoDB Atlas
  - Check firewall settings
  - Try using `0.0.0.0/0` in Network Access (less secure but works for development)

## Example .env File

```env
PORT=4000
MONGO_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/mydb?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Important**: Never commit `.env` file to git! It's already in `.gitignore`.

