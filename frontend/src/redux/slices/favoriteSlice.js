import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFavorites, addFavorite, removeFavorite } from "../../services/favoriteService"

export const fetchFavorites = createAsyncThunk(
    "favorites/fetchFavorites",
    async (token, thunkAPI) => {
        try{
            return await getFavorites(token)
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const createFavorite = createAsyncThunk(
    "favorites/createFavorite",
    async ({propertyId, token}, thunkAPI) => {
        try {
            return await addFavorite(propertyId, token);
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteFavorite = createAsyncThunk(
    "favorites/deleteFavorite",
    async ({propertyId, token}, thunkAPI) => {
        try {
            await removeFavorite(propertyId, token)
            return propertyId
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    favorites: [],
    isLoading: false,
    isError: false,
    message: ""
}

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchFavorites.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        .addCase(fetchFavorites.fulfilled, (state, action) => {
            state.isLoading = false
            state.favorites = action.payload
        })
        .addCase(fetchFavorites.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createFavorite.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        .addCase(createFavorite.fulfilled, (state, action) => {
            state.isLoading = false
            state.favorites.push(action.payload)
        })
        .addCase(createFavorite.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteFavorite.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        .addCase(deleteFavorite.fulfilled, (state, action) => {
            state.isLoading = false

            state.favorites = state.favorites.filter(
                (favorite) => favorite.property?._id !== action.payload
            )
        })
        .addCase(deleteFavorite.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export default favoriteSlice.reducer