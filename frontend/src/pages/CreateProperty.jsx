import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addProperty } from "../redux/slices/propertySlice"
import { uploadPropertyImage } from "../services/propertyService"

function CreateProperty() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [images, setImages] = useState([])

    const {user, token} = useSelector(
        (state) => state.auth
    )

    const { isLoading, isError, message } = useSelector(
        (state) => state.properties
    )

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        propertyType: "house",
        listingType: "sale",
        bedrooms: "",
        bathrooms: "",
        area: "",
        location: "",
        amenities: ""
    })

    const {
        title,
        description,
        price,
        propertyType,
        listingType,
        bedrooms,
        bathrooms,
        area,
        location,
        amenities
    } = formData

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const imageUrls = []

        for (const image of images) {
            const imageUrl = await uploadPropertyImage(image, token)

            imageUrls.push(imageUrl)
        }

        const propertyData = {
            ...formData,
            price: Number(formData.price),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            area: Number(formData.area),
            amenities: formData.amenities
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== ""),
            images: imageUrls
        }

        const resultAction = await dispatch(            
            addProperty({
                propertyData,
                token
            })
        )

        if (addProperty.fulfilled.match(resultAction)){
            navigate(`/properties/${resultAction.payload._id}`)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Create Property
            </h1>

            {isError && (
                <p className="text-red-500 mb-4">
                    {message}
                </p>
            )}

            <form onSubmit={onSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    placeholder="Property title"
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Property description"
                    rows="4"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={onChange}
                    placeholder="Price"
                    className="w-full border p-3 rounded"
                />

                <select
                    name="propertyType"
                    value={propertyType}
                    onChange={onChange}
                    className="w-full border p-3 rounded"
                >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                </select>

                <select
                    name="listingType"
                    value={listingType}
                    onChange={onChange}
                    className="w-full border p-3 rounded"
                >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                </select>

                <input
                    type="number"
                    name="bedrooms"
                    value={bedrooms}
                    onChange={onChange}
                    placeholder="Bedrooms"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="bathrooms"
                    value={bathrooms}
                    onChange={onChange}
                    placeholder="Bathrooms"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="area"
                    value={area}
                    onChange={onChange}
                    placeholder="Area"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={onChange}
                    placeholder="Location"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="amenities"
                    value={amenities}
                    onChange={onChange}
                    placeholder="Amenities (comma separated)"
                    className="w-full border p-3 rounded"
                />

                <div>
                    <label className="block mb-2 font-medium">
                        Property Images
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            setImages(
                                Array.from(e.target.files)
                            )
                        }}
                        className="w-full border p-3 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Creating..." : "Create Property"}
                </button>

            </form>
        </div>
    )
}

export default CreateProperty