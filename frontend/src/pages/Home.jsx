import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProperties } from "../redux/slices/propertySlice"
import PropertyCard from "../components/PropertyCard"

function Home() {
    const dispatch = useDispatch()

    const { 
        properties,
        isLoading,
        isError,
        message 
    } = useSelector(
        (state) => state.properties
    )

    useEffect(() => {
        dispatch(
            fetchProperties({
                page: 1,
                limit: 3
            })
        )
    }, [dispatch])

    return (
        <div>

            <section className="bg-gradient-to-r from-blue-700 to-blue-500  text-white">
                <div className="max-w-7xl mx-auto px-6 py-28">

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Find Your Perfect Property
                    </h1>

                    <p className="text-lg md:text-xl max-w-2xl mb-8">
                        Discover houses, apartments, villas and
                        commercial properties in your desired location.
                    </p>

                    <Link
                        to="/properties"
                        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                    >
                        Browse Properties
                    </Link>

                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h2 className="text-3xl font-bold">
                            Featured Properties
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Explore some of our latest property listings.
                        </p>
                    </div>

                    <Link
                        to="/properties"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        View All
                    </Link>
                </div>

                {isLoading ? (
                    <p className="text-gray-600">
                        Loading properties...
                    </p>
                ) : isError ? (
                    <p className="text-red-500">
                        {message}
                    </p>
                ) : properties.length === 0 ? (
                    <p className="text-gray-600">
                        No properties available.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {properties.slice(0, 3).map((property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className="bg-gray-100 py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why Choose Us?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-3">
                                Wide Range of Properties
                            </h3>

                            <p className="text-gray-600">
                                Explore houses, apartments, villas,
                                plots and commercial properties.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-3">
                                Trusted Listings
                            </h3>

                            <p className="text-gray-600">
                                Find detailed property information
                                to help you make better decisions.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-3">
                                Easy Property Search
                            </h3>

                            <p className="text-gray-600">
                                Search and filter properties based
                                on location, type, price and listing type.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-blue-600 text-white py-16">

                <div className="max-w-4xl mx-auto px-6 text-center">

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Find Your Next Property?
                    </h2>

                    <p className="text-lg mb-8">
                        Explore our available properties and find
                        the one that fits your needs.
                    </p>

                    <Link
                        to="/properties"
                        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                    >
                        Explore Properties
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home