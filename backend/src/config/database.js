import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Debug: Log connection parameters (without password)
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 Database Config:');
  console.log('  Host:', process.env.DB_HOST || 'localhost');
  console.log('  Port:', process.env.DB_PORT || 3306);
  console.log('  Database:', process.env.DB_NAME || 'mydb');
  console.log('  User:', process.env.DB_USER || 'root');
  console.log('  Password:', process.env.DB_PASSWORD ? '***SET***' : 'NOT SET');
}

// Parse DATABASE_URL or use individual connection parameters
let sequelize;

// Check if using Aiven (requires SSL)
const isAiven = process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com');
const isAivenSSLPort = process.env.DB_PORT && parseInt(process.env.DB_PORT) === 25060;

const commonOptions = {
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    connectTimeout: 60000,
    // SSL configuration for Aiven MySQL (required for port 25060)
    ssl: (isAiven || isAivenSSLPort) ? {
      rejectUnauthorized: false,
      require: true
    } : undefined,
    // Remove authPlugins - let Sequelize handle authentication naturally
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  retry: {
    max: 3
  }
};

// Always use individual parameters for better reliability
if (process.env.DB_HOST && process.env.DB_USER) {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'mydb',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      ...commonOptions
    }
  );
} else if (process.env.DATABASE_URL) {
  // Fallback to DATABASE_URL if individual params not set
  sequelize = new Sequelize(process.env.DATABASE_URL, commonOptions);
} else {
  // Default fallback
  sequelize = new Sequelize(
    'mydb',
    'admin',
    'admin123',
    {
      host: 'localhost',
      port: 3306,
      ...commonOptions
    }
  );
}

export default sequelize;
