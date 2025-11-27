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

// Middleware - CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://[::1]:5173',
      'http://[::1]:5174'
    ];

// Add Vercel preview and production URLs if CORS_ORIGIN is set
if (process.env.CORS_ORIGIN) {
  const vercelUrl = process.env.CORS_ORIGIN.split(',')[0].trim();
  if (vercelUrl.includes('vercel.app')) {
    // Add wildcard for Vercel preview deployments
    allowedOrigins.push('https://*.vercel.app');
  }
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        // Handle wildcard domains (e.g., *.vercel.app)
        const pattern = allowed.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowed === origin;
    })) {
      callback(null, true);
    } else {
      // In development, allow localhost
      if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
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
