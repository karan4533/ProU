export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error Handler:', err.name || 'Unknown Error');
  console.error('❌ Error Message:', err.message);
  console.error('❌ Error Stack:', err.stack);
  if (err.errors) {
    console.error('❌ Error Details:', err.errors);
  }

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => e.message);
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field';
    return res.status(400).json({
      error: 'Duplicate entry',
      details: `${field} already exists`
    });
  }

  // Sequelize database error
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      error: 'Database error',
      details: err.message
    });
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Foreign key constraint failed',
      details: err.message
    });
  }

  // Sequelize connection error
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      error: 'Database connection failed',
      details: 'Unable to connect to database'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
