import sequelize from '../config/database.js';
import Employee from './Employee.js';
import Task from './Task.js';
import User from './User.js';

// Initialize models
const models = {
  Employee,
  Task,
  User,
  sequelize
};

// Sync database (creates tables if they don't exist)
export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established');
    
    // Sync models (create tables)
    await sequelize.sync({ alter: false }); // Use { force: true } to drop and recreate tables
    console.log('✅ Database tables synced');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    throw error;
  }
};

export default models;







