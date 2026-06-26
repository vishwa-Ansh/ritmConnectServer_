import PermissionKey from "../models/permisionKey.js";
import bcrypt from "bcrypt";
export async function SetPassword(req, res) {
    try {
        console.log(req.body)
        const userId = req?.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { password, section } = req?.body;

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

         const hashedPassword = await bcrypt.hash(password, 10);

        const existingPermissionKey = await PermissionKey.findOne({ section: section });
        if (existingPermissionKey) {
           return res.status(400).json({
                success: false,
                message: "Password for this section already exists",
            });
        } else {
            await PermissionKey.create({
                userid: userId,
                key: hashedPassword,
                section: section,
            });
            return res.status(200).json({
                success: true,
                message: "Password set successfully",
            });
        }       
        // console.log(password)
        // console.log(typeof (password));
        // res.status(200).json({
        //     success: true,
        //     message: "Password updated successfully",
        // });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
  
}

export async function UpdatePassword (req, res) {
    try {
        const userId = req?.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { password, section } = req?.body;
        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }
         const hashedPassword = await bcrypt.hash(password, 10);
        const existingPermissionKey = await PermissionKey.findOne({ section: section });
        if (!existingPermissionKey) {
            return res.status(404).json({
                success: false,
                message: "No existing password for this section",
            });
        } else {
            existingPermissionKey.key = hashedPassword;
            await existingPermissionKey.save();
            return res.status(200).json({
                success: true,
                message: "Password updated successfully",
            });
        }
    } catch (err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }


}
export async function getPermissionKey(req, res) {
    try {
        const userId = req?.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { password } = req.body;
        const { section } = req.params;

        const permissionKey = await PermissionKey.findOne({
            userid: userId,
            section,
        });

        if (!permissionKey) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const isMatch = await bcrypt.compare(password, permissionKey.key);
        console.log(isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
                permission: false,
            });
        }

        return res.status(200).json({
            success: true,
            permission: true,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}