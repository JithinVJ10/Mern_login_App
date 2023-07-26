import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual backend server URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk for fetching users from the backend
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axiosInstance.get('/api/users'); // Using axiosInstance
  return response.data.user;
});

// Thunk for updating a user by their ID
export const updateUserById = createAsyncThunk(
  'users/updateUserById',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/users/${data._id}`, data); // Using axiosInstance
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific user in the state
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectUsers = (state) => state.users.users;

export default adminSlice.reducer;
