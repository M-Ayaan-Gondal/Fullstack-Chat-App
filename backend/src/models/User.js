import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlenfth: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // creates createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);
export default User;