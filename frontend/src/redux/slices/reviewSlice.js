import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPropertyReviews, createReview, updateReview,
    deleteReview
} from "../../services/reviewService"

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (propertyId, thunkAPI) => {
        try {
            return await getPropertyReviews(propertyId)
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addReview = createAsyncThunk(
    "reviews/addReview",
    async ({ reviewData, token }, thunkAPI) => {
        try {
            return await createReview(reviewData, token)
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const editReview = createAsyncThunk(
    "reviews/editReview",
    async ({ reviewId, reviewData, token },thunkAPI) => {
        try {
            return await updateReview(reviewId, reviewData, token)
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const removeReview = createAsyncThunk(
    "reviews/removeReview",
    async ({ reviewId, token }, thunkAPI) => {
        try {
            await deleteReview(reviewId, token)

            return reviewId
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    reviews: [],
    isLoading: false,
    isError: false,
    message: ""
}

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchReviews.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.message = ""
            }
        )
        .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false
                state.reviews = action.payload
            }
        )
        .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
        )
        .addCase(addReview.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.message = ""
            }
        )
        .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.reviews.unshift(action.payload)
            }
        )
        .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
        )
        .addCase(editReview.fulfilled, (state, action) => {
                const index =state.reviews.findIndex(
                        (review) => review._id === action.payload._id
                    )

                if (index !== -1) {
                    state.reviews[index] = action.payload
                }
            }
        )
        .addCase(removeReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(
                    (review) => review._id !== action.payload
                )
            }
        )
    }
})

export default reviewSlice.reducer