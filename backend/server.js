import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from "./model/routers/userRouter.js";
import productRouter from './model/routers/productRouter.js'
import data from './data.js'


dotenv.config()


const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended : true}));

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true,
});

console.log('je suis ici')
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

