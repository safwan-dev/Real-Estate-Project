import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProperties, getPropertyById, createProperty,
    updateProperty, deleteProperty
 } from "../../services/propertyService"

export const fetchProperties = createAsyncThunk(
    "properties/fetchProperties",
    async (params = {}, thunkAPI) => {
        try{
            return await getProperties(params)
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const fetchPropertyById = createAsyncThunk(
    "properties/fetchPropertyById",
    async (id, thunkAPI) => {
        try {
            return await getPropertyById(id);
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addProperty = createAsyncThunk(
    "properties/addProperty",
    async ({propertyData, token}, thunkAPI) => {
        try {
            return await createProperty(propertyData, token);
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const editProperty = createAsyncThunk(
    "properties/editProperty",
    async ({id, propertyData, token}, thunkAPI) => {
        try {
            return await updateProperty(id, propertyData, token)
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const removeProperty = createAsyncThunk(
    "properties/removeProperty",
    async ({id, token}, thunkAPI) => {
        try {
            await deleteProperty(id, token)
            return id
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    properties: [],
    property: null,
    currentPage: 1,
    totalPages: 1,
    totalProperties: 0,
    isLoading: false,
    isError: false,
    message: ""
}

const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchProperties.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.message = ""
        })
        .addCase(fetchProperties.fulfilled, (state, action) => {
            state.isLoading = false
            state.properties = action.payload.properties
            state.currentPage = action.payload.currentPage
            state.totalPages = action.payload.totalPages
            state.totalProperties = action.payload.totalProperties
        })
        .addCase(fetchProperties.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(fetchPropertyById.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.message = ""
        })
        .addCase(fetchPropertyById.fulfilled, (state, action) => {
            state.isLoading = false
            state.property = action.payload
        })
        .addCase(fetchPropertyById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(addProperty.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.message = ""
        })
        .addCase(addProperty.fulfilled, (state, action) => {
            state.isLoading = false
            state.properties.push(action.payload)
        })
        .addCase(addProperty.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(editProperty.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.message = ""
        })
        .addCase(editProperty.fulfilled, (state, action) => {
            state.isLoading = false
            state.property = action.payload

            const index = state.properties.findIndex(
                (property) => property._id === action.payload._id
            )

            if (index !== -1) {
                state.properties[index] = action.payload
            }
        })
        .addCase(editProperty.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(removeProperty.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.message = ""
        })
        .addCase(removeProperty.fulfilled, (state, action) => {
            state.isLoading = false

            state.properties = state.properties.filter(
                (property) => property._id !== action.payload
            )

            if (state.property?._id === action.payload) {
                state.property = null
            }
        })
        .addCase(removeProperty.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export default propertySlice.reducer