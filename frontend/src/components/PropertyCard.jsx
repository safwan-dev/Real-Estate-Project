import { Link } from "react-router-dom"

function PropertyCard({ property }) {
    return (
        <Link
            to={`/properties/${property._id}`}
            className="block group"
        >

            <div className="border rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition duration-300">

                {property.images && property.images.length > 0 ? (
                    <div className="relative overflow-hidden">

                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                        />

                        <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm capitalize">
                            {property.listingType}
                        </span>

                    </div>
                ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">
                            No Image Available
                        </span>
                    </div>
                )}

                <div className="p-5">

                    <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">
                        {property.title}
                    </h2>

                    <p className="text-gray-500 mt-2 line-clamp-2">
                        {property.description}
                    </p>

                    <p className="text-xl font-bold text-blue-600 mt-4">
                        Rs. {property.price.toLocaleString()}
                    </p>

                    <p className="text-gray-700 mt-3">
                        {property.location}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-600 mt-3">

                        <span>
                            {property.bedrooms} Beds
                        </span>

                        <span>
                            {property.bathrooms} Baths
                        </span>

                        <span>
                            {property.area} Marla
                        </span>
                    </div>

                    <p className="text-gray-600 capitalize mt-3">
                        {property.propertyType}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PropertyCard