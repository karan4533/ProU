import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
  getTasksByPriority,
  getEmployeeWorkload
} from '../controllers/taskController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Metrics endpoints - must be before /:id route
router.get('/metrics/tasks-by-status', getTasksByStatus);
router.get('/metrics/tasks-by-priority', getTasksByPriority);
router.get('/metrics/employee-workload', getEmployeeWorkload);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;

