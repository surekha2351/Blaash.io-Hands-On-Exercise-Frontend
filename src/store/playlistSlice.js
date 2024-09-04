import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async () => {
  const response = await axios.post('https://5yiek6g5g0.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getAllPlayList', 
  {"Content_Type":2}, 
  {
    headers: {
      'X-Api-Key': 'MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr',
      'X-Tenant-Key': 'TYKE070323'
    }
  });
  
  // Log the response to ensure we have the correct structure
  console.log("API Response:", response.data.data);

  return response.data.data; // Ensure this is an array
});

const playlistSlice = createSlice({
  name: 'playlists',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = Array.isArray(action.payload) ? action.payload : []; // Ensure it's an array
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default playlistSlice.reducer; 