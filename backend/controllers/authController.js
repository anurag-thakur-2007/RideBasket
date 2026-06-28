import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ======================================
// Register User
// ======================================

export const registerUser = async (req, res) => {
  try {
    const { name, phone, gender, password } = req.body;

    // Validate required fields
    if (!name || !phone || !gender || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check if phone number already exists
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Phone number is already registered.",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      phone,
      gender,
      passwordHash,
    });

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Login User
// ======================================

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and Password are required.",
      });
    }

    // Find user
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Success response
    res.status(200).json({
      success: true,
      message: "Login Successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};