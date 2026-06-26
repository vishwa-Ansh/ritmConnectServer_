import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
    label: {
      type: String,
      enum: ["Front cover", "Back cover", "Photo"],
      default: "Photo",
    },
  },
  { _id: false }
);

const bookSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Available", "Borrowed", "Reserved"],
      default: "Available",
    },

    isbn: {
      type: String,
      trim: true,
      default: "",
    },

    edition: {
      type: String,
      default: "First Edition",
    },

    shelf: {
      type: String,
      default: "—",
    },

    copiesTotal: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    copiesAvailable: {
      type: Number,
      min: 0,
      default: function () {
        return this.copiesTotal;
      },
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    description: {
      type: String,
      default: "No description added yet.",
    },

    images: {
      type: [imageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);