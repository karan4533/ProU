# Frontend Setup Guide

## ✅ Dependencies Installed

Frontend dependencies are already installed and ready to use.

---

## 🚀 Start Frontend Server

The frontend uses **Vite**, which uses `dev` instead of `start`:

```bash
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 📋 Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🔗 Frontend-Backend Connection

The frontend is configured to connect to:
- **Backend URL**: `http://localhost:4000/api/v1`
- **Frontend URL**: `http://localhost:5173`

Make sure:
1. ✅ Backend is running on port 4000
2. ✅ Frontend is running on port 5173
3. ✅ CORS is configured in backend (already done)

---

## 🧪 Test the Application

1. **Open browser**: http://localhost:5173
2. **You should see**: Employee & Task Management System
3. **Navigate to**:
   - Dashboard - See metrics and recent tasks
   - Employees - Manage employees
   - Tasks - Manage tasks

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check backend is running: `curl http://localhost:4000/health`
- Check CORS settings in `backend/src/server.js`
- Check browser console for errors

### Port 5173 already in use
- Change port in `frontend/vite.config.js`:
  ```js
  server: {
    port: 5174  // or any other port
  }
  ```

### Dependencies missing
```bash
cd frontend
npm install
```

---

## 📁 Frontend Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx    # Dashboard with metrics
│   │   ├── Employees.jsx     # Employee management
│   │   └── Tasks.jsx         # Task management
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation
│   │   ├── EmployeeForm.jsx  # Employee form
│   │   └── TaskForm.jsx      # Task form
│   └── services/
│       └── api.js            # API client
```

---

## ✅ Quick Start Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Backend running on port 4000
- [ ] Frontend started (`npm run dev`)
- [ ] Browser opened to http://localhost:5173
- [ ] Can see Dashboard/Employees/Tasks pages

---

**You're ready to use the frontend!** 🎉

