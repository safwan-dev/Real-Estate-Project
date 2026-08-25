const Property = require("../models/Property")
const Favorite = require("../models/Favorite")

const createProperty = async (req, res) => {
    try{
        const { title, description, price,
        propertyType, listingType, bedrooms,
        bathrooms, area, location, amenities,
        images } = req.body

        if (!title || !description || price === undefined || 
            !propertyType || !listingType || area === undefined
            || !location
        ){
            return res.status(400).json({
                message: "Please fill all required fields"
            })
        }
        
        const property = await Property.create({
            title,
            description,
            price,
            propertyType,
            listingType,
            bedrooms,
            bathrooms,
            area,
            location,
            amenities,
            images,
            owner: req.user.userId
        })

        res.status(201).json({
            message: "Property created successfully",
            property
        })
    }
    catch(error){
        console.error("CREATE PROPERTY ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const getProperties = async (req, res) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 2

    const skip = (page - 1) * limit

    const { search, propertyType, listingType,
        minPrice, maxPrice
    } = req.query

    const filter = {}

    if (search){
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                location: {
                    $regex: search,
                    $options: "i"
                }
            }
        ]
    }

    if (propertyType){
        filter.propertyType = propertyType
    }

    if (listingType){
        filter.listingType = listingType
    }

    if (minPrice){
        filter.price = {
            ...filter.price,
            $gte: Number(minPrice)
        }
    }

    if (maxPrice){
        filter.price = {
            ...filter.price,
            $lte: Number(maxPrice)
        }
    }

    try{
        const properties = await Property.find(filter).skip(skip).limit(limit)

        const totalProperties = await Property.countDocuments(filter)
        const totalPages = Math.ceil(totalProperties/limit)

        res.status(200).json({
            message: "Properties fetched successfully",
            properties,
            currentPage: page,
            totalPages,
            totalProperties
        })
    }
    catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const getPropertyById = async (req, res) => {
    try{
        const { id } = req.params

        const property = await Property.findById(id).populate("owner", "name email")

        if (!property){
            res.status(404).json({
                message: "Property not found"
            })
        }

        res.status(200).json({
            message: "Property fetched successfully",
            property
        })
    }
    catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const updateProperty = async (req, res) => {
    try{
        const { id } = req.params

        const property = await Property.findById(id)

        if (!property){
            return res.status(404).json({
                message: "Property not found"
            })
        }

        if (!property.owner.equals(req.user.userId)){
            return res.status(403).json({
                message: "You are not allowed to update this property"
            })
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json({
            message: "Property updated successfully",
            property: updatedProperty
        })
    }
    catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

const deleteProperty = async (req, res) => {
    try{
        const { id } = req.params

        const property = await Property.findById(id)

        if (!property){
            return res.status(404).json({
                message: "Property not found"
            })
        }

        if (!property.owner.equals(req.user.userId)){
            return res.status(403).json({
                message: "You are not allowed to delete this property"
            })
        }

        await Property.findByIdAndDelete(id)
        await Favorite.deleteMany({
            property: id
        })

        res.status(200).json({
            message: "Property deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = { createProperty, getProperties, getPropertyById,
    updateProperty, deleteProperty
 }