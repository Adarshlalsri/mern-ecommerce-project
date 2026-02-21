import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0, //
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Export model
export default mongoose.model("users", userSchema);
