const express = require("express")
const { addFavorite, getFavorites, removeFavorite } = require("../controllers/favoriteController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", protect, addFavorite)
router.get("/", protect, getFavorites)
router.delete("/:propertyId", protect, removeFavorite)

module.exports = router