import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from "./model/routers/userRouter.js";
import productRouter from './model/routers/productRouter.js';
import orderRouter from "./model/routers/orderRouter.js";
import uploadRouter from "./model/routers/uploadRouter.js";


dotenv.config()


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended : true}));

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true,
});
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => { 
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

