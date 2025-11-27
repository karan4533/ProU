import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import taskRoutes from './routes/tasks.js';
import { errorHandler } from './middleware/errorHandler.js';
import { syncDatabase } from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://[::1]:5173',
    'http://[::1]:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// MySQL Connection
if (!process.env.DATABASE_URL && !process.env.DB_NAME) {
  console.error('❌ MySQL connection not configured!');
  console.error('📝 Please update DATABASE_URL or DB_* variables in .env file.');
  console.error('💡 See backend/MYSQL_SETUP.md for detailed instructions.');
  console.error('⚠️  Server will start but API endpoints will not work without MySQL.');
} else {
  syncDatabase()
    .then(() => {
      console.log('✅ Database ready');
    })
    .catch((err) => {
      console.error('❌ Database connection error:', err.message);
      console.error('💡 Please check your DATABASE_URL or DB_* variables in .env file');
      console.error('⚠️  Server will start but API endpoints will not work without MySQL.');
    });
}

// Routes
app.use('/api/v1/auth', authRoutes); // Auth routes (public)
app.use('/api/v1/employees', employeeRoutes); // Protected routes
app.use('/api/v1/tasks', taskRoutes); // Protected routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
