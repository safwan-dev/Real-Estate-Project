const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    propertyType: {
        type: String,
        enum: ["house", "apartment", "villa", "plot", "commercial"],
        required: true
    },
    listingType: {
        type: String,
        enum: ["sale", "rent"],
        required: true
    },
    bedrooms: {
        type: Number,
        default: 0,
        min: 0
    },
    bathrooms: {
        type: Number,
        default: 0,
        min: 0
    },
    area: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    amenities: {
        type: [String],
        default: [],
    },
    images: {
        type: [String],
        default: [],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["available", "sold", "rented"],
        default: "available"
    },
},
{
    timestamps: true
})

const Property = mongoose.model("Property", propertySchema)

module.exports = Property