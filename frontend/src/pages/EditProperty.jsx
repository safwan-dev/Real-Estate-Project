import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProperty, fetchPropertyById } from "../redux/slices/propertySlice"

function EditProperty() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { token } = useSelector((state) => state.auth);

    const { property, isLoading, isError,
        message
    } = useSelector((state) => state.properties)

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

    useEffect(() => {
        dispatch(fetchPropertyById(id));
    }, [dispatch, id])

    useEffect(() => {
        if (property) {
            setFormData({
                title: property.title || "",
                description: property.description || "",
                price: property.price || "",
                propertyType: property.propertyType || "house",
                listingType: property.listingType || "sale",
                bedrooms: property.bedrooms || "",
                bathrooms: property.bathrooms || "",
                area: property.area || "",
                location: property.location || "",
                amenities: property.amenities
                    ? property.amenities.join(", ")
                    : ""
            })
        }
    }, [property])

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const propertyData = {
            ...formData,
            price: Number(formData.price),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            area: Number(formData.area),
            amenities: formData.amenities
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "")
        }

        const resultAction = await dispatch(
            editProperty({
                id,
                propertyData,
                token
            })
        )

        if (editProperty.fulfilled.match(resultAction)) {
            navigate(`/properties/${id}`)
        }
    }

    if (isLoading && !property) {
        return <p>Loading property...</p>
    }

    if (!property) {
        return <p>Property not found.</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Edit Property
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
                    value={formData.title}
                    onChange={onChange}
                    placeholder="Property title"
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    placeholder="Property description"
                    rows="4"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={onChange}
                    placeholder="Price"
                    className="w-full border p-3 rounded"
                />

                <select
                    name="propertyType"
                    value={formData.propertyType}
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
                    value={formData.listingType}
                    onChange={onChange}
                    className="w-full border p-3 rounded"
                >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                </select>

                <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={onChange}
                    placeholder="Bedrooms"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={onChange}
                    placeholder="Bathrooms"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={onChange}
                    placeholder="Area"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={onChange}
                    placeholder="Location"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={onChange}
                    placeholder="Amenities (comma separated)"
                    className="w-full border p-3 rounded"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Updating..." : "Update Property"}
                </button>

            </form>
        </div>
    )
}

export default EditProperty