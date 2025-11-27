import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['Username, email, and password are required']
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['Password must be at least 6 characters']
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
        details: ['Email or username already registered']
      });
    }

    // Create user (password will be hashed by model hook)
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user'
    });

    // Generate token
    const token = generateToken(user.id);

    // Return user data (without password)
    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json({
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['Email and password are required']
      });
    }

    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        details: ['Invalid email or password']
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        details: ['Invalid email or password']
      });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data (without password)
    const userData = user.toJSON();
    delete userData.password;

    res.json({
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

