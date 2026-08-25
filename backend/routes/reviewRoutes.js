const express = require("express")
const { createReview, getPropertyReviews, updateReview,
     deleteReview 
 } = require("../controllers/reviewController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", protect, createReview)
router.get("/property/:propertyId", getPropertyReviews)
router.put("/:reviewId", protect, updateReview)
router.delete("/:reviewId", protect, deleteReview)

module.exports = router