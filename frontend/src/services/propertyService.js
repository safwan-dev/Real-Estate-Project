const API_URL = "http://localhost:5000/api/properties"

const getProperties = async (filters = {}) => {
    const queryParams = new URLSearchParams()

    if (filters.search){
        queryParams.append("search", filters.search)
    }

    if (filters.propertyType){
        queryParams.append("propertyType", filters.propertyType)
    }

    if (filters.listingType){
        queryParams.append("listingType", filters.listingType)
    }

    if (filters.minPrice){
        queryParams.append("minPrice", filters.minPrice)
    }

    if (filters.maxPrice){
        queryParams.append("maxPrice", filters.maxPrice)
    }

    if (filters.page){
        queryParams.append("page", filters.page)
    }

    if (filters.limit){
        queryParams.append("limit", filters.limit)
    }

    const queryString = queryParams.toString()
    
    const url = queryString ? `${API_URL}?${queryString}` : API_URL

    const response = await fetch(url)

    const data = await response.json()

    if (!response.ok){
        throw new Error(data.message || "Failed to fetch properties")
    }

    return {
        properties: data.properties,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProperties: data.totalProperties
    }
}

const getPropertyById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)

    const data = await response.json()

    if (!response.ok){
        throw new Error(data.message || "Failed to fetch properties")
    }

    return data.property
}

const createProperty = async (propertyData, token) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
    })

    const data = await response.json()

    if (!response.ok){
        throw new Error(data.message || "Failed to create properties")
    }

    return data.property
}

const updateProperty = async (id, propertyData, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update property"
        )
    }

    return data.property
}

const deleteProperty = async (id, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete property"
        )
    }

    return data
}

export const uploadPropertyImage = async (image, token) => {
        const formData = new FormData()

        formData.append("image", image)

        const response = await fetch(`${API_URL}/upload-image`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.message || "Image upload failed"
            );
        }

        return data.imageUrl
    }

export { getProperties, getPropertyById, createProperty, updateProperty,
    deleteProperty
 }