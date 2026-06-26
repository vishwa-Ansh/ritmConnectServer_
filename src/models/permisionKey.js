import express from "express";
import { Schema } from "mongoose";
import mongoose from "mongoose";
const permissionKeySchema = new Schema({
    userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  section: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PermissionKey = mongoose.model("PermissionKey", permissionKeySchema);
export default PermissionKey;