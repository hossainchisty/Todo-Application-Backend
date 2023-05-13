// Database Lib Import
const mongoose = require("mongoose");

/**
 * @desc Mongo DB Database Connection
 * @protected True
 * @abstract Connection mongodb atlas database
 **/ 
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;