import { configureStore, getDefaultMiddleware, AnyAction } from '@reduxjs/toolkit';
import { rootReducer, rootEpic, RootReducer } from './features/root';
import { FetchTrackEpicAction } from './features/tracks';
import { createEpicMiddleware } from 'redux-observable';

type EpicMiddlewareRoot = FetchTrackEpicAction;

const epicMiddleware = createEpicMiddleware<EpicMiddlewareRoot, EpicMiddlewareRoot, RootReducer>();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    epicMiddleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

epicMiddleware.run(rootEpic);

export default store;
