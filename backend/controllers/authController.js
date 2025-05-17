import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Student from "../models/Student.js"; // adjust path
import Admin from "../models/Admin.js";

dotenv.config(); // Load .env variables

const SECRET_KEY = process.env.SECRET_KEY; // store this in .env in production

export const login = async (req, res) => {
  const { regno, password } = req.body;

  try {
    const user = await Student.findOne({ regno });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const adminlogin = async (req, res) => {
  const { user_id, password } = req.body;
  console.log(req.body);
  try {
    const user = await Admin.findOne({ user_id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, isAdmin: true }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
