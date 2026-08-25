import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProperties } from "../redux/slices/propertySlice"
import PropertyCard from "../components/PropertyCard"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

function Properties() {
    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        search: "",
        propertyType: "",
        listingType: "",
        minPrice: "",
        maxPrice: ""
    })

    const { properties, currentPage, totalPages, 
        totalProperties, isLoading, isError, message,
    } = useSelector((state) => state.properties)

    useEffect(() => {
        dispatch(fetchProperties({
            page: 1,
            limit: 6
        }))
    }, [dispatch])

    if (isLoading){
        return <Loading />
    }

    if (isError){
        return <ErrorMessage message={message} />
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Available Properties
            </h1>

            <div className="bg-gray-100 p-5 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Search & Filter
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                    <input
                        type="text"
                        placeholder="Search location or title"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                search: e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    />

                    <select
                        value={filters.propertyType}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                propertyType: e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    >
                        <option value="">
                            All Property Types
                        </option>

                        <option value="house">
                            House
                        </option>

                        <option value="apartment">
                            Apartment
                        </option>

                        <option value="villa">
                            Villa
                        </option>

                        <option value="plot">
                            Plot
                        </option>

                        <option value="commercial">
                            Commercial
                        </option>
                    </select>

                    <select
                        value={filters.listingType}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                listingType: e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    >
                        <option value="">
                            Sale or Rent
                        </option>

                        <option value="sale">
                            For Sale
                        </option>

                        <option value="rent">
                            For Rent
                        </option>
                    </select>

                    <input
                        type="number"
                        placeholder="Minimum price"
                        value={filters.minPrice}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                minPrice: e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    />

                    <input
                        type="number"
                        placeholder="Maximum price"
                        value={filters.maxPrice}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                maxPrice: e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    />

                </div>
                <div className="mt-4 flex gap-3">
                        
                    <button
                        onClick={() => dispatch(fetchProperties({
                            ...filters,
                            page: 1,
                            limit: 6
                        }))}
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>

                    <button
                        onClick={() => {
                            const emptyFilters = {
                                search: "",
                                propertyType: "",
                                listingType: "",
                                minPrice: "",
                                maxPrice: ""
                            }

                            setFilters(emptyFilters)
                            dispatch(fetchProperties({
                                ...emptyFilters,
                                page: 1,
                                limit: 6
                            }))
                        }}
                        className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {properties.length === 0 ? (
                <p>No properties found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => {
                            const newPage = currentPage - 1

                            dispatch(
                                fetchProperties({
                                    ...filters,
                                    page: newPage,
                                    limit: 6
                                })
                            )
                        }}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => {
                                dispatch(
                                    fetchProperties({
                                        ...filters,
                                        page: pageNumber,
                                        limit: 6
                                    })
                                )
                            }}
                            className={`px-4 py-2 border rounded ${
                                currentPage === pageNumber
                                    ? "bg-blue-600 text-white"
                                    : ""
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => {
                            const newPage = currentPage + 1

                            dispatch(
                                fetchProperties({
                                    ...filters,
                                    page: newPage,
                                    limit: 6
                                })
                            )
                        }}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>
            )}
        </div>
    )
}

export default Properties