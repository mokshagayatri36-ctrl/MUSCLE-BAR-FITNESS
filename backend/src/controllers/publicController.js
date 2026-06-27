import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ================= PLANS =================
export const getPlans = async (req, res) => {
  try {
    const plans = await prisma.membershipPlan.findMany();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving plans', error: error.message });
  }
};

// ================= TRAINER =================
export const getTrainer = async (req, res) => {
  try {
    const trainer = await prisma.trainer.findFirst();
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer profile not found' });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving trainer profile', error: error.message });
  }
};

// ================= PROGRAMS =================
export const getPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout programs', error: error.message });
  }
};

// ================= GALLERY =================
export const getGalleryItems = async (req, res) => {
  try {
    const items = await prisma.gallery.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gallery items', error: error.message });
  }
};

// ================= ENQUIRIES =================
export const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, plan, message } = req.body;
    if (!name || !phone || !email || !plan || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const enquiry = await prisma.enquiry.create({
      data: { name, phone, email, plan, message },
    });
    res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting enquiry', error: error.message });
  }
};

// ================= FEEDBACK =================
export const createFeedback = async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    if (!name || !rating || !review) {
      return res.status(400).json({ message: 'Name, rating and review are required' });
    }
    const feedback = await prisma.feedback.create({
      data: {
        name,
        rating: parseInt(rating),
        review,
        approvalStatus: 'PENDING', // Needs admin approval to go public
      },
    });
    res.status(201).json({ message: 'Feedback submitted and pending review.', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

export const getApprovedFeedback = async (req, res) => {
  try {
    const items = await prisma.feedback.findMany({
      where: { approvalStatus: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving testimonials', error: error.message });
  }
};
