import React, { useState, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure, TracksType } from '../../redux/features/tracks';
import { RootReducer } from '../../redux/features/root';

interface MusicPlayer {
  soundName?: string;
}

function MusicPlayer({ soundName }: MusicPlayer): JSX.Element {
  return (
    <div>
      <div>Music Player</div>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'beige' }}>
        {soundName ? soundName : 'Song title'}
      </div>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'green' }}>Play</div>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>Pause</div>
    </div>
  );
}

export default MusicPlayer;
