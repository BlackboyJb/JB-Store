import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import user from "./data/users.js";
import products from "./data/products.js";
import userModel from "./models/userModels.js";
import productModel from "./models/productModels.js";
import orderModel from "./models/orderModels.js";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await orderModel.deleteMany();

    const createdUsers = await userModel.insertMany(user);
    const adminUsers = createdUsers[0]._id;

    const sampleProducts = products.map((item) => {
      return { ...item, user: adminUsers };
    });

    await productModel.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

 const destroyData = async () => {
  try {
     await userModel.deleteMany();
    await productModel.deleteMany();
   await orderModel.deleteMany();

  console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
   console.log(`${error}`.red.inverse);
   process.exit(1);
  }
}


if (process.env[1]) {
  destroyData()
} else {
  importData()
}


