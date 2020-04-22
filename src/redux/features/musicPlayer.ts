import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

interface MusicPlayer {
  isPlaying: boolean;
  soundName: string;
  artistName: string;
  soundURL: string;
  albumCover: string;
  isPaused: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: MusicPlayer = {
  soundName: '',
  artistName: '',
  soundURL: '',
  albumCover: '',
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  error: null,
};

const musicPlayer = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    loadMusic(
      state,
      action: PayloadAction<{ artistName: string; soundName: string; soundURL: string; albumCover: string | null }>,
    ): void {
      state.soundName = action?.payload?.soundName;
      state.soundURL = action?.payload?.soundURL;
      state.artistName = action?.payload?.artistName;
      state.albumCover = action?.payload?.albumCover as string;
      state.isLoading = true;
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
