import UserModel from "../models/User.js";

export async function SavePushToken(req, res) {
    try {
        const { expoPushToken } = req.body;
        console.log(expoPushToken)
        const updateUserAccount =
            await UserModel.findByIdAndUpdate(
                req.user.id,
                {
                    expoPushToken,
                }
            );
console.log(updateUserAccount)
        res.status(200).json({
            success: true,
            message: "Push token saved",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
        });
    }
}