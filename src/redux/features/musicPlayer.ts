import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

interface MusicPlayer {
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
    loadMusic(
      state,
      action: PayloadAction<{
        soundId: string;
        artistName: string;
        soundName: string;
        soundURL: string;
        albumCover: string | null;
      }>,
    ): void {
      state.currentTrack = {
        soundId: action?.payload?.soundId,
        soundName: action?.payload?.soundName,
        soundURL: action?.payload?.soundURL,
        artistName: action?.payload?.artistName,
        albumCover: action?.payload?.albumCover as string,
      };
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

export const { loadMusic, addMusicToQueue, removeMusicFromQueue } = musicPlayer.actions;

export default musicPlayer.reducer;
