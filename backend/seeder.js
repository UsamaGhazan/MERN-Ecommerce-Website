import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './Models/UserModel.js';
import Product from './Models/ProductModel.js';
import Order from './Models/OrderModel.js';
import connectDb from './config/db.js';
//This file is separate from server
dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany(); //will delete everything
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; //id from first item of Users data

    const sampleProducts = products.map((products) => {
      return { ...products, user: adminUser }; //addition of user in products
    });

    await Product.insertMany(sampleProducts);
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  //becareful with it... might delete this function later
  try {
    await Order.deleteMany(); //will delete everything
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
