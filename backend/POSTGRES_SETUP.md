# PostgreSQL Setup Guide

## Quick Setup Options

### Option 1: PostgreSQL with Docker (Easiest - Recommended)

1. **Install Docker Desktop** (if not installed):
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop

2. **Run PostgreSQL container**:
   ```bash
   docker run --name postgres-employee-task \
     -e POSTGRES_USER=admin \
     -e POSTGRES_PASSWORD=admin123 \
     -e POSTGRES_DB=mydb \
     -p 5432:5432 \
     -d postgres:15
   ```

3. **Update .env file**:
   ```env
   DATABASE_URL=postgresql://admin:admin123@localhost:5432/mydb
   ```

### Option 2: Local PostgreSQL Installation

1. **Install PostgreSQL**:
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Or use installer: https://www.postgresql.org/download/
   - During installation, remember the password you set for the `postgres` user

2. **Create database**:
   ```bash
   # Open psql (PostgreSQL command line)
   psql -U postgres

   # In psql, run:
   CREATE DATABASE mydb;
   \q
   ```

3. **Update .env file**:
   ```env
   DATABASE_URL=postgresql://postgres:your-password@localhost:5432/mydb
   ```

### Option 3: Free Cloud PostgreSQL (Render, Supabase, Railway)

#### Using Render (Free Tier):
1. Go to https://render.com
2. Sign up for free account
3. Create new PostgreSQL database
4. Copy the "Internal Database URL" or "External Database URL"
5. Update .env:
   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```

#### Using Supabase (Free Tier):
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Update .env:
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

#### Using Railway (Free Tier):
1. Go to https://railway.app
2. Create new project → Add PostgreSQL
3. Copy the DATABASE_URL from variables
4. Update .env:
   ```env
   DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   ```

## Update .env File

Edit `backend/.env`:

```env
PORT=4000
DATABASE_URL=postgresql://username:password@localhost:5432/mydb
# OR use POSTGRES_URI (both work)
# POSTGRES_URI=postgresql://username:password@localhost:5432/mydb
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Connection String Format:**
```
postgresql://[username]:[password]@[host]:[port]/[database]
```

## Testing the Connection

After updating `.env`:

```bash
cd backend
npm install  # Install new dependencies (sequelize, pg, pg-hstore)
npm run start
```

You should see:
```
✅ PostgreSQL connection established
✅ Database tables synced
✅ Database ready
🚀 Server running on http://localhost:4000
```

## Seed the Database

```bash
cd backend
npm run seed
```

This will:
- Create tables if they don't exist
- Clear existing data
- Insert sample employees and tasks

## Troubleshooting

### Error: `password authentication failed`
- **Cause**: Wrong username or password
- **Fix**: Double-check credentials in `.env`

### Error: `database "mydb" does not exist`
- **Cause**: Database not created
- **Fix**: Create database: `CREATE DATABASE mydb;`

### Error: `connection refused`
- **Cause**: PostgreSQL not running or wrong port
- **Fix**: 
  - Check if PostgreSQL is running: `docker ps` (for Docker) or check services
  - Verify port (default is 5432)

### Error: `relation "employees" does not exist`
- **Cause**: Tables not created
- **Fix**: The server will auto-create tables on first run. If not, run seed script: `npm run seed`

### Docker Container Commands

```bash
# Start container
docker start postgres-employee-task

# Stop container
docker stop postgres-employee-task

# View logs
docker logs postgres-employee-task

# Remove container (if needed)
docker rm postgres-employee-task
```

## Quick Start (Docker)

```bash
# 1. Start PostgreSQL
docker run --name postgres-employee-task \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres:15

# 2. Update .env
echo "DATABASE_URL=postgresql://admin:admin123@localhost:5432/mydb" >> backend/.env

# 3. Install dependencies
cd backend
npm install

# 4. Start server (tables will be created automatically)
npm run start

# 5. Seed data (optional)
npm run seed
```

That's it! Your backend is now using PostgreSQL! 🎉







