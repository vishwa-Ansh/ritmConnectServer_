import PermissionKey from "../models/permisionKey.js";
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
        const existingPermissionKey = await PermissionKey.findOne({ section: section });
        if (existingPermissionKey) {
           return res.status(400).json({
                success: false,
                message: "Password for this section already exists",
            });
        } else {
            await PermissionKey.create({
                userid: userId,
                key: password,
                section: section,
            });
            return res.status(200).json({
                success: true,
                message: "Password set successfully",
            });
        }       
        console.log(password)
        console.log(typeof (password));
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
  
}

export async function UpdatePassword (req, res) {
    

}