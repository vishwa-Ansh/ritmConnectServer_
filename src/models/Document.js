import express from "express";
import mongoose from "mongoose";
const DocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
    semester:{
         type:String,
        required:true

    },
     department:{
        type:String,
        required:true
    },
    // course:{

    // },
    subject:{
         type:String,
        required:true

    },
    originalFileName:{
        type:String,

    },
    messageId:{
        type:Number,
        required:true
    },
      mimeType:{
        type:String,
        required:true
    },

}, {
    timestamps: true
})
export const UploadMaterialModel = mongoose.model("UploadMaterial", DocumentSchema);