import StudentModel from "../models/Student.js";
import { TeacherModel } from "../models/Teacher.js";
import UserModel from "../models/User.js";
import { uploadFile } from "../utils/uploadTelegramFile.js";
import { client } from "../config/telegram.js";
import fs from "fs";
import { message, messageParse } from "telegram/client/index.js";
import { UploadMaterialModel } from "../models/Document.js";
import { title } from "process";
import { sendPushNotification }
    from "../utils/sendPushNotification.js";

export async function GetCompleteProfileDetails(req, res) {

    try {

        console.log(req.user);

        const userAccount = await UserModel.findById(
            req.user.id
        );
        const teacherAccount = await TeacherModel.findOne({ userId: req.user.id }).populate('userId')
        // console.log(userAccount)
        // console.log(teacherAccount)

        if (!userAccount) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });

        }

        return res.status(200).json({
            success: true,
            userData: userAccount,

            teacherData: teacherAccount

        });

    } catch (error) {

        console.log("DASHBOARD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

}

export async function CreateCompleteTeacherProfileData(req, res) {
    const getUserData = req.user;
    try {
        const userAccount = await UserModel.findById(getUserData.id);
        if (!userAccount) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }
        if (userAccount.name !== req.body.name) {
            await UserModel.findByIdAndUpdate(
                getUserData.id,
                { name: req.body.name }, { returnDocument: "after" }
            );
        }
        const teacherAccount = await TeacherModel.findOne({ userId: getUserData.id });


        if (!teacherAccount) {
            const createTeacherAccount = await TeacherModel.create({
                userId: getUserData.id,
                department: req.body.department,
                title: req.body.title,
                subjects: req.body.subjects,
            });
            console.log(createTeacherAccount);
            return res.status(201).json({
                success: true,
                message: "Teacher profile created successfully",
                data: createTeacherAccount
            });
        } else {
            const UpdateTeacherAccount = await TeacherModel.findOneAndUpdate({ userId: getUserData.id }, {
                department: req.body.department,
                title: req.body.title,
                subjects: req.body.subjects,
            }, { returnDocument: "after" })
            return res.status(201).json({
                success: true,
                message: "Teacher profile Allready existing",
                data: UpdateTeacherAccount
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

}

export async function getAllStudentProfilePhoto(req, res) {
    try {

        const teacherAccount = await TeacherModel.findOne({ userId: req.user.id }).populate("userId");
        if (!teacherAccount) {
            return res.status(400).json({
                success: false,
                message: "failed to access teacher"
            })

        }
        // console.log(teacherAccount)
        console.log(req.params)
        const studentAccount = await StudentModel.find({ semester: req.params.sem, branch: teacherAccount.department }).populate("userId");
        if (studentAccount.length === 0) {
            return res.status(404).json({
                success: false,
                message: "failed to find student profile data "
            })
        }

        const formattedStudents =

            studentAccount.map((student) => ({
                id: student._id,
                name: student.userId?.name,
                email: student.userId?.emailId,
                rollNumber: student.rollNumber,
                semester: student.semester,
                branch: student.branch,
                profileImageUri: student.profilePhoto,

            }));
        // console.log(formattedStudents);
        return res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: formattedStudents,

        });

    } catch (error) {
        console.log(error)
    }
};

export async function StudentProfileDetails(req, res) {
    try {
        const { rollNumber } = req.params
        console.log(rollNumber)
        const studentAccount = await StudentModel.findOne({ rollNumber: rollNumber }).populate("userId");
        if (!studentAccount) {
            return res.status(404).json({
                success: false,
                message: "Failed to Find student profile"
            })
        }
        // console.log(studentAccount)
        const studentData = {
            name: studentAccount.userId.name,
            email: studentAccount.userId.emailId,
            rollNumber: studentAccount.rollNumber,
            enrollmentNumber: studentAccount.enrollmentNumber,
            phone: studentAccount.phone,
            dob: studentAccount.dob,
            gender: studentAccount.gender,
            bloodGroup: studentAccount.bloodGroup,
            fatherName: studentAccount.fatherName,
            motherName: studentAccount.motherName,
            parentPhone: studentAccount.parentPhone,
            parentEmail: studentAccount.parentEmail,
            parentAddress: studentAccount.parentAddress,
            pincode: studentAccount.pincode,
            city: studentAccount.city,
            state: studentAccount.state,
            country: studentAccount.country,
            branch: studentAccount.branch,
            semester: studentAccount.semester,
            batch: studentAccount.batch,
            course: studentAccount.course,
            profilePhoto: studentAccount.profilePhoto,
        };
        return res.status(200).json({
            success: true,
            message: "succesfully find Student Details",
            studentData

        })

    } catch (error) {
        console.log(error);
    }
}

export async function DocumentUploads(req, res) {

    try {
        console.log("===== UPLOAD START =====");
        console.log(req.file)
        console.log(req.body)
        const messageId = await uploadFile(
            client,
            req.file.path
        );
        const teacherAccount = await TeacherModel.findOne({ userId: req.user.id })
        if (!teacherAccount) {
            return res.status(404).json({
                success: false,
                message: "failed to find teacter account"
            })
        }

        const UploadMaterial = await UploadMaterialModel.create({
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description,
            semester: req.body.semester,
            subject: req.body.subject,
            originalFileName: req.file.originalname,
            department: teacherAccount.department,
            messageId: messageId,
            mimeType: req.file.mimetype,
        })
        console.log(UploadMaterial)


        // const students =
        //     await StudentModel.find({
        //         semester: req.body.semester,
        //         branch: teacherAccount.department,
        //     }).populate("userId");

        // const tokens = students
        //     .map(
        //         (student) =>
        //             student.userId?.expoPushToken
        //     )
        //     .filter(Boolean);

        // console.log("Tokens =", tokens);

        // if (tokens.length > 0) {
        //     await sendPushNotification(
        //         tokens,
        //         "📚 New Study Material",
        //         `${req.body.title} uploaded`
        //     );
        // }

        fs.unlinkSync(req.file.path);
        // const messages = await client.getMessages("me", {

        //     ids: [58]

        // });
        // console.log(messages)
        // const buffer = await client.downloadMedia(

        //     messages[0]

        // // );
        // fs.writeFileSync(

        //     "./downloaded.pdf",

        //     buffer

        // );

        // console.log("buffeer data =", buffer)

        res.json({
            success: true,
            messageId,
        });

    } catch (error) {

        console.log(error);

        if (req.file?.path) {

            fs.unlinkSync(req.file.path);

        }

        res.status(500).json({
            success: false,
        });
    }
}


// to get all subject of teacter 

export async function GetAllSubject(req, res) {
    try {
        const subject = [];
        const teacherAccount = await TeacherModel.findOne({ userId: req.user.id })

        if (!teacherAccount) {
            return res.status(404).json({
                success: false,
                message: "failed to find teacter acount"
            })
        }
        for (let obj of teacherAccount.subjects) {
            subject.push(obj.subjectName);
        }
        // console.log(teacherAccount)
        console.log(subject)
        res.status(200).json({
            success: true,
            message: "subject data faching succesful",
            subject
        })

    } catch (error) {
        console.log(error);
    }
}



// ------------------------------------------------------------
export async function GetUploadedMaterials(req, res) {
    try {
        const materials = await UploadMaterialModel
            .find({
                userId: req.user.id,
            })
            .sort({
                createdAt: -1,
            }).populate("userId")
        console.log(materials)
        res.status(200).json({
            success: true,
            materials,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch materials",
        });
    }
}


export async function DownloadMaterial(req, res) {
    try {

        const material =
            await UploadMaterialModel.findById(
                req.params.id
            );

        if (!material) {
            return res.status(404).json({
                success: false,
                message: "Material not found",
            });
        }

        const messages =
            await client.getMessages(
                "me",
                {
                    ids: [material.messageId],
                }
            );

        if (!messages.length) {
            return res.status(404).json({
                success: false,
                message: "Telegram file not found",
            });
        }

        const buffer =
            await client.downloadMedia(
                messages[0]
            );

        res.setHeader(
            "Content-Type",
            material.mimeType
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${material.originalFileName}"`
        );
        console.log(buffer.length);
        console.log(buffer)
        res.send(buffer);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Download failed",
        });
    }
}