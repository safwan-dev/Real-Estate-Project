import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Login from "../pages/Login"

function ProtectedRoute() {
    const { isAuthenticated } = useSelector(
        (state) => state.auth
    )

    if (!isAuthenticated){
        <Navigate to="/Login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute