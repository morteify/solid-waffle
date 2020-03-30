import React, { useState, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure, TracksType } from '../../redux/features/tracks';
import { RootReducer } from '../../redux/features/root';

function createSound(...urls: Array<string>): Howl {
  const sound = new Howl({
    src: [...urls],
    format: ['mp3', 'aac', 'flac', 'oog'],
    volume: 0.5,
    /**
     * html5 Boolean false
     * Set to true to force HTML5 Audio. This should be used for large audio files so
     * that you don't have to wait for the full file to be downloaded and decoded before playing.
     */
    html5: true,
    onend: (): void => {
      console.log('Finished playing!');
    },
  });
  return sound;
}

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
                const sound = createSound('https://funkwhale.it' + track.listen_url);
                sound.play();
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
