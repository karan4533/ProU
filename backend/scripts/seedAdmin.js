import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { syncDatabase } from '../src/models/index.js';
import User from '../src/models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

async function seedAdmin() {
  try {
    // Connect and sync database
    await syncDatabase();
    console.log('✅ Connected to MySQL');

    // Check if admin user exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@example.com' } });

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Default Admin Credentials:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');
    console.log('\n⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

seedAdmin();

