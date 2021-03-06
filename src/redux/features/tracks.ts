import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { RootReducer } from './root';

export interface Track {
  title: string;
  listen_url: string;
  tags: Array<string>;
  copyright: string;
}

interface TracksApiResponse {
  results: Array<Track>;
}

interface TracksState {
  tracks: Array<Track>;
  isLoading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  isLoading: false,
  error: null,
};

const tracks = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    fetchTracksStart(state): void {
      state.isLoading = true;
      state.error = null;
    },
    fetchTracksSuccess(state, action: PayloadAction<TracksApiResponse>): void {
      state.tracks = action?.payload?.results;
      state.isLoading = false;
      state.error = null;
    },
    fetchTracksFailure(state, action: PayloadAction<string>): void {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export type TracksType = ReturnType<typeof tracks.reducer>;

export const { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure } = tracks.actions;

export type FetchTrackEpicAction =
  | ReturnType<typeof fetchTracksSuccess>
  | ReturnType<typeof fetchTracksFailure>
  | ReturnType<typeof fetchTracksStart>;

export const fetchTracksEpic: Epic<FetchTrackEpicAction, FetchTrackEpicAction> = (action$, state$) =>
  action$.pipe(
    ofType(fetchTracksStart.type),
    mergeMap((action) =>
      ajax.getJSON(`${state$.value.currentSession?.url}/api/v1/tracks`).pipe(
        map((response) => fetchTracksSuccess(response as TracksApiResponse)),
        catchError((error) => of(fetchTracksFailure(JSON.stringify(error)))),
      ),
    ),
  );

export default tracks.reducer;
