import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorHandlerMiddleware.js';

dotenv.config();

connectDB();

const app = express();

//for running only in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Api is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
//For Paypal
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
//making uploads folder static for uploading on browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
