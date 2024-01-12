const mongoose = require('mongoose');

async function connectDB() {
    const DB_URL = process.env.DB_URL;
  try{
    await mongoose.connect(DB_URL);
    console.log("DB connected");
  }catch(error){
    console.log("DB error",error);
  }
}

module.exports = connectDB;