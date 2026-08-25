const Review = require("../models/Review")
const Property = require("../models/Property")

const createReview = async (req, res) => {
    try {
        const userId = req.user.userId
        const { propertyId, rating, comment } = req.body

        const property = await Property.findById(propertyId)

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            })
        }

        const existingReview = await Review.findOne({
            user: userId,
            property: propertyId
        })

        if (existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this property"
            })
        }

        const review = await Review.create({
            user: userId,
            property: propertyId,
            rating,
            comment
        })

        const populatedReview = await Review.findById(review._id).populate("user", "name email")

        res.status(201).json({
            message: "Review created successfully",
            review: populatedReview
        })
    } 
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const getPropertyReviews = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const reviews = await Review.find({
            property: propertyId
        }).populate("user", "name email").sort({ createdAt: -1 })

        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews
        })
    } 
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const updateReview = async (req, res) => {
    try {
        const userId = req.user.userId
        const { reviewId } = req.params
        const { rating, comment } = req.body

        const review = await Review.findById(reviewId)

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            })
        }

        if (review.user.toString() !== userId) {
            return res.status(403).json({
                message: "You are not allowed to update this review"
            })
        }

        review.rating = rating
        review.comment = comment

        await review.save()

        const updatedReview = await Review.findById(review._id).populate("user", "name email")

        res.status(200).json({
            message: "Review updated successfully",
            review: updatedReview,
        })
    } 
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        const userId = req.user.userId
        const { reviewId } = req.params

        const review = await Review.findById(reviewId)

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            })
        }

        if (review.user.toString() !== userId) {
            return res.status(403).json({
                message: "You are not allowed to delete this review"
            })
        }

        await review.deleteOne()

        res.status(200).json({
            message: "Review deleted successfully"
        })
    } 
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = { createReview, getPropertyReviews, updateReview, deleteReview }