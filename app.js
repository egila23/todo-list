import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import tasks from './routes/tasks.js';
import user from './routes/user.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
connectDB();

app.use(express.json());

// Routes
app.use('/tasks', tasks);
app.use('/user',user);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

export default app;