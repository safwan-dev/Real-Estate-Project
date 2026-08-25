import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchFavorites, deleteFavorite } from "../redux/slices/favoriteSlice"

function Favorites() {
    const dispatch = useDispatch()

    const { token } = useSelector(
        (state) => state.auth
    )

    const { favorites, isLoading, isError, 
        message
    } = useSelector(
        (state) => state.favorites
    )

    useEffect(() => {
        if (token) {
            dispatch(fetchFavorites(token))
        }
    }, [dispatch, token])

    if (isLoading) {
        return <p>Loading favorites...</p>
    }

    if (isError) {
        return <p>{message}</p>
    }

    const handleRemove = (propertyId) => {
        dispatch(
            deleteFavorite({ propertyId, token })
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                My Favorites
            </h1>

            {favorites.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {favorites
                        .filter((favorite) => favorite.property)
                        .map((favorite) => {
                            const property = favorite.property

                        return (
                            <div
                                key={favorite._id}
                                className="border rounded-lg p-5 shadow"
                            >
                                <h2 className="text-xl font-bold mb-2">
                                    {property.title}
                                </h2>

                                <p className="mb-2">
                                    {property.description}
                                </p>

                                <p className="font-semibold mb-2">
                                    Price: {property.price}
                                </p>

                                <p className="mb-4">
                                    Location: {property.location}
                                </p>

                                <Link
                                    to={`/properties/${property._id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    View Property
                                </Link>

                                <button
                                    onClick={() => handleRemove(property._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded ml-2"
                                >
                                    Remove
                                </button>
                            </div>
                        )
                    })}

                </div>
            )}
        </div>
    )
}

export default Favorites