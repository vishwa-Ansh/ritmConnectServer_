import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user = one student profile
    },
    

    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    enrollmentNumber: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
      required: true,
    },

    dob:{
      type:String,
      require:true,
      trim:true,
    },
    gender:{
      type:String,
      required:true,
      trim:true,
    },
    bloodGroup:{
      type:String,
      required:true,
      trim:true,
    },
    fatherName:{
      type:String,
      required:true,
      trim:true,
    },
    motherName:{
      type:String,
      required:true,
      trim:true,
    },
    parentPhone:{
      type:String,
      required:true,
      trim:true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
    parentEmail:{
      type:String,
      required:true,
      trim:true,
    },
    parentAddress:{
      type:String,
      required:true,
      trim:true,
    },
    pincode:{
      type:String,
      required:true,
      trim:true,
    },
    city:{
      type:String,
      required:true,
      trim:true,
    },
    state:{
      type:String,
      required:true,
      trim:true,
    },
    country:{
      type:String,
      required:true,
      trim:true,
    },
    
    branch: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: String,
      trim: true,
    },
    batch:{
      type:String,
      required:true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },
    profilePhoto: {
  type: String,
  default: "",
},

  
  },
  {
    timestamps: true, // createdAt & updatedAt auto
  }
);

const StudentModel = mongoose.model("Student", studentSchema);
export default StudentModel