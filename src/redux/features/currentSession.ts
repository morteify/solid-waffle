import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TracksState {
  url: string | null;
}

const initialState: TracksState = {
  url: null,
};

const currentSession = createSlice({
  name: 'currentSession',
  initialState,
  reducers: {
    setInstanceUrl(state, action: PayloadAction<{ url: string }>): void {
      state.url = action.payload.url;
    },
  },
});

export type CurrentSessionType = ReturnType<typeof currentSession.reducer>;

export const { setInstanceUrl } = currentSession.actions;

export default currentSession.reducer;
