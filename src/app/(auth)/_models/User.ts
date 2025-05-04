import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
  status: string;
  createdAt: Date;
}
const userSchema = new Schema<IUser>(
  {
    email: String,
    id: String,
    displayName: String,
    photoURL: String,
    createdAt: { type: Date, default: Date.now },
    role: String,
    status: String,
  },
  {
    timestamps: true, // This will create updatedAt field automatically
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
