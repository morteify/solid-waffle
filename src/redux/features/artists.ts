import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

interface ArtistsApiResponse {
  results: Array<any>;
}

interface TracksState {
  artists: Array<any>;
  isLoading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  artists: [],
  isLoading: false,
  error: null,
};

const artists = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    fetchArtistsStart(state): void {
      state.isLoading = true;
      state.error = null;
    },
    fetchArtistsSuccess(state, action: PayloadAction<any>): void {
      state.artists = action.payload.results;
      state.isLoading = false;
      state.error = null;
    },
    fetchArtistsFailure(state, action: PayloadAction<string>): void {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export type TracksType = ReturnType<typeof artists.reducer>;

export const { fetchArtistsStart, fetchArtistsSuccess, fetchArtistsFailure } = artists.actions;

export type FetchArtistsEpicAction =
  | ReturnType<typeof fetchArtistsSuccess>
  | ReturnType<typeof fetchArtistsFailure>
  | ReturnType<typeof fetchArtistsStart>;

export const fetchArtistsEpic: Epic<FetchArtistsEpicAction, FetchArtistsEpicAction> = (action$) =>
  action$.pipe(
    ofType(fetchArtistsStart.type),
    mergeMap((action) =>
      ajax.getJSON('https://audio.liberta.vip/api/v1/artists').pipe(
        map((response) => fetchArtistsSuccess(response as ArtistsApiResponse)),
        catchError((error) => of(fetchArtistsFailure(JSON.stringify(error)))),
      ),
    ),
  );

export default artists.reducer;
