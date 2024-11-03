const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

async function Login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });


        if (!user) {
            return res.status(400).json({
                message: "invalid username"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: 'password is incorrect'
            })
        }


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: true, // Use true in production
        sameSite: 'None', // Required for cross-origin
        });

        const profile = user.profile;
        const id = user._id;
        console.log("user ",token);
        return res.status(200).json({ message: "logged in successfully", token, profile,id})

    } catch (error) {
        return res.status(400).json({
            err: error,
            message: "error in login"
        })
    }
}

module.exports = Login;