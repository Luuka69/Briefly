import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js'; // <-- ADD .js EXTENSION
import userRoutes from './routes/userRoutes.js'; // <-- IMPORT USER ROUTES

const app = express();
const port = process.env.PORT ?? 4000;


// Middleware
app.use(cors()); // Use CORS middleware
app.use(express.json()); // To parse JSON bodies in requests

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Briefly Backend API is running!');
});

// Use authentication routes
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with /api/auth
app.use('/api/users',userRoutes)
app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});