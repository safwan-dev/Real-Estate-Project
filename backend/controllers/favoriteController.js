const Favorite = require("../models/Favorite")
const Property = require("../models/Property")

const addFavorite = async (req, res) => {
    try {
        const userId = req.user.userId
        const { propertyId } = req.body

        const property = await Property.findById(propertyId)

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            })
        }

        const existingFavorite = await Favorite.findOne({
            user: userId,
            property: propertyId
        })

        if (existingFavorite) {
            return res.status(400).json({
                message: "Property already in favorites"
            })
        }

        const favorite = await Favorite.create({
            user: userId,
            property: propertyId
        })

        const populatedFavorite = await Favorite.findById(
            favorite._id
        ).populate("property")

        res.status(201).json({
            message: "Property added to favorites",
            favorite: populatedFavorite
        })
    } 
    catch(error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const getFavorites = async (req, res) => {
    try {
        const userId = req.user.userId

        const favorites = await Favorite.find({
            user: userId
        }).populate("property")

        res.status(200).json({
            message: "Favorites fetched successfully",
            favorites
        })
    } 
    catch(error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.userId
        const { propertyId } = req.params

        const favorite = await Favorite.findOneAndDelete({
            user: userId,
            property: propertyId
        })

        if (!favorite) {
            return res.status(404).json({
                message: "Favorite not found"
            })
        }

        res.status(200).json({
            message: "Property removed from favorites"
        })
    } 
    catch(error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = { addFavorite, getFavorites, removeFavorite }