const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURI = process.env.DB_URI;
  try {
    await mongoose.connect(dbURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database Connected");
  } catch (err) {
    console.log("Database Error: " + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
