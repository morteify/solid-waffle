import tracks from './features/tracks';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  tracks,
});

export default rootReducer;
