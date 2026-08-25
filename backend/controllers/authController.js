const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password){
            res.status(401).json({
                message: "Please fill the required fields"
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser){
            res.status(400).json({
                message: "User with this email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User created Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body

        if (!email || !password){
            res.status(400).json({
                message: "Plaese provide email and password"
            })
        }

        const user = await User.findOne({ email })

        if (!user){
            res.status(401).json({
                message: "Invalid username or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect){
            res.status(401).json({
                message: "Invalid username or password"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = { registerUser, loginUser }