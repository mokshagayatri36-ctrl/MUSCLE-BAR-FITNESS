import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing data
  await prisma.payment.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.program.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);
  const memberPassword = await bcrypt.hash('member123', salt);

  const admin = await prisma.user.create({
    data: {
      name: 'Aluri Sandilya',
      email: 'admin@musclebar.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const member = await prisma.user.create({
    data: {
      name: 'Karthik Rao',
      email: 'member@musclebar.com',
      password: memberPassword,
      role: 'MEMBER',
    },
  });

  const member1Password = await bcrypt.hash('virat123', salt);
  await prisma.user.create({
    data: {
      name: 'Virat Kohli',
      email: 'virat@gmail.com',
      password: member1Password,
      role: 'MEMBER',
    },
  });

  const member2Password = await bcrypt.hash('deepika123', salt);
  await prisma.user.create({
    data: {
      name: 'Deepika Padukone',
      email: 'deepika@gmail.com',
      password: member2Password,
      role: 'MEMBER',
    },
  });

  const member3Password = await bcrypt.hash('dhoni123', salt);
  await prisma.user.create({
    data: {
      name: 'MS Dhoni',
      email: 'dhoni@gmail.com',
      password: member3Password,
      role: 'MEMBER',
    },
  });

  const member4Password = await bcrypt.hash('sindhu123', salt);
  await prisma.user.create({
    data: {
      name: 'PV Sindhu',
      email: 'sindhu@gmail.com',
      password: member4Password,
      role: 'MEMBER',
    },
  });

  const member5Password = await bcrypt.hash('allu123', salt);
  await prisma.user.create({
    data: {
      name: 'Allu Arjun',
      email: 'alluarjun@gmail.com',
      password: member5Password,
      role: 'MEMBER',
    },
  });

  console.log('Users seeded:', { admin: admin.email, member: member.email, count: 6 });

  // 3. Create Membership Plans
  const plans = [
    {
      name: 'Monthly Plan',
      duration: '1 Month',
      price: 2499,
      benefits: 'Access to Gym Cardio & Strength Area\n1 General Fitness Assessment\nFree Locker Access\nGym floor guidance',
    },
    {
      name: 'Quarterly Plan',
      duration: '3 Months',
      price: 6499,
      benefits: 'Access to Gym Cardio & Strength Area\n2 General Fitness Assessments\nFree Locker Access\n1 Free Personal Trainer Session\nCustomized basic diet plan',
    },
    {
      name: 'Half-Yearly Plan',
      duration: '6 Months',
      price: 11999,
      benefits: 'Full Access to Gym Facilities\nBi-monthly Fitness Assessment\nLocker & Steam Room Access\n3 Free Personal Training Sessions\nComplete customized nutrition guidelines',
    },
    {
      name: 'Yearly Plan',
      duration: '12 Months',
      price: 19999,
      benefits: 'Unlimited Access to Gym Cardio, Strength & Steam\nMonthly Advanced Body Assessment\nReserved Locker Access\n5 Free Personal Training Sessions\nFull customized diet & supplement consultation\n1 Free Gym T-Shirt',
    },
  ];

  for (const plan of plans) {
    await prisma.membershipPlan.create({ data: plan });
  }
  console.log('Membership plans seeded');

  // 4. Create Trainer
  await prisma.trainer.create({
    data: {
      name: 'Aluri Sandilya',
      photo: '/trainer.jpg',
      experience: '8+ Years of Professional Coaching Experience',
      certifications: 'ISSA Certified Personal Trainer (CPT)\nISSA Sports Nutrition Specialist\nCPR/AED Certified First Responder\nAdvanced Strength and Conditioning Specialist',
      achievements: 'Represented state-level bodybuilding championships\nSuccessfully transformed over 500+ clients locally and online\nFounder and Chief Trainer at Muscle Bar Fitness Centre',
    },
  });
  console.log('Trainer details seeded');

  // 5. Create Programs
  const programs = [
    {
      title: 'Weight Loss Program',
      description: 'A scientifically structured high-intensity program designed to burn fat rapidly while building muscle definition. Focuses on HIIT, caloric deficit guidance, and high-energy conditioning.',
      duration: '12 Weeks',
      benefits: 'Fat loss and core strengthening\nCardiovascular endurance improvement\nCustomized nutrition deficit plans\nWeekly body fat percentage tracking',
    },
    {
      title: 'Muscle Gain Program',
      description: 'Hypertrophy focused program using progressive overload, compound lifts, and targeted isolation routines to maximize lean muscle mass and volume growth.',
      duration: '16 Weeks',
      benefits: 'Significant increase in muscle mass\nStrength improvement on compound lifts\nHigh protein meal plans & supplement advice\nForm and technique correction tutorials',
    },
    {
      title: 'Strength Training Program',
      description: 'Powerlifting and functional strength base program designed to push your physical limits. Focusing on squat, bench press, deadlift, and military press.',
      duration: '8 Weeks',
      benefits: 'Increases raw physical strength & bone density\nImprovement in core power and stability\nNeuromuscular adaptation training\nSafety spotter and lift-off guidance',
    },
    {
      title: 'General Fitness Program',
      description: 'A balanced routine for beginners and professionals alike to maintain healthy heart rate, muscle tone, flexibility, and overall standard wellness.',
      duration: 'Ongoing',
      benefits: 'Improves daily energy levels and posture\nMaintains cardiovascular health\nFlexible timing and customizable exercises\nSocial and active environment',
    },
  ];

  for (const prog of programs) {
    await prisma.program.create({ data: prog });
  }
  console.log('Workout programs seeded');

  // 6. Create Gallery Images
  const galleryItems = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
      category: 'Gym Interior',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop',
      category: 'Gym Interior',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
      category: 'Equipment',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=800&auto=format&fit=crop',
      category: 'Equipment',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
      category: 'Equipment',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop',
      category: 'Equipment',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
      category: 'Workout Sessions',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop',
      category: 'Workout Sessions',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
      category: 'Workout Sessions',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800&auto=format&fit=crop',
      category: 'Transformations',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
      category: 'Transformations',
    },
  ];

  for (const item of galleryItems) {
    await prisma.gallery.create({ data: item });
  }
  console.log('Gallery seeded');

  // 7. Create Feedback
  const feedbacks = [
    {
      name: 'Rohan Sharma',
      rating: 5,
      review: 'Muscle Bar Fitness Centre is by far the best gym in the area. Sandilya is extremely knowledgeable and helped me fix my deadlift form. The community vibe is amazing!',
      approvalStatus: 'APPROVED',
    },
    {
      name: 'Priya Patel',
      rating: 5,
      review: 'I joined the Weight Loss Program and lost 8kg in 12 weeks. The diet plan was realistic and easy to follow. Highly recommend this gym to anyone looking for genuine results.',
      approvalStatus: 'APPROVED',
    },
    {
      name: 'Venkat Reddy',
      rating: 4,
      review: 'Very neat gym, well-maintained equipment. Sandilya is always there to guide us on the floor.',
      approvalStatus: 'APPROVED',
    },
    {
      name: 'Suresh Kumar',
      rating: 5,
      review: 'Nice place to work out. Good crowd and professional environment.',
      approvalStatus: 'PENDING',
    },
  ];

  for (const fb of feedbacks) {
    await prisma.feedback.create({ data: fb });
  }
  console.log('Feedback seeded');

  // 8. Create Enquiries
  const enquiries = [
    {
      name: 'Mahesh Babu',
      phone: '+91 98765 43210',
      email: 'mahesh@gmail.com',
      plan: 'Yearly Plan',
      message: 'Hi, I want to know if EMI option is available for the annual membership plan.',
    },
    {
      name: 'Sneha Reddy',
      phone: '+91 88765 43210',
      email: 'sneha@gmail.com',
      plan: 'Quarterly Plan',
      message: 'Do you offer personal training packages along with the quarterly membership?',
    },
    {
      name: 'Virat Kohli',
      phone: '+91 98888 77777',
      email: 'virat@gmail.com',
      plan: 'Yearly Plan',
      message: 'Is there a custom diet and supplement guidance session scheduled weekly with Aluri Sandilya?',
    },
    {
      name: 'Deepika Padukone',
      phone: '+91 97777 66666',
      email: 'deepika@gmail.com',
      plan: 'Half-Yearly Plan',
      message: 'Do you offer slot bookings for steam room access, or is it walk-in?',
    },
    {
      name: 'MS Dhoni',
      phone: '+91 96666 55555',
      email: 'dhoni@gmail.com',
      plan: 'Yearly Plan',
      message: 'Are powerlifting squat racks available during peak hours (6 AM to 8 AM)?',
    },
    {
      name: 'PV Sindhu',
      phone: '+91 95555 44444',
      email: 'sindhu@gmail.com',
      plan: 'Quarterly Plan',
      message: 'Can I pause my quarterly membership for 2 weeks if I am traveling for matches?',
    },
    {
      name: 'Allu Arjun',
      phone: '+91 94444 33333',
      email: 'alluarjun@gmail.com',
      plan: 'Monthly Plan',
      message: 'Do you accept international credit card payments for membership enrollment?',
    },
  ];

  for (const enq of enquiries) {
    await prisma.enquiry.create({ data: enq });
  }
  console.log('Enquiries seeded');

  // 9. Create Registrations
  const registrations = [
    {
      name: 'Karthik Rao',
      gender: 'Male',
      age: 26,
      phone: '+91 77765 43210',
      email: 'member@musclebar.com',
      address: 'Madhapur, Hyderabad, Telangana',
      selectedPlan: 'Quarterly Plan',
      status: 'APPROVED',
    },
    {
      name: 'Anjali Sharma',
      gender: 'Female',
      age: 23,
      phone: '+91 66765 43210',
      email: 'anjali@gmail.com',
      address: 'Kondapur, Hyderabad, Telangana',
      selectedPlan: 'Monthly Plan',
      status: 'PENDING',
    },
    {
      name: 'Virat Kohli',
      gender: 'Male',
      age: 35,
      phone: '+91 98888 77777',
      email: 'virat@gmail.com',
      address: 'Jubilee Hills, Hyderabad, Telangana',
      selectedPlan: 'Yearly Plan',
      status: 'APPROVED',
    },
    {
      name: 'Deepika Padukone',
      gender: 'Female',
      age: 38,
      phone: '+91 97777 66666',
      email: 'deepika@gmail.com',
      address: 'Bandra, Mumbai, Maharashtra',
      selectedPlan: 'Half-Yearly Plan',
      status: 'APPROVED',
    },
    {
      name: 'MS Dhoni',
      gender: 'Male',
      age: 42,
      phone: '+91 96666 55555',
      email: 'dhoni@gmail.com',
      address: 'Ranchi, Jharkhand',
      selectedPlan: 'Yearly Plan',
      status: 'APPROVED',
    },
    {
      name: 'PV Sindhu',
      gender: 'Female',
      age: 28,
      phone: '+91 95555 44444',
      email: 'sindhu@gmail.com',
      address: 'Gachibowli, Hyderabad, Telangana',
      selectedPlan: 'Quarterly Plan',
      status: 'PENDING',
    },
    {
      name: 'Allu Arjun',
      gender: 'Male',
      age: 41,
      phone: '+91 94444 33333',
      email: 'alluarjun@gmail.com',
      address: 'Film Nagar, Hyderabad, Telangana',
      selectedPlan: 'Monthly Plan',
      status: 'PENDING',
    },
  ];

  for (const reg of registrations) {
    await prisma.registration.create({ data: reg });
  }
  console.log('Registrations seeded');

  // 10. Create Payments
  const payments = [
    {
      memberName: 'Karthik Rao',
      memberEmail: 'member@musclebar.com',
      plan: 'Quarterly Plan',
      amount: 6499,
      status: 'PAID',
      transactionId: 'TXN-MBF-001',
      paymentDate: new Date(),
    },
    {
      memberName: 'Anjali Sharma',
      memberEmail: 'anjali@gmail.com',
      plan: 'Monthly Plan',
      amount: 2499,
      status: 'PENDING',
      transactionId: 'TXN-MBF-002',
      paymentDate: new Date(),
    },
    {
      memberName: 'Virat Kohli',
      memberEmail: 'virat@gmail.com',
      plan: 'Yearly Plan',
      amount: 19999,
      status: 'PAID',
      transactionId: 'TXN-MBF-003',
      paymentDate: new Date(),
    },
    {
      memberName: 'Deepika Padukone',
      memberEmail: 'deepika@gmail.com',
      plan: 'Half-Yearly Plan',
      amount: 11999,
      status: 'PAID',
      transactionId: 'TXN-MBF-004',
      paymentDate: new Date(),
    },
    {
      memberName: 'MS Dhoni',
      memberEmail: 'dhoni@gmail.com',
      plan: 'Yearly Plan',
      amount: 19999,
      status: 'PAID',
      transactionId: 'TXN-MBF-005',
      paymentDate: new Date(),
    },
    {
      memberName: 'PV Sindhu',
      memberEmail: 'sindhu@gmail.com',
      plan: 'Quarterly Plan',
      amount: 6499,
      status: 'PENDING',
      transactionId: 'TXN-MBF-006',
      paymentDate: new Date(),
    },
    {
      memberName: 'Allu Arjun',
      memberEmail: 'alluarjun@gmail.com',
      plan: 'Monthly Plan',
      amount: 2499,
      status: 'PENDING',
      transactionId: 'TXN-MBF-007',
      paymentDate: new Date(),
    },
  ];

  for (const pay of payments) {
    await prisma.payment.create({ data: pay });
  }
  console.log('Payments seeded');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
