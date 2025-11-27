import { Op } from 'sequelize';
import { literal } from 'sequelize';
import Task from '../models/Task.js';

export const getTasks = async (req, res, next) => {
  try {
    const { status, assignedTo, sort = 'createdAt:desc', limit = 20, page = 1 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {};
    if (status) {
      where.status = status;
    }
    if (assignedTo) {
      where.assignedTo = assignedTo;
    }

    // Parse sort
    const [sortField, sortOrder] = sort.split(':');
    const order = [[sortField, sortOrder === 'asc' ? 'ASC' : 'DESC']];

    const { count, rows: tasks } = await Task.findAndCountAll({
      where,
      order,
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      data: tasks,
      meta: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id },
          { taskId: req.params.id }
        ]
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id },
          { taskId: req.params.id }
        ]
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.update(req.body);
    await task.reload();

    res.json({ data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id },
          { taskId: req.params.id }
        ]
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getTasksByStatus = async (req, res, next) => {
  try {
    const stats = await Task.findAll({
      attributes: [
        'status',
        [literal('COUNT(*)'), 'count']
      ],
      group: ['status'],
      raw: true
    });

    const result = {
      todo: 0,
      'in-progress': 0,
      completed: 0
    };

    // Get counts using Sequelize count
    const [todoCount, inProgressCount, completedCount] = await Promise.all([
      Task.count({ where: { status: 'todo' } }),
      Task.count({ where: { status: 'in-progress' } }),
      Task.count({ where: { status: 'completed' } })
    ]);

    result.todo = todoCount;
    result['in-progress'] = inProgressCount;
    result.completed = completedCount;

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};
