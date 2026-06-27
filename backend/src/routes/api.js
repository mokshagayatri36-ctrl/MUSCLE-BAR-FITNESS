import express from 'express';
import * as authController from '../controllers/authController.js';
import * as adminController from '../controllers/adminController.js';
import * as publicController from '../controllers/publicController.js';
import { authenticateToken, requireAdmin, requireMember } from '../middleware/auth.js';

const router = express.Router();

// ================= PUBLIC ROUTES =================
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get('/plans', publicController.getPlans);
router.get('/trainer', publicController.getTrainer);
router.get('/programs', publicController.getPrograms);
router.get('/gallery', publicController.getGalleryItems);
router.post('/enquiries', publicController.createEnquiry);
router.post('/feedback', publicController.createFeedback);
router.get('/feedback/approved', publicController.getApprovedFeedback);

// ================= MEMBER/AUTHENTICATED PORTAL ROUTES =================
router.get('/auth/me', authenticateToken, authController.getMe);

// ================= ADMIN PORTAL ROUTES =================
// Plans Management
router.post('/plans', authenticateToken, requireAdmin, adminController.createPlan);
router.put('/plans/:id', authenticateToken, requireAdmin, adminController.updatePlan);
router.delete('/plans/:id', authenticateToken, requireAdmin, adminController.deletePlan);

// Trainer Management
router.put('/trainer', authenticateToken, requireAdmin, adminController.updateTrainer);

// Program Management
router.post('/programs', authenticateToken, requireAdmin, adminController.createProgram);
router.put('/programs/:id', authenticateToken, requireAdmin, adminController.updateProgram);
router.delete('/programs/:id', authenticateToken, requireAdmin, adminController.deleteProgram);

// Gallery Management
router.post('/gallery', authenticateToken, requireAdmin, adminController.createGalleryItem);
router.delete('/gallery/:id', authenticateToken, requireAdmin, adminController.deleteGalleryItem);

// Feedback Management
router.get('/feedback', authenticateToken, requireAdmin, adminController.getFeedback);
router.put('/feedback/:id/status', authenticateToken, requireAdmin, adminController.updateFeedbackStatus);
router.delete('/feedback/:id', authenticateToken, requireAdmin, adminController.deleteFeedback);

// Enquiry Management
router.get('/enquiries', authenticateToken, requireAdmin, adminController.getEnquiries);

// Registration Management
router.get('/registrations', authenticateToken, requireAdmin, adminController.getRegistrations);
router.put('/registrations/:id/status', authenticateToken, requireAdmin, adminController.updateRegistrationStatus);

// Payment Management
router.get('/payments', authenticateToken, requireAdmin, adminController.getPayments);
router.put('/payments/:id/status', authenticateToken, requireAdmin, adminController.updatePaymentStatus);

// Analytics
router.get('/analytics', authenticateToken, requireAdmin, adminController.getAnalytics);

export default router;
