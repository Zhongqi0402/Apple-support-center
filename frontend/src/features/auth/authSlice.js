import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
// Register new user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        // try {
        //     return await authService.register(user)
        // } catch (error) {
        //     const message =
        //         (error.response &&
        //         error.response.data &&
        //         error.response.data.message) ||
        //         error.message ||
        //         error.toString()

        //     return thunkAPI.rejectWithValue(message)
        // }
        console.log(user)
    }
)

// Register new user
export const login = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        // try {
        //     return await authService.register(user)
        // } catch (error) {
        //     const message =
        //         (error.response &&
        //         error.response.data &&
        //         error.response.data.message) ||
        //         error.message ||
        //         error.toString()

        //     return thunkAPI.rejectWithValue(message)
        // }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    //   reset: (state) => {
    //     state.isLoading = false
    //     state.isError = false
    //     state.isSuccess = false
    //     state.message = ''
    //   },
    },
    extraReducers: (builder) => {
    //   builder
    //     .addCase(register.pending, (state) => {
    //       state.isLoading = true
    //     })
    //     .addCase(register.fulfilled, (state, action) => {
    //       state.isLoading = false
    //       state.isSuccess = true
    //       state.user = action.payload
    //     })
    //     .addCase(register.rejected, (state, action) => {
    //       state.isLoading = false
    //       state.isError = true
    //       state.message = action.payload
    //       state.user = null
    //     })
    //     .addCase(login.pending, (state) => {
    //       state.isLoading = true
    //     })
    //     .addCase(login.fulfilled, (state, action) => {
    //       state.isLoading = false
    //       state.isSuccess = true
    //       state.user = action.payload
    //     })
    //     .addCase(login.rejected, (state, action) => {
    //       state.isLoading = false
    //       state.isError = true
    //       state.message = action.payload
    //       state.user = null
    //     })
    //     .addCase(logout.fulfilled, (state) => {
    //       state.user = null
    //     })
    },
})

export default authSlice.reducer