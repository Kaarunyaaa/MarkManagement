import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import cors from 'cors';

//import userRoutes from './routes/userRoutes.js';

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  //to read json


// Routes
//app.use('/api/users', userRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
