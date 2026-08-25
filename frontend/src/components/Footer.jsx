import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-16">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>
                        <h2 className="text-2xl font-bold text-blue-400">
                            RealEstate
                        </h2>

                        <p className="text-gray-400 mt-3">
                            Find your perfect property with
                            our easy-to-use real estate marketplace.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2">

                            <Link
                                to="/"
                                className="text-gray-400 hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                to="/properties"
                                className="text-gray-400 hover:text-white"
                            >
                                Properties
                            </Link>

                            <Link
                                to="/favorites"
                                className="text-gray-400 hover:text-white"
                            >
                                Favorites
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Account
                        </h3>

                        <div className="flex flex-col gap-2">

                            <Link
                                to="/login"
                                className="text-gray-400 hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-gray-400 hover:text-white"
                            >
                                Sign Up
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-gray-400 hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6 text-center">

                    <p className="text-gray-400">
                        © 2026 RealEstate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer