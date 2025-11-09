import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js'; // Import our custom request type
import pool from '../database.js';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    // The req.user object was attached by our 'protect' middleware
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const userResult = await pool.query(
            'SELECT id, full_name, email, is_admin, created_at FROM users WHERE id = $1',
            [req.user.userId]
        );

        if (userResult.rows.length > 0) {
            res.status(200).json(userResult.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};