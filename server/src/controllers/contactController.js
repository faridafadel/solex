import { Contact } from "../models/Contact.js";

export const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    const error = new Error("name, email, and message are required.");
    error.statusCode = 400;
    throw error;
  }

  const contact = await Contact.create({ name, email, subject, message });
  res.status(201).json({ message: "Thank you for reaching out! We'll get back to you soon." });
};
