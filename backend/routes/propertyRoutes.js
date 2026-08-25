const express = require("express")
const { createProperty, getProperties, getPropertyById,
    updateProperty, deleteProperty
 } = require("../controllers/propertyController")
const protect = require("../middlewares/authMiddleware")
const upload = require("../middlewares/uploadMiddleware")
const cloudinary = require("../config/cloudinary")

const router = express.Router()

router.post(
    "/upload-image",
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "No image uploaded"
                })
            }

            const result = await new Promise(
                (resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "real-estate"
                        },
                        (error, result) => {
                            if (error) {
                                reject(error)
                            } 
                            else {
                                resolve(result)
                            }
                        }
                    )

                    stream.end(req.file.buffer)
                }
            )

            res.status(200).json({
                message: "Image received successfully",
                imageUrl: result.secure_url
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);

router.post("/", protect, createProperty)
router.get("/", getProperties)
router.get("/:id", getPropertyById)
router.put("/:id", protect, updateProperty)
router.delete("/:id", protect, deleteProperty)

module.exports = router