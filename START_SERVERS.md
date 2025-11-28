# How to Start Both Servers

## Quick Start

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## Option 2: Using npm scripts (if configured)

If you have a root `package.json` with scripts, you can run:
```bash
npm run dev:backend  # in one terminal
npm run dev:frontend # in another terminal
```

---

## What You Should See

### Backend (Terminal 1)
```
🚀 Server running on http://localhost:4000
✅ Database ready
```

### Frontend (Terminal 2)
```
  VITE v6.4.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

---

## Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify `.env` file exists in `backend/` folder
- Check database credentials in `.env`

### Frontend won't start
- Make sure backend is running first
- Check if port 5173 is available
- Verify `VITE_API_URL` in frontend `.env` (optional)

### Database connection error
- Make sure MySQL is running
- Check database credentials in `backend/.env`
- Verify database exists

---

## Stop Servers

Press `Ctrl + C` in each terminal to stop the servers.


