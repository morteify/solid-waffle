import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

interface MusicPlayer {
  queue: Array<SoundInfo>;
  currentTrack: SoundInfo;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  isStopped: boolean;
  error: string | null;
}

export interface SoundInfo {
  soundId: string | null;
  soundName: string;
  artistName: string;
  soundURL: string;
  albumCover: string;
}

const initialState: MusicPlayer = {
  queue: [],
  currentTrack: {
    soundId: null,
    soundName: '',
    artistName: '',
    soundURL: '',
    albumCover: '',
  },
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  isStopped: false,
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
      state.currentTrack = {
        soundId: 'action?.payload?.soundId',
        soundName: action?.payload?.soundName,
        soundURL: action?.payload?.soundURL,
        artistName: action?.payload?.artistName,
        albumCover: action?.payload?.albumCover as string,
      };
      state.isLoading = true;
      state.isStopped = false;
    },
    playMusic(state): void {
      state.isPaused = false;
      state.isPlaying = true;
      state.error = null;
      state.isLoading = false;
      state.isStopped = false;
    },
    pauseMusic(state): void {
      state.isPlaying = false;
      state.isPaused = true;
      state.error = null;
      state.isLoading = false;
      state.isStopped = false;
    },
    stopMusic(state): void {
      state.isPlaying = false;
      state.isPaused = false;
      state.isLoading = false;
      state.isStopped = true;
    },
    playMusicFailure(state, action: PayloadAction<string>): void {
      state.isPlaying = false;
      state.isPaused = false;
      state.isLoading = false;
      state.isStopped = true;
      state.error = action.payload;
    },
    addMusicToQueue(state, action: PayloadAction<{ soundInfo: SoundInfo; position?: number }>): void {
      if (action.payload.position) {
        const currentState = state.queue;
        currentState[action.payload.position] = action.payload.soundInfo;
        state.queue = currentState;
      } else {
        state.queue = [...state.queue, action.payload.soundInfo];
      }
    },
    removeMusicFromQueue(state, action: PayloadAction<string>): void {
      state.queue = state.queue.filter((item: SoundInfo) => item.soundId !== action.payload);
    },
  },
});

export const {
  playMusicFailure,
  pauseMusic,
  playMusic,
  stopMusic,
  loadMusic,
  addMusicToQueue,
  removeMusicFromQueue,
} = musicPlayer.actions;

export default musicPlayer.reducer;
