import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const mongoConnection = await mongoose.connect(
      process.env.MONGO_URI as string
    );
    console.log(`MongoDB connected: ${mongoConnection.connection.host}`);
  } catch (error: any) {
    console.error(`Error connection to mongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
