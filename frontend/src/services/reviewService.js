const API_URL = "http://localhost:5000/api/reviews"

export const getPropertyReviews = async (propertyId) => {
    const response = await fetch(`${API_URL}/property/${propertyId}`)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch reviews"
        )
    }

    return data.reviews
}

export const createReview = async (reviewData, token) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create review"
        )
    }

    return data.review
}

export const updateReview = async (reviewId, reviewData, token) => {
    const response = await fetch(`${API_URL}/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(reviewData)
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update review"
        )
    }

    return data.review
}

export const deleteReview = async (reviewId, token) => {
    const response = await fetch(`${API_URL}/${reviewId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete review"
        )
    }

    return data
}