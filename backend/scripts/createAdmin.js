import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  await connectDB();

  const email = "admin@gmail.com";
  const password = "password";
  const name = "Admin";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin user already exists");
    process.exit();
  }

  await User.create({ name, email, password, role: "admin" });
  console.log("Admin user created");
  process.exit();
};

createAdmin();
