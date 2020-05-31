import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

interface AlbumsApiResponse {
  results: Array<any>;
}

interface TracksState {
  albums: Array<any>;
  isLoading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  albums: [],
  isLoading: false,
  error: null,
};

const albums = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    fetchAlbumsStart(state): void {
      state.isLoading = true;
      state.error = null;
    },
    fetchAlbumsSuccess(state, action: PayloadAction<AlbumsApiResponse>): void {
      state.albums = action.payload.results;
      state.isLoading = false;
      state.error = null;
    },
    fetchAlbumsFailure(state, action: PayloadAction<string>): void {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export type TracksType = ReturnType<typeof albums.reducer>;

export const { fetchAlbumsStart, fetchAlbumsSuccess, fetchAlbumsFailure } = albums.actions;

export type FetchAlbumsEpicAction =
  | ReturnType<typeof fetchAlbumsSuccess>
  | ReturnType<typeof fetchAlbumsFailure>
  | ReturnType<typeof fetchAlbumsStart>;

export const fetchAlbumsEpic: Epic<FetchAlbumsEpicAction, FetchAlbumsEpicAction> = (action$) =>
  action$.pipe(
    ofType(fetchAlbumsStart.type),
    mergeMap((action) =>
      ajax.getJSON('https://audio.liberta.vip/api/v1/albums').pipe(
        map((response) => fetchAlbumsSuccess(response as AlbumsApiResponse)),
        catchError((error) => of(fetchAlbumsFailure(JSON.stringify(error)))),
      ),
    ),
  );

export default albums.reducer;
