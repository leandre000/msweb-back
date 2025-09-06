import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import userRoutes from "./routes/user";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/defaultDB';

// Routes (dynamic base from env)
const API_BASE = process.env.API_BASE || "/api";
app.use(`${API_BASE}/users`, userRoutes); 

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}${API_BASE}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
