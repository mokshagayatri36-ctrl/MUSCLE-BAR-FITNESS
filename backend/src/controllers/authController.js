import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'muscle-bar-fitness-centre-secret-key-2026';

export const register = async (req, res) => {
  try {
    const { name, email, password, gender, age, phone, address, selectedPlan } = req.body;

    if (!name || !email || !password || !gender || !age || !phone || !address || !selectedPlan) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create member user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'MEMBER',
      },
    });

    // Create Registration details
    await prisma.registration.create({
      data: {
        name,
        gender,
        age: parseInt(age),
        phone,
        email,
        address,
        selectedPlan,
        status: 'PENDING',
      },
    });

    // Lookup plan price for payment recording
    const plan = await prisma.membershipPlan.findFirst({
      where: { name: selectedPlan },
    });
    const amount = plan ? plan.price : 0;

    // Create Payment tracking entry
    await prisma.payment.create({
      data: {
        memberName: name,
        memberEmail: email,
        plan: selectedPlan,
        amount,
        status: 'PENDING',
        transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        paymentDate: new Date(),
      },
    });

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful! Wait for admin approval.',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { name: email },
        ]
      }
    });

    if (!user) {
      // Fallback: search in memory by stripping spaces and comparing case-insensitively
      const allUsers = await prisma.user.findMany();
      const cleanInput = email.replace(/\s+/g, '').toLowerCase();
      user = allUsers.find(u => {
        const cleanName = u.name.replace(/\s+/g, '').toLowerCase();
        const cleanEmail = u.email.replace(/\s+/g, '').toLowerCase();
        return cleanName === cleanInput || 
               cleanEmail === cleanInput || 
               cleanName.includes(cleanInput) || 
               cleanEmail.includes(cleanInput) ||
               cleanInput.includes(cleanName) ||
               cleanInput.includes(cleanEmail);
      });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'ADMIN') {
      return res.json({ user });
    }

    // For Members, load registration details, payments, and standard programs
    const registration = await prisma.registration.findFirst({
      where: { email: user.email },
      orderBy: { createdAt: 'desc' },
    });

    const payments = await prisma.payment.findMany({
      where: { memberName: user.name },
      orderBy: { paymentDate: 'desc' },
    });

    // Default member programs
    const programs = await prisma.program.findMany();

    res.json({
      user,
      registration,
      payments,
      programs,
    });
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
};
