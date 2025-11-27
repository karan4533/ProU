import { Op } from 'sequelize';
import Employee from '../models/Employee.js';
import Task from '../models/Task.js';

export const getEmployees = async (req, res, next) => {
  try {
    const { q, role, limit = 20, page = 1 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {};
    if (q) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } }
      ];
    }
    if (role) {
      where.role = role;
    }

    const { count, rows: employees } = await Employee.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      data: employees,
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

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id },
          { employeeId: req.params.id }
        ]
      }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ data: employee });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ data: employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id },
          { employeeId: req.params.id }
        ]
      }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.update(req.body);
    await employee.reload();

    res.json({ data: employee });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id },
          { employeeId: req.params.id }
        ]
      }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Set assignedTo to null for all tasks assigned to this employee
    await Task.update(
      { assignedTo: null },
      { where: { assignedTo: employee.employeeId } }
    );

    await employee.destroy();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getEmployeeTasks = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id },
          { employeeId: req.params.id }
        ]
      }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const tasks = await Task.findAll({
      where: { assignedTo: employee.employeeId },
      order: [['createdAt', 'DESC']]
    });

    res.json({ data: tasks });
  } catch (error) {
    next(error);
  }
};
