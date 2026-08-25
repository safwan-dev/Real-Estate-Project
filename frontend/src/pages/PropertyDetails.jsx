import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link, useNavigate } from "react-router-dom"
import { fetchPropertyById, removeProperty } from "../redux/slices/propertySlice"
import { createFavorite, fetchFavorites, deleteFavorite } from "../redux/slices/favoriteSlice"
import { fetchReviews, addReview, editReview, removeReview } from "../redux/slices/reviewSlice"
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

function PropertyDetails() {
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [editingReview, setEditingReview] = useState(null)
    const [editRating, setEditRating] = useState(5)
    const [editComment, setEditComment] = useState("")
    const [selectedImage, setSelectedImage] = useState(0)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, token } = useSelector(
        (state) => state.auth
    )

    const { property, isLoading, isError,
        message
    } = useSelector((state) => state.properties)

    const {
        reviews,
        isLoading: reviewsLoading,
        isError: reviewsError,
        message: reviewsMessage
    } = useSelector(
        (state) => state.reviews
    )

    const { favorites } = useSelector(
        (state) => state.favorites
    )

    const isFavorite = favorites.some(
        (favorite) => favorite.property?._id === property?._id
    )

    useEffect(() => {
        dispatch(fetchPropertyById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (token) {
            dispatch(fetchFavorites(token))
        }
    }, [dispatch, token])

    useEffect(() => {
        if (property?._id) {
            dispatch(fetchReviews(property._id))
        }
    }, [dispatch, property?._id])

    if (isLoading){
        return <Loading />
    }

    if (isError){
        return <ErrorMessage message={message} />
    }

    if (!property){
        return <p>Property not found</p>
    }

    const loggedInUserId = user?._id || user?.userId

    const isOwner = loggedInUserId && property.owner && loggedInUserId === property.owner._id

    const nextImage = () => {
        setSelectedImage((current) =>
            current === property.images.length - 1 ? 0 : current + 1
        )
    }

    const previousImage = () => {
        setSelectedImage((current) =>
            current === 0 ? property.images.length - 1 : current - 1
        )
    }

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this property?"
        )

        if (!confirmed) {
            return
        }

        const resultAction = await dispatch(
            removeProperty({
                id,
                token
            })
        )

        if (removeProperty.fulfilled.match(resultAction)) {
            navigate("/properties")
        }
    }

    const handleFavorite = async () => {
        if (!token) {
            return
        }

        if (isFavorite) {
            const resultAction = await dispatch(
                deleteFavorite({
                    propertyId: property._id,
                    token
                })
            )

            if (deleteFavorite.fulfilled.match(resultAction)) {
                console.log("Property removed from favorites")
            }

            return
        }

        const resultAction = await dispatch(
            createFavorite({
                propertyId: property._id,
                token
            })
        )

        if (createFavorite.fulfilled.match(resultAction)) {
            console.log("Property added to favorites")
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        if (!token) {
            return
        }

        await dispatch(
            addReview({
                reviewData: {
                    propertyId: property._id,
                    rating: Number(rating),
                    comment
                },
                token
            })
        )

        setRating(5)
        setComment("")
    }

    const handleDeleteReview = (reviewId) => {
        dispatch(
            removeReview({
                reviewId,
                token
            })
        )
    }

    const handleUpdateReview = async (e) => {
        e.preventDefault()

        await dispatch(
            editReview({
                reviewId: editingReview._id,
                reviewData: {
                    rating: Number(editRating),
                    comment: editComment
                },
                token
            })
        )

        setEditingReview(null)
    }


    return (
        <div className="max-w-5xl mx-auto p-6">

            {property.images && property.images.length > 0 ? (
                <div className="mb-8">

                    <div className="relative">

                        <img
                            src={property.images[selectedImage]}
                            alt={property.title}
                            className="w-full h-[450px] object-cover rounded-lg"
                        />

                        <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black/70"
                        >
                            ←
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black/70"
                        >
                            →
                        </button>

                    </div>

                    <div className="flex gap-3 mt-4 overflow-x-auto">
                        {property.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`flex-shrink-0 ${
                                    selectedImage === index
                                        ? "ring-4 ring-blue-500"
                                        : ""
                                }`}
                            >
                                <img
                                    src={image}
                                    alt={`${property.title} ${index + 1}`}
                                    className="w-24 h-20 object-cover rounded"
                                />
                            </button>
                        ))}
                    </div>

                </div>
            ) : (
                <div className="w-full h-[450px] bg-gray-200 flex items-center justify-center rounded-lg mb-8">
                    <span className="text-gray-500 text-lg">
                        No Images Available
                    </span>
                </div>
            )}

            <h1 className="text-3xl font-bold">
                {property.title}
            </h1>

            <p className="text-gray-600 mt-3">
                {property.description}
            </p>

            <div className="mt-6 space-y-3">
                <p>
                <strong>Price:</strong>{" "}
                    Rs. {property.price.toLocaleString()}
                </p>

                <p>
                <strong>Location:</strong> {property.location}
                </p>

                <p>
                <strong>Property Type:</strong>{" "}
                    {property.propertyType}
                </p>

                <p>
                <strong>Listing Type:</strong>{" "}
                    {property.listingType}
                </p>

                <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
                </p>

                <p>
                <strong>Bathrooms:</strong> {property.bathrooms}
                </p>

                <p>
                <strong>Area:</strong> {property.area}
                </p>

                <p>
                <strong>Status:</strong> {property.status}
                </p>
            </div>

            {property.amenities?.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">
                        Amenities
                    </h2>

                    <ul className="list-disc ml-6 mt-2">
                        {property.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>
            )}

            {property.owner && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">
                        Listed By
                    </h2>

                    <p className="mt-2">
                        {property.owner.name}
                    </p>

                    <p>{property.owner.email}</p>
                </div>
            )}

            {user && (
                <button
                    onClick={handleFavorite}
                    className="text-3xl"
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? (
                        <FaHeart className="text-red-600" />
                    ) : (
                        <FaRegHeart className="text-gray-400" />
                    )}
                </button>
            )}

            {isOwner && (
                <div className="flex gap-3 mt-6">
                    <Link
                        to={`/properties/${property._id}/edit`}
                        className="bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        Edit Property
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-5 py-2 rounded"
                    >
                        Delete Property
                    </button>
                </div>
            )}

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                    Reviews
                </h2>

                {user && (
                    <form
                        onSubmit={handleReviewSubmit}
                        className="border p-5 rounded-lg mb-8"
                    >
                        <h3 className="text-xl font-semibold mb-4">
                            Write a Review
                        </h3>

                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="text-3xl"
                                >
                                    <FaStar
                                        className={
                                            star <= rating
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            placeholder="Write your review..."
                            rows="4"
                            className="w-full border p-3 rounded mb-4"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Submit Review
                        </button>
                    </form>
                )}

                {reviewsLoading && (
                    <p>Loading reviews...</p>
                )}

                {reviewsError && (
                    <p className="text-red-500">
                        {reviewsMessage}
                    </p>
                )}

                {!reviewsLoading &&
                    reviews.length === 0 && (
                        <p>No reviews yet.</p>
                    )}

                <div className="space-y-4">
                    {reviews.map((review) => {

                        return (
                        <div
                            key={review._id}
                            className="border p-4 rounded-lg"
                        >
                            <h3 className="font-semibold">
                                {review.user?.name}
                            </h3>

                            <div className="flex gap-1">
                                {Array.from({ length: review.rating }).map((_, index) => (
                                    <FaStar key={index} />
                                ))}
                            </div>

                            <p className="mt-2">
                                {review.comment}
                            </p>

                            {review.user?._id === user?.userId && (
                                <div className="mt-4 flex gap-2">

                                    <button onClick={() => {
                                            setEditingReview(review);
                                            setEditRating(review.rating);
                                            setEditComment(review.comment);
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button onClick={() =>
                                            handleDeleteReview(review._id)
                                        }
                                        className="bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </div>
                            )}
                        </div>
                    )})}

                    {editingReview && (
                        <form
                            onSubmit={handleUpdateReview}
                            className="border p-5 rounded-lg mb-8"
                        >
                            <h3 className="text-xl font-semibold mb-4">
                                Edit Review
                            </h3>

                            <div className="flex gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setEditRating(star)}
                                        className="text-3xl"
                                    >
                                        <FaStar
                                            className={
                                                star <= editRating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={editComment}
                                onChange={(e) =>
                                    setEditComment(e.target.value)
                                }
                                rows="4"
                                className="w-full border p-3 rounded mb-4"
                            />

                            <div className="flex gap-2">

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-5 py-2 rounded"
                                >
                                    Update Review
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingReview(null)
                                    }
                                    className="bg-gray-500 text-white px-5 py-2 rounded"
                                >
                                    Cancel
                                </button>

                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails