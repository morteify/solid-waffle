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
    playMusicRequest(state, action: PayloadAction<any>): void {
      state.soundURL = action.payload.soundURL;
      state.soundName = action.payload.soundName;
      state.isPlaying = false;
      state.isPaused = false;
      state.isLoading = true;
      state.error = null;
    },
    playMusicSuccess(state): void {
      state.isPlaying = true;
      state.isPaused = false;
      state.isLoading = false;
    },
    playMusicFailure(state, action: PayloadAction<string>): void {
      state.isPlaying = false;
      state.isPaused = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    pauseMusic(state): void {
      state.isPlaying = false;
      state.isPaused = true;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { playMusicRequest, playMusicFailure, playMusicSuccess, pauseMusic } = musicPlayer.actions;

export default musicPlayer.reducer;
