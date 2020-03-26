import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Track {
  title: string;
  listen_url: string;
  tags: Array<string>;
  copyright: string;
}

interface TracksState {
  tracks: Array<Track>;
  loading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: null,
};

const tracks = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    fetchTracksStart(state): void {
      state.loading = true;
      state.error = null;
    },
    fetchTracksSuccess(state, action: PayloadAction<Array<Track>>): void {
      state.tracks = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTracksFailure(state, action: PayloadAction<string>): void {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure } = tracks.actions;
export default tracks.reducer;
