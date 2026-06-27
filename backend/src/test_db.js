import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function check() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users in database:`);
    for (const u of users) {
      console.log(`- Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`);
      // Test password matching
      const isMemberMatch = await bcrypt.compare('member123', u.password);
      const isAdminMatch = await bcrypt.compare('admin123', u.password);
      const isViratMatch = await bcrypt.compare('virat123', u.password);
      console.log(`   Password test: 'member123' -> ${isMemberMatch}, 'admin123' -> ${isAdminMatch}, 'virat123' -> ${isViratMatch}`);
    }
  } catch (err) {
    console.error('Error checking DB:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
