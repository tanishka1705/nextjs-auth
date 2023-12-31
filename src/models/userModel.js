import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        require: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
})

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;