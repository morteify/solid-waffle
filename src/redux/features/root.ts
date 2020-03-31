import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import tracks, { fetchTracksEpic } from './tracks';
import musicPlayer from './musicPlayer';

export const rootEpic = combineEpics(fetchTracksEpic);

export const rootReducer = combineReducers({
  tracks,
  musicPlayer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
