import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    bio: {
        type: String,
        default: "Hello World"
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

export default User;