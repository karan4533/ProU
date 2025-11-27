import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { syncDatabase } from '../src/models/index.js';
import Employee from '../src/models/Employee.js';
import Task from '../src/models/Task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const seedData = JSON.parse(
  readFileSync(join(__dirname, '../../scripts/seed_data.json'), 'utf-8')
);

async function seed() {
  try {
    // Connect and sync database
    await syncDatabase();
    console.log('✅ Connected to PostgreSQL');

    // Clear existing data
    await Task.destroy({ where: {}, truncate: true });
    await Employee.destroy({ where: {}, truncate: true });
    console.log('🗑️  Cleared existing data');

    // Seed employees
    const employees = await Employee.bulkCreate(seedData.employees);
    console.log(`✅ Created ${employees.length} employees`);

    // Seed tasks and assign some to employees
    const tasksWithAssignments = seedData.tasks.map((task, index) => {
      // Assign tasks to employees in round-robin fashion
      if (employees.length > 0 && index < employees.length) {
        return {
          ...task,
          assignedTo: employees[index].employeeId
        };
      }
      return task;
    });

    const tasks = await Task.bulkCreate(tasksWithAssignments);
    console.log(`✅ Created ${tasks.length} tasks`);

    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
