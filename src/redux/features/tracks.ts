import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

export interface Track {
  title: string;
  listen_url: string;
  tags: Array<string>;
  copyright: string;
}

interface TracksState {
  tracks: Array<Track>;
  loading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: null,
};

const tracks = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    fetchTracksStart(state): void {
      state.loading = true;
      state.error = null;
    },
    fetchTracksSuccess(state, action: PayloadAction<any>): void {
      state.tracks = action.payload.results;
      state.loading = false;
      state.error = null;
    },
    fetchTracksFailure(state, action: PayloadAction<string>): void {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure } = tracks.actions;

export const fetchTracksEpic: Epic<ReturnType<typeof fetchTracksStart>, ReturnType<typeof fetchTracksSuccess>> = (
  action$,
) =>
  action$.pipe(
    ofType(fetchTracksStart.type),
    mergeMap((action) =>
      ajax.getJSON('https://funkwhale.it/api/v1/tracks').pipe(
        map((response) => fetchTracksSuccess(response)),
        catchError((error) => of(fetchTracksFailure(JSON.stringify(error)))),
      ),
    ),
  );

export default tracks.reducer;
