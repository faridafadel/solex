import { User } from "../models/User.js";
import { createToken } from "../utils/createToken.js";

const formatAuthResponse = (user) => ({
  token: createToken(user._id),
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || "",
  },
});

export const registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword, phone } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    const error = new Error("All fields are required.");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error("Password must be at least 8 characters.");
    error.statusCode = 400;
    throw error;
  }

  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match.");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    const error = new Error("An account with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
    phone: phone || "",
  });

  res.status(201).json(formatAuthResponse(user));
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  res.json(formatAuthResponse(user));
};

export const getCurrentUser = async (req, res) => {
  res.json({
    user: req.user,
  });
};

export const updateProfile = async (req, res) => {
  const { fullName, email, phone, currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (fullName !== undefined) user.fullName = fullName;
  if (email !== undefined) user.email = email.toLowerCase();
  if (phone !== undefined) user.phone = phone;

  if (newPassword) {
    if (!currentPassword) {
      const error = new Error("Current password is required to set a new password.");
      error.statusCode = 400;
      throw error;
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      const error = new Error("Current password is incorrect.");
      error.statusCode = 401;
      throw error;
    }

    if (newPassword.length < 8) {
      const error = new Error("New password must be at least 8 characters.");
      error.statusCode = 400;
      throw error;
    }

    user.password = newPassword;
  }

  await user.save();

  res.json({
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    },
  });
};
