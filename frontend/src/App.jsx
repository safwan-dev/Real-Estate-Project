import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Properties from "./pages/Properties"
import PropertyDetails from "./pages/PropertyDetails"
import CreateProperty from "./pages/CreateProperty"
import EditProperty from "./pages/EditProperty"
import Favorites from "./pages/Favorites"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/properties/create" element={<CreateProperty />} />
          <Route path="/properties/:id/edit" element={<EditProperty />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
