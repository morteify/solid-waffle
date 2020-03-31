import React, { useState, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure, TracksType } from '../../redux/features/tracks';
import { playMusicRequest } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';

const selectTracksList = createSelector(
  (state: RootReducer) => state.tracks.tracks,
  (tracks) => tracks,
);

function TracksView(): JSX.Element {
  const dispatch = useDispatch();
  const tracks = useSelector(selectTracksList);

  useEffect(() => {
    dispatch(fetchTracksStart());
  }, []);

  return (
    <>
      <div>Songs view</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tracks?.map((track, index) => (
          <div key={index}>
            <p
              onClick={(): void => {
                dispatch(
                  playMusicRequest({ soundURL: 'https://funkwhale.it' + track.listen_url, soundName: track.title }),
                );
              }}
            >
              {track.title}
            </p>
            <p>{track.listen_url}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TracksView;
