import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

interface MusicPlayer {
  history: Array<SoundInfo>;
  queue: Array<SoundInfo>;
  currentTrack: SoundInfo;
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
  history: [],
  queue: [],
  currentTrack: {
    soundId: null,
    soundName: '',
    artistName: '',
    soundURL: '',
    albumCover: '',
  },
  error: null,
};

const musicPlayer = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    loadMusic(state, action: PayloadAction<SoundInfo>): void {
      state.currentTrack = {
        soundId: action?.payload?.soundId,
        soundName: action?.payload?.soundName,
        soundURL: action?.payload?.soundURL,
        artistName: action?.payload?.artistName,
        albumCover: action?.payload?.albumCover as string,
      };
    },
    addMusicToQueue(state, action: PayloadAction<{ soundInfo: SoundInfo; position?: number }>): void {
      if (action.payload.position !== undefined) {
        const currentState = state.queue;
        // currentState[action.payload.position] = action.payload.soundInfo;
        currentState.splice(action.payload.position, 0, action.payload.soundInfo);
        state.queue = currentState;
      } else {
        state.queue = [...state.queue, action.payload.soundInfo];
      }
    },
    removeMusicFromQueue(state, action: PayloadAction<{ soundID?: string; position?: number }>): void {
      if (state.queue.length > 1) {
        if (action.payload.position !== undefined) {
          const currentState = state.queue;
          currentState.splice(action.payload.position, 1);
          state.queue = currentState;
        } else {
          state.queue = state.queue.filter((item: SoundInfo) => item.soundId !== action.payload.soundID);
        }
      }
    },
    addMusicToHistory(state, action: PayloadAction<SoundInfo>): void {
      console.log(action);
      state.history = [...state.history, action.payload];
    },
    removeMusicFromHistory(state, action: PayloadAction<{ soundID?: string; position?: number }>): void {
      if (state.history.length > 1) {
        if (action.payload.position !== undefined) {
          const currentState = state.history;
          currentState.splice(action.payload.position, 1);
          state.history = currentState;
        } else {
          state.history = state.history.filter((item: SoundInfo) => item.soundId !== action.payload.soundID);
        }
      }
    },
  },
});

export const {
  loadMusic,
  addMusicToQueue,
  removeMusicFromQueue,
  addMusicToHistory,
  removeMusicFromHistory,
} = musicPlayer.actions;

export default musicPlayer.reducer;
