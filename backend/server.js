import path from 'path'
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
// import morgan from "morgan";

import { notFound, handleError } from "./middlewear/errorHandler.js";
dotenv.config();

connectDB();
const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("tiny"));

//cookie Parser middleware
app.use(cookieParser());

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes)



app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirName = path.resolve()
app.use('/uploads', express.static(path.join(__dirName, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  //set Static folder
  app.use(express.static(path.join(__dirName, '/frontend/dist')))

  //any route that is not api will be rediretced to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirName, 'frontend','dist', index.html))
  })
}else{
  app.get('/', (req, res)=> {
    res.send('API IS RUNNING')
  })
}




app.use(notFound);
app.use(handleError);

const port = process.env.PORT || 8000;
app.listen(port);
