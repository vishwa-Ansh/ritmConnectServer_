import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    department: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true
    },
    // phone: {
    //     type: String,
    //     required: true,
    //     match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    //     trim: true
    // },
    subjects: [
        {
            subjectName: {
                type: String,
                required: true
            },

            classAssigned: {
                type: String,
                required: true,
            },

            teachers: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                },
            ],
            branch: {
                type: String,
                required: true
            }
        }
    ]
}, 
{
    timestamps: true
});

export const TeacherModel = mongoose.model("Teacher", teacherSchema);