import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Import our middleware
import { getUserProfile } from '../controllers/userController.js'; // We will create this controller next

const router = Router();

// Any request to this route must first pass through the 'protect' middleware
router.get('/profile', protect, getUserProfile);

export default router;