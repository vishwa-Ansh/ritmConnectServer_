import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   expoPushToken: {
    type: String,
    default: null,
  },
  categary: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;