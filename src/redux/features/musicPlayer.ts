import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

interface MusicPlayer {
  isPlaying: boolean;
  soundName: string;
  soundURL: string;
  isPaused: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: MusicPlayer = {
  soundName: '',
  soundURL: '',
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  error: null,
};

const musicPlayer = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    loadMusic(state, action: PayloadAction<any>): void {
      state.soundName = action?.payload?.soundName;
      state.soundURL = action?.payload?.soundURL;
      state.isPaused = false;
      state.isPlaying = false;
    },
    playMusic(state): void {
      state.isPaused = false;
      state.isPlaying = true;
      state.error = null;
      state.isLoading = false;
    },
    pauseMusic(state): void {
      state.isPlaying = false;
      state.isPaused = true;
      state.error = null;
      state.isLoading = false;
    },
    playMusicFailure(state, action: PayloadAction<string>): void {
      state.isPlaying = false;
      state.isPaused = false;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { playMusicFailure, pauseMusic, playMusic, loadMusic } = musicPlayer.actions;

export default musicPlayer.reducer;
