import mongoose from "mongoose";

export const connectDatabase = async (mongoUri) => {
  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(
    `MongoDB connected: ${connection.connection.name} at ${connection.connection.host}`
  );
};
