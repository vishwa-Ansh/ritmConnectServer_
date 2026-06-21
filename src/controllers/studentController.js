import { message } from 'telegram/client/index.js';
import StudentModel from '../models/Student.js'
import UserModel from "../models/User.js";
import { UploadMaterialModel } from "../models/Document.js"
import { title } from 'process';

export async function createStudentProfile(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { rollNumber, enrollmentNumber, branch, semester, course, phone, fullName, dob, address, gender, fatherName, motherName, parentPhone, parentEmail, parentAddress, pincode, city, state, country, bloodGroup, batch } = req.body ?? {};
        if (!rollNumber || !branch || !course) {
            return res.status(400).json({
                message: "rollNumber, branch and course are required",
            });
        }
        console.log(branch)
        const users = await UserModel.findById(userId);

        if (!users) {
            return res.status(401).json({ message: "user not found" });
        }
        if (users.name != fullName) {
            users.name = fullName;
            await users.save();

        }

        const existing = await StudentModel.findOne({ userId: users._id });
        if (existing) {
            return res.status(409).json({
                message: "profile already exists",
            });
        }


        const newStudent = await StudentModel.create({
            userId: users._id,
            rollNumber,
            enrollmentNumber,
            branch,
            semester,
            course,
            phone,
            dob,
            address,
            gender,
            bloodGroup,
            fatherName,
            motherName,
            parentPhone,
            parentEmail,
            parentAddress,
            pincode,
            city,
            state,
            country,
            batch

        });
        console.log(newStudent)

        res.status(201).json({
            message: "profile completed",
            studentId: newStudent._id,
        });
    } catch (error) {
        console.log(error)
        // Duplicate key (e.g. rollNumber unique)
        if (error?.code === 11000) {
            const fields = Object.keys(error?.keyValue ?? {});
            return res.status(409).json({
                message: `Duplicate value for: ${fields.join(", ") || "unique field"}`,
                fields: error?.keyValue ?? undefined,
            });
        }

        // Mongoose validation errors
        if (error?.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: Object.fromEntries(
                    Object.entries(error.errors ?? {}).map(([k, v]) => [k, v?.message]),
                ),
            });
        }

        return res.status(500).json({
            message: "something went wrong",
            error: error?.message,
        });
    }
}

export async function get_profile(req, res) {
    // const user=req.user;
    try {

        const users = await StudentModel.findOne({ userId: req.user.id }).populate('userId')
        console.log(users)
        if (!users) {
            return res.json({
                message: 'please complete profile',
                completeProfile: false
            })
        }
        res.status(201).json({
            message: 'user are successfully find',
            completeProfile: true,
            user: {
                Name: users.userId.name,
                email: users.userId.emailId,
                category: users.userId.categary,
                rollNumber: users.rollNumber,
                enrollmentNumber: users.enrollmentNumber,
                branch: users.branch,
                semester: users.semester,
                course: users.course,
                batch:users.batch,
                phone: users.phone,
                address: users.address,
                gender: users.gender,
                bloodGroup: users.bloodGroup,
                fatherName: users.fatherName,
                motherName: users.motherName,
                parentAddress: users.parentAddress,
                parentEmail: users.parentEmail,
                parentPhone: users.parentPhone,
                city: users.city,
                state: users.state,
                country: users.country,
                pincode: users.pincode,
                dob: users.dob,
                profilePhoto: users.profilePhoto







            }

        })
        // console.log(req.user.id);
        // console.log(user.userId.name)
    } catch (err) {
        console.log(err)

        return res.status(401).json({ message: 'somthiing is wrong' })
    }

}

export async function uploadProfilePhoto(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }
        // console.log()
        const imageUrl = req.file.path;
        const student =
            await StudentModel.findOneAndUpdate(
                { userId: req.user.id },
                {
                    profilePhoto: imageUrl,
                },
                {
                    returnDocument: "after",
                }
            );

        return res.status(200).json({
            success: true,
            message: "Profile photo uploaded",
            imageUrl,
            data: student,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });

    }

}
export async function GetUploadedMaterials(req, res) {
    try {
        const studentAccount = await StudentModel.findOne({ userId: req.user.id })
        if (!studentAccount) {
            return res.status(404).json({
                success: false,
                message: " fail to find user account"
            })
        }
        const materials = await UploadMaterialModel.find({ semester: studentAccount.semester, department: studentAccount.branch, }).populate("userId");
        // const materialData={
        //     name:materials.userId.name,
        //     title:materials.title,
        //     semester:materials.semester,
        //     department:materials.department,
        //     subject:materials.subject
        // }
        if (!materials) {
            return res.status(404).json({
                success: false,
                message: "failed to fetch materials data"
            })
        }
        res.status(200).json({
            success: true,
            materials,
        });
        // console.log(materials)


    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch materials",
        });
    }

}