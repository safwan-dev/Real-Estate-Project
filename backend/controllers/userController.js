const User = require("../models/User")
const bcrypt = require("bcryptjs")

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body

        if (!newPassword) {
            return res.status(400).json({
                message: "New password is required"
            })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const user = await User.findById(req.user.userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({
            message: "Password changed successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = { getProfile, changePassword }