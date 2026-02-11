const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || "mongodb+srv://sukhvinder_2324:Manshu@cluster0.xef28.mongodb.net/shrimp?retryWrites=true&w=majority";
    
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("Connected to database successfully!");
    return mongoose.connection;
  } catch (err) {
    console.error("Database connection failed!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
