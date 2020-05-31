import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import tracks, { fetchTracksEpic } from './tracks';
import musicPlayer from './musicPlayer';
import albums, { fetchAlbumsEpic } from './albums';

export const rootEpic = combineEpics(fetchTracksEpic, fetchAlbumsEpic);

export const rootReducer = combineReducers({
  tracks,
  albums,
  musicPlayer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
