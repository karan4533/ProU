# Pre-Deployment Test Checklist

## ✅ Server Status
- [ ] MySQL running on port 3306
- [ ] Backend running on http://localhost:4000
- [ ] Frontend running on http://localhost:5173 or 5174

## ✅ Functionality Tests

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Logout works
- [ ] Protected routes redirect to login when not authenticated

### Employees
- [ ] View employees list
- [ ] Create new employee
- [ ] Edit employee
- [ ] Delete employee
- [ ] Search employees
- [ ] Filter by role
- [ ] Pagination works

### Tasks
- [ ] View tasks list
- [ ] Create new task
- [ ] Edit task
- [ ] Delete task
- [ ] Assign task to employee
- [ ] Change task status
- [ ] Filter by status
- [ ] Filter by assigned employee
- [ ] Sort tasks

### Dashboard
- [ ] Total employees count
- [ ] Total tasks count
- [ ] Tasks by status chart
- [ ] All metrics display correctly

### UI/UX
- [ ] Responsive design (test on mobile)
- [ ] Loading states show
- [ ] Error messages display
- [ ] Forms validate correctly
- [ ] Navigation works

## ✅ Build Test
- [ ] `npm run build` succeeds
- [ ] Production build preview works
- [ ] No console errors

## ✅ Before Pushing to GitHub
- [ ] All tests pass
- [ ] No console errors
- [ ] All features working
- [ ] README updated (if needed)
- [ ] .env files not committed (check .gitignore)

---

**Test your application at**: http://localhost:5173 (or 5174)

