import { configureStore, getDefaultMiddleware, AnyAction } from '@reduxjs/toolkit';
import { rootReducer, rootEpic, RootReducerType as RootReducer } from './features/root';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootReducer>();

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
