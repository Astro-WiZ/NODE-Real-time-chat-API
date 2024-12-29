import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
});

// hashing
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        user.password = await bcrypt.hash(user.password, 10);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// compare hashed password and original password
userSchema.methods.ComparePasswords = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
