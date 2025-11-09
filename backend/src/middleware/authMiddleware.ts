// File: src/middleware/authMiddleware.ts

import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'a-default-super-secret-key-that-should-be-changed';

interface DecodedToken extends JwtPayload {
    userId: number;
    isAdmin: boolean;
}

export interface AuthRequest extends Request {
    user?: { userId: number; isAdmin: boolean };
}

function isDecodedToken(obj: any): obj is DecodedToken {
    return obj && typeof obj.userId === 'number' && typeof obj.isAdmin === 'boolean';
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Get the token from the header
            const token = authHeader.split(' ')[1];

            // *** THIS IS THE CRUCIAL FIX ***
            // Check if the token actually exists after the split
            if (token) {
                // Now TypeScript knows 'token' is a string, so this call is safe.
                const decoded = jwt.verify(token, JWT_SECRET);

                if (isDecodedToken(decoded)) {
                    req.user = {
                        userId: decoded.userId,
                        isAdmin: decoded.isAdmin
                    };
                    next(); // Proceed to the next function (the controller)
                    return; // Stop execution of this middleware
                } else {
                    // Token is valid but doesn't have the expected content
                    throw new Error('Invalid token payload');
                }
            }
        }
        
        // If we get here, it means no valid token was found.
        // This covers cases where there is no header, it doesn't start with 'Bearer ',
        // or there's no token after 'Bearer '.
        return res.status(401).json({ message: 'Not authorized, no or invalid token provided' });

    } catch (error) {
        // This will catch JWT errors (expired, malformed, etc.) or our thrown error
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};