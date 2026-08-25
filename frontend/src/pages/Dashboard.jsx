import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../redux/slices/authSlice"
import { fetchProperties } from "../redux/slices/propertySlice"
import { fetchFavorites } from "../redux/slices/favoriteSlice"

function Dashboard() {
    const dispatch = useDispatch()

    const { user, token } = useSelector(
        (state) => state.auth
    )

    const { properties } = useSelector(
        (state) => state.properties
    )

    const { favorites } = useSelector(
        (state) => state.favorites
    )

    useEffect(() => {
        if (token) {
            dispatch(
                fetchProperties({
                    page: 1,
                    limit: 100
                })
            )

            dispatch(
                fetchFavorites(token)
            )
        }
    }, [dispatch, token])

    const handleLogout = () => {
        dispatch(logout())
    }

    const myProperties = properties.filter(
        (property) =>
            property.owner?._id === user?._id
    )

    return (
        <div className="max-w-7xl mx-auto p-6">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-600 mt-2">
                    Welcome back, {user?.name}!
                </p>
            </div>

            <div className="bg-white border rounded-lg p-6 mb-8 shadow-sm">

                <h2 className="text-xl font-semibold mb-4">
                    Account Information
                </h2>

                <div className="space-y-2">

                    <p>
                        <strong>Name:</strong>{" "}
                        {user?.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {user?.email}
                    </p>

                    <p>
                        <strong>Role:</strong>{" "}
                        {user?.role || "User"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <div className="bg-blue-600 text-white p-6 rounded-lg">
                    <h2 className="text-lg">
                        My Properties
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {myProperties.length}
                    </p>
                </div>

                <div className="bg-green-600 text-white p-6 rounded-lg">
                    <h2 className="text-lg">
                        Favorites
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {favorites.length}
                    </p>
                </div>

                <div className="bg-purple-600 text-white p-6 rounded-lg">
                    <h2 className="text-lg">
                        Account
                    </h2>

                    <p className="text-xl font-bold mt-2">
                        Active
                    </p>
                </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Quick Actions
                </h2>

                <div className="flex flex-wrap gap-4">

                    <Link
                        to="/properties/create"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Add Property
                    </Link>

                    <Link
                        to="/properties"
                        className="bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800"
                    >
                        Browse Properties
                    </Link>

                    <Link
                        to="/favorites"
                        className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
                    >
                        My Favorites
                    </Link>
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="mt-8 bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    )
}

export default Dashboard