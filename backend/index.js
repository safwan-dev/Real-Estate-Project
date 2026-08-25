const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const propertyRoutes = require("./routes/propertyRoutes")
const favoriteRoutes = require("./routes/favoriteRoutes")
const reviewRoutes = require("./routes/reviewRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/properties", propertyRoutes)
app.use("/api/favorites", favoriteRoutes)
app.use("/api/reviews", reviewRoutes)

app.get("/", (req, res) => {
    res.json({
        message: "Real Estate Marketplace API is running"
    })
})

PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected Successfully")

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed: ", error.message)
    })

module.exports = app