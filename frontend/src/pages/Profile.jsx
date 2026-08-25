import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function Profile() {
    const { token } = useSelector((state) => state.auth)

    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch profile"
                    )
                }

                setUser(data.user)
            }
            catch (error) {
                setError(error.message)
            }
        }

        if (token) {
            fetchProfile()
        }
    }, [token])

    const handleChangePassword = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setSuccess("")

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        newPassword
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to change password"
                )
            }

            setSuccess(data.message)
            setNewPassword("")
            setIsChangingPassword(false)
        }
        catch (error) {
            setError(error.message)
        }
    }

    if (error && !user) {
        return <p>{error}</p>
    }

    if (!user) {
        return <p>Loading profile...</p>
    }

    return (
        <div className="max-w-2xl mx-auto p-6">

            <div className="bg-white shadow-md rounded-lg p-6">

                <h1 className="text-3xl font-bold mb-6">
                    My Profile
                </h1>

                <div className="space-y-4">

                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <p>
                        <strong>Role:</strong> {user.role}
                    </p>
                </div>

                {success && (
                    <p className="text-green-600 mt-6">
                        {success}
                    </p>
                )}

                {isChangingPassword ? (
                    <form
                        onSubmit={handleChangePassword}
                        className="mt-8"
                    >

                        <h2 className="text-xl font-semibold mb-4">
                            Change Password
                        </h2>

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                                className="w-full border p-3 rounded"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 mb-4">
                                {error}
                            </p>
                        )}

                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2 rounded"
                            >
                                Change Password
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsChangingPassword(false)
                                    setNewPassword("")
                                    setError("")
                                }}
                                className="bg-gray-500 text-white px-5 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => {
                            setIsChangingPassword(true)
                            setError("")
                            setSuccess("")
                        }}
                        className="mt-8 bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        Change Password
                    </button>
                )}
            </div>
        </div>
    )
}

export default Profile