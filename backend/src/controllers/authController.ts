// File: src/controllers/authController.ts

import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../database.js';
import dotenv from 'dotenv';

dotenv.config();

// Make sure you have a strong secret in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'a-default-super-secret-key-that-should-be-changed';

// =================================================================
// SIGN UP - Register a new user
// =================================================================
export const signup = async (req: Request, res: Response) => {
    const { full_name, email, password } = req.body;

    // Basic validation
    if (!full_name || !email || !password) {
        return res.status(400).json({ message: 'Please provide full name, email, and password.' });
    }

    try {
        // 1. Check if user with this email already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // 3. Save the new user to the database
        const newUserQuery = `
            INSERT INTO users (full_name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, full_name, email, is_admin, created_at;
        `;
        const newUserResult = await pool.query(newUserQuery, [full_name, email, password_hash]);
        const newUser = newUserResult.rows[0];

        // 4. Generate a JWT token for the new user
        const token = jwt.sign(
            { userId: newUser.id, isAdmin: newUser.is_admin },
            JWT_SECRET,
            { expiresIn: '1h' } // Token will expire in 1 hour
        );

        // 5. Send a success response
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
                isAdmin: newUser.is_admin,
            },
            token
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error during user registration.' });
    }
};

// =================================================================
// LOG IN - Authenticate an existing user
// =================================================================
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        // 1. Find the user by email
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            // Use a generic error for security (don't reveal if email exists)
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const user = userResult.rows[0];

        // 2. Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 3. Generate a JWT token
        const token = jwt.sign(
            { userId: user.id, isAdmin: user.is_admin },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. Send a success response
        res.status(200).json({
            message: 'Logged in successfully!',
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                isAdmin: user.is_admin,
            },
            token
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};