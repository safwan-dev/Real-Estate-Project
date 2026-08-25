const API_URL = `${import.meta.env.VITE_API_URL}/favorites`

const addFavorite = async (propertyId, token) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId })
    })

    const data = await response.json()

    if (!response.ok){
        throw new Error(
            data.message || "Failed to add favorite"
        )
    }

    return data.favorite
}

const getFavorites = async (token) => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data =  await response.json()

    if (!response.ok){
        throw new Error(
            data.message || "Failed to fetch favorite"
        )
    }

    return data.favorites
}

const removeFavorite = async (propertyId, token) => {
    const response = await fetch(`${API_URL}/${propertyId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok){
        throw new Error(
            data.message || "Failed to remove favorite"
        )
    }

    return data
}

export { addFavorite, getFavorites, removeFavorite }