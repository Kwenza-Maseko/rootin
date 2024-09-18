import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "RootIn",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions); 

    isConnected = true;
    console.log("MongoDB is Connected");

  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
