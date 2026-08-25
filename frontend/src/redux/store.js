import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import propertyReducer from "./slices/propertySlice"
import favoriteReducer from "./slices/favoriteSlice"
import reviewReducer from "./slices/reviewSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        properties: propertyReducer,
        favorites: favoriteReducer,
        reviews: reviewReducer
    }
})