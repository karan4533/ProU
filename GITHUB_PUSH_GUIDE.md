# Push to GitHub - Step by Step

## Step 1: Initialize Git (if not done)

```bash
cd P:\proU
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Make Initial Commit

```bash
git commit -m "Initial commit: Full-stack Employee & Task Management System with Authentication

- React frontend with Dashboard, Employees, and Tasks pages
- Node.js/Express backend with MySQL database
- JWT authentication (login/register)
- RESTful API with CRUD operations
- Responsive UI with TailwindCSS
- Search, filter, and pagination features"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository" (or "+" → "New repository")
3. Repository name: `employee-task-management` (or your choice)
4. Description: "Full-stack Employee & Task Management System - ProU Assessment"
5. **IMPORTANT**: Make it **PUBLIC** (required for submission)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

## Step 5: Connect and Push

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 6: Verify

1. Go to your GitHub repository
2. Check all files are uploaded
3. Verify README.md displays correctly
4. Make sure repository is **PUBLIC**

---

## Quick Commands (Copy & Paste)

```bash
cd P:\proU
git init
git add .
git commit -m "Initial commit: Full-stack Employee & Task Management System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

**Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub details!**

