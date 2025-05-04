import mongoose from "mongoose";

const uri: string =
  "mongodb+srv://jayaraje:kjYt9tETM8vxCuQt@cluster0.x2eotej.mongodb.net/cb-2" as string;
let isConnected: boolean = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // Connect to the database
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  isConnected = true;
}
