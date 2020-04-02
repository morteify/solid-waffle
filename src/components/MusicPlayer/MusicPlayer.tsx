import React, { useState, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { playMusicRequest, pauseMusic } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import styled from 'styled-components';

const Container = styled.div`
  height: 4rem;
  width: 100vw;
  position: fixed;
  z-index: 2;
  bottom: 0;
  display: flex;
  flex-direction: row;
  background-color: coral;
`;

interface MusicPlayer {
  soundName?: string;
}

function MusicPlayer(): JSX.Element {
  const dispatch = useDispatch();
  const currentSoundName = useSelector((state: RootReducer) => state.musicPlayer.soundName);
  const currentSoundURL = useSelector((state: RootReducer) => state.musicPlayer.soundURL);
  const shouldSoundPlay = useSelector((state: RootReducer) => state.musicPlayer.isPlaying);
  const howlerSound = useMusicPlayer({ songURL: currentSoundURL });
  howlerSound.play();
  return (
    <Container>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'beige' }}>
        {currentSoundName ? currentSoundName : 'Song title'}
      </div>
      <div
        style={{ width: '100px', height: '100px', backgroundColor: 'green' }}
        onClick={(event) => {
          if (shouldSoundPlay) {
            console.log('should play');
          }
          howlerSound.play();
        }}
      >
        Play
      </div>
      <div
        style={{ width: '100px', height: '100px', backgroundColor: 'red' }}
        onClick={(event) => {
          howlerSound.pause();
          dispatch(pauseMusic());
        }}
      >
        Pause
      </div>
    </Container>
  );
}

export default MusicPlayer;
