import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import JWT_SECRET from '../config/config.js'
import { JWT_SECRET } from "../config/config.js";
export async function UserRegister(req, res) {
    try {
        console.log(req.body);
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(400).json({ message: "emailId and password are required" });
        }
        const user = await UserModel.findOne({ emailId });
        if (user) {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            ...req.body,
            password: hashedPassword,
        });
        // console.log(newUser)
        const refreshToken = jwt.sign(
            {
                id: newUser._id,
                categary: newUser.categary,
            },
               JWT_SECRET,
            { expiresIn: "7d" },
        );
        // console.log(accessToken)
        if (!refreshToken) {
            return res.status(401).json({ message: "refreshtoken not found" });
        }
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });
        const accessToken = jwt.sign(
            {
                id: newUser._id,
                categary: newUser.categary,
            },
            JWT_SECRET,
            { expiresIn: "15m" },
        );
        console.log(accessToken);
        if (!accessToken) {
            return res.status(401).json({ message: "accesToken not found" });
        }
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                emailId: newUser.emailId,
                categary: newUser.categary,
            },
            accessToken,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error",
        });
    }
}
export async function getUsers(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if (!accessToken) {
            return res.status(401).json({ message: "token not found" });
        }

        const decoded = jwt.verify(accessToken, JWT_SECRET);
        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export async function login(req, res) {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(400).json({ message: "emailId and password are required" });
        }

        const user = await UserModel.findOne({ emailId });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const passwordMatching = await bcrypt.compare(password, user.password);
        if (!passwordMatching) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = jwt.sign(
            {
                id: user._id,
                categary: user.categary,
            },
            JWT_SECRET,
            {
                expiresIn: "200m",
            },
        );
        const refreshToken = jwt.sign(
            {
                id: user._id,
                categary: user.categary,
            },
            JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });
        return res.status(200).json({
            message: "User Login Succesful",
            user: {
                categary: user.categary,
                emailId: user.emailId,
            },
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to login. Try again" });
    }
}

export async function refresh(req, res) {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "refreshToken missing" });
        }

        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const accessToken = jwt.sign(
            { id: user._id, categary: user.categary },
            JWT_SECRET,
            { expiresIn: "15m" },
        );

        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
}
