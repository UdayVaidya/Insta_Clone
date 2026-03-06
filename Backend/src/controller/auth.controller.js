import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const registerUserController = async (req, res) => {
    try {
        const { username, email, password, bio, profilePicture } = req.body;

        const isUserAlreadyExist = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({ success: false, message: isUserAlreadyExist.email === email ? "Email already exists" : "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            bio,
            profilePicture
        });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        res.status(201).json({
            success: true, message: "User registered successfully", user: {
                email: user.email,
                username: user.username,
                profilePicture: user.profilePicture,
                bio: user.bio
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

const loginUserController = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        console.log("🔐 Login attempt → identifier:", identifier, "| password present:", !!password);

        const isEmail = identifier.includes("@");

        const user = await User.findOne(
            isEmail ? { email: identifier } : { username: identifier }
        ).select("+password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            success: true, message: "User logged in successfully", user: {
                email: user.email,
                username: user.username,
                profilePicture: user.profilePicture,
                bio: user.bio
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getMeController = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true, message: "User fetched successfully", user: {
                email: user.email,
                username: user.username,
                profilePicture: user.profilePicture,
                bio: user.bio
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { registerUserController, loginUserController, getMeController };
