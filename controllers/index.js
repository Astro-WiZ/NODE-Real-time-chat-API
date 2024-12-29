import User from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ msg: "Require Username and Password" });
        }
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ msg: "Username already taken." });
        }
        await User.create(req.body);
        return res.status(200).json({ status: `${username} registered.` });
    } catch (error) {
        console.log(error);
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.json({ error: "Invalid Creditionals" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.json({ error: "Invalid Password" });
        }
        req.session.userId = user.id;
        res.json({ status: "User logged in!" });
    } catch (error) {
        console.log("Login Error: ", error);
        res.json({ msg: "login failed" });
    }
};
