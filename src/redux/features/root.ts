import tracks from './tracks';
import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { fetchTracksEpic } from './tracks';

export const rootEpic = combineEpics(fetchTracksEpic);

export const rootReducer = combineReducers({
  tracks,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
