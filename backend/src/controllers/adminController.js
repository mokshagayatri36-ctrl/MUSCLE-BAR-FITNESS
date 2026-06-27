import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ================= PLANS =================
export const createPlan = async (req, res) => {
  try {
    const { name, duration, price, benefits } = req.body;
    const plan = await prisma.membershipPlan.create({
      data: { name, duration, price: parseFloat(price), benefits },
    });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating membership plan', error: error.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, price, benefits } = req.body;
    const plan = await prisma.membershipPlan.update({
      where: { id },
      data: { name, duration, price: parseFloat(price), benefits },
    });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating membership plan', error: error.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.membershipPlan.delete({ where: { id } });
    res.json({ message: 'Membership plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting membership plan', error: error.message });
  }
};

// ================= TRAINER =================
export const updateTrainer = async (req, res) => {
  try {
    const trainerRecord = await prisma.trainer.findFirst();
    const { name, photo, experience, certifications, achievements } = req.body;

    let trainer;
    if (trainerRecord) {
      trainer = await prisma.trainer.update({
        where: { id: trainerRecord.id },
        data: { name, photo, experience, certifications, achievements },
      });
    } else {
      trainer = await prisma.trainer.create({
        data: { name, photo, experience, certifications, achievements },
      });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trainer details', error: error.message });
  }
};

// ================= PROGRAMS =================
export const createProgram = async (req, res) => {
  try {
    const { title, description, duration, benefits } = req.body;
    const program = await prisma.program.create({
      data: { title, description, duration, benefits },
    });
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout program', error: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, benefits } = req.body;
    const program = await prisma.program.update({
      where: { id },
      data: { title, description, duration, benefits },
    });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout program', error: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.program.delete({ where: { id } });
    res.json({ message: 'Workout program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout program', error: error.message });
  }
};

// ================= GALLERY =================
export const createGalleryItem = async (req, res) => {
  try {
    const { imageUrl, category } = req.body;
    if (!imageUrl || !category) {
      return res.status(400).json({ message: 'imageUrl and category are required' });
    }
    const item = await prisma.gallery.create({
      data: { imageUrl, category },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading gallery item', error: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.gallery.delete({ where: { id } });
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
  }
};

// ================= ENQUIRIES =================
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving enquiries', error: error.message });
  }
};

// ================= REGISTRATIONS =================
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving registrations', error: error.message });
  }
};

export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // APPROVED, REJECTED, PENDING
    const registration = await prisma.registration.update({
      where: { id },
      data: { status },
    });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: 'Error updating registration status', error: error.message });
  }
};

// ================= FEEDBACK =================
export const getFeedback = async (req, res) => {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalStatus } = req.body; // APPROVED, REJECTED, PENDING
    const feedback = await prisma.feedback.update({
      where: { id },
      data: { approvalStatus },
    });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback status', error: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.feedback.delete({ where: { id } });
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
};

// ================= PAYMENTS =================
export const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { paymentDate: 'desc' },
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payments', error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // PAID, PENDING
    const payment = await prisma.payment.update({
      where: { id },
      data: { status },
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
};

// ================= ANALYTICS =================
export const getAnalytics = async (req, res) => {
  try {
    const totalMembers = await prisma.user.count({ where: { role: 'MEMBER' } });
    const totalEnquiries = await prisma.enquiry.count();
    const totalRegistrations = await prisma.registration.count();
    const totalFeedbacks = await prisma.feedback.count();
    const totalPlans = await prisma.membershipPlan.count();

    // 1. Plan distribution counts
    const registrations = await prisma.registration.findMany({
      select: { selectedPlan: true },
    });
    const planCounts = {};
    registrations.forEach(r => {
      planCounts[r.selectedPlan] = (planCounts[r.selectedPlan] || 0) + 1;
    });
    const planDistribution = Object.keys(planCounts).map(name => ({
      name,
      value: planCounts[name],
    }));

    // 2. Payments status distribution
    const payments = await prisma.payment.findMany({
      select: { status: true, amount: true },
    });
    let paidAmount = 0;
    let pendingAmount = 0;
    let paidCount = 0;
    let pendingCount = 0;

    payments.forEach(p => {
      if (p.status === 'PAID') {
        paidAmount += p.amount;
        paidCount++;
      } else {
        pendingAmount += p.amount;
        pendingCount++;
      }
    });

    const paymentOverview = [
      { name: 'Paid', value: paidCount, amount: paidAmount },
      { name: 'Pending', value: pendingCount, amount: pendingAmount },
    ];

    // 3. Monthly trends (mock trends combined with DB creations)
    // For standard charts, we return formatted objects
    const monthlyRegistrations = [
      { month: 'Jan', count: 4 },
      { month: 'Feb', count: 6 },
      { month: 'Mar', count: 8 },
      { month: 'Apr', count: 12 },
      { month: 'May', count: 18 },
      { month: 'Jun', count: totalRegistrations || 15 },
    ];

    const monthlyEnquiries = [
      { month: 'Jan', count: 10 },
      { month: 'Feb', count: 14 },
      { month: 'Mar', count: 12 },
      { month: 'Apr', count: 22 },
      { month: 'May', count: 30 },
      { month: 'Jun', count: totalEnquiries || 25 },
    ];

    res.json({
      totalMembers,
      totalEnquiries,
      totalRegistrations,
      totalFeedbacks,
      totalPlans,
      planDistribution,
      paymentOverview,
      monthlyRegistrations,
      monthlyEnquiries,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving analytics data', error: error.message });
  }
};
