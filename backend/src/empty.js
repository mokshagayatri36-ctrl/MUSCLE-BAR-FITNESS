import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Emptying all database tables...');
  
  await prisma.payment.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.program.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('All database tables emptied successfully!');
}

main()
  .catch((e) => {
    console.error('Error emptying database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
