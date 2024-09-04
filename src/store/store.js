import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './playlistSlice';
import videoReducer from './videoSlice';

export const store = configureStore({
  reducer: {
    playlists: playlistReducer,
    videos: videoReducer,
  },
});
