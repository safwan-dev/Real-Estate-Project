import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/slices/authSlice"
import { FiMenu, FiX } from "react-icons/fi"

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { user } = useSelector(
        (state) => state.auth
    )

    const handleLogout = () => {
        dispatch(logout())
        setIsMenuOpen(false)
        navigate("/login")
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center justify-between">

                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        RealEstate
                    </Link>

                    <div className="hidden md:flex items-center gap-6">

                        <Link
                            to="/"
                            className="hover:text-blue-600 transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/properties"
                            className="hover:text-blue-600 transition"
                        >
                            Properties
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to="/favorites"
                                    className="hover:text-blue-600 transition"
                                >
                                    Favorites
                                </Link>

                                <Link
                                    to="/dashboard"
                                    className="hover:text-blue-600 transition"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/profile"
                                    className="hover:text-blue-600 transition"
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-blue-600 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-2xl text-gray-700"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden flex flex-col gap-4 mt-5 pb-2 border-t pt-4">

                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="hover:text-blue-600"
                        >
                            Home
                        </Link>

                        <Link
                            to="/properties"
                            onClick={closeMenu}
                            className="hover:text-blue-600"
                        >
                            Properties
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to="/favorites"
                                    onClick={closeMenu}
                                    className="hover:text-blue-600"
                                >
                                    Favorites
                                </Link>

                                <Link
                                    to="/dashboard"
                                    onClick={closeMenu}
                                    className="hover:text-blue-600"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="hover:text-blue-600"
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-600 text-white px-4 py-2 rounded w-fit hover:bg-blue-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="hover:text-blue-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="bg-blue-600 text-white px-4 py-2 rounded w-fit hover:bg-blue-700"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar