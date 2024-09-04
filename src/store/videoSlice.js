// src/store/videoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVideosByPlaylist = createAsyncThunk(
  'videos/fetchVideosByPlaylist',
  async (playlistId) => {
    const response = await axios.post(
      'https://5yiek6g5g0.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1',
      { Index: 1, ContentType: [2], IsTagged: false, URL: "" },
      {
        headers: {
          'X-Api-Key': 'MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr',
          'X-Tenant-Key': 'TYKE070323'
        }
      }
    );
    console.log(response.data.data.Feeds)
    return response.data.data.Feeds;
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosByPlaylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideosByPlaylist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchVideosByPlaylist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default videoSlice.reducer;
