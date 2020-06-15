import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import tracks, { fetchTracksEpic } from './tracks';
import musicPlayer from './musicPlayer';
import albums, { fetchAlbumsEpic } from './albums';
import artists, { fetchArtistsEpic } from './artists';
import currentSession from './currentSession';

export const rootEpic = combineEpics(fetchTracksEpic, fetchAlbumsEpic, fetchArtistsEpic);

export const rootReducer = combineReducers({
  currentSession,
  tracks,
  albums,
  musicPlayer,
  artists,
});

export type RootReducer = ReturnType<typeof rootReducer>;
