const express = require("express")
const { getProfile, changePassword } = require("../controllers/userController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()

router.get("/profile", protect, getProfile)
router.put("/change-password", protect, changePassword)

module.exports = router