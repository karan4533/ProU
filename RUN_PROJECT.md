# 🚀 Running the Project

## ✅ Status

- ✅ MySQL is running
- ✅ Admin user created
- ✅ Backend server starting...
- ✅ Frontend server starting...

---

## 📋 Quick Start

### Backend Server
**URL**: http://localhost:4000

**Status**: Starting in background

**Check if running:**
```bash
curl http://localhost:4000/health
```

### Frontend Server
**URL**: http://localhost:5173

**Status**: Starting in background

**Open in browser**: http://localhost:5173

---

## 🔐 Login Credentials

**Default Admin Account:**
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 📝 Steps to Use

1. **Wait 10-15 seconds** for both servers to start

2. **Open browser**: http://localhost:5173

3. **You'll see the login page** (authentication is required)

4. **Login with admin credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

5. **Or create a new account** by clicking "Sign up"

6. **After login**, you'll be redirected to the Dashboard

---

## 🧪 Test the Application

### After Login:

1. **Dashboard** - View metrics and recent tasks
2. **Employees** - Create, view, edit, delete employees
3. **Tasks** - Create, view, edit, delete tasks
4. **Search & Filter** - Test search and filter features

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
cd backend
npm run start
```

### Frontend not starting?
```bash
cd frontend
npm run dev
```

### Can't login?
- Make sure backend is running on port 4000
- Check browser console for errors
- Try creating a new account

### MySQL connection error?
```bash
docker start mysql-employee-task
```

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:4000
- [ ] Frontend running on http://localhost:5173
- [ ] Can access login page
- [ ] Can login with admin credentials
- [ ] Can access Dashboard after login
- [ ] Can create employees
- [ ] Can create tasks

---

## 🎉 You're All Set!

Both servers are starting. Wait a few seconds, then:
1. Open http://localhost:5173
2. Login with admin credentials
3. Start using the application!

**Happy coding!** 🚀

