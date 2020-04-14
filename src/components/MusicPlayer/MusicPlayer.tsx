import React, { useState, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { pauseMusic, playMusic } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Slider, Switch } from 'antd';

const Container = styled.div`
  height: 5rem;
  width: 100vw;
  position: fixed;
  z-index: 2;
  bottom: 0;
  display: flex;
  flex-direction: row;
  background-color: coral;
`;

const AlbumCoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlbumCover = styled(Avatar)`
  width: 4.5rem;
  height: 4.5rem;
`;

interface MusicPlayer {
  soundName?: string;
}

function MusicPlayer(): JSX.Element {
  const dispatch = useDispatch();
  const currentSoundName = useSelector((state: RootReducer) => state.musicPlayer.soundName);
  const currentSongCover = useSelector((state: RootReducer) => state.musicPlayer.albumCover);
  const [howlerSound, volume, setVolume, toggleSoundMute] = useMusicPlayer();
  return (
    <Container>
      <AlbumCoverContainer>
        {currentSongCover ? <AlbumCover shape="square" src={currentSongCover} /> : <p>{"Song's album cover"}</p>}
      </AlbumCoverContainer>
      <div
        style={{ width: '100px', height: '100px', backgroundColor: 'green' }}
        onClick={(): void => {
          dispatch(playMusic());
        }}
      >
        Play
      </div>
      <div
        style={{ width: '100px', height: '100px', backgroundColor: 'red' }}
        onClick={(): void => {
          dispatch(pauseMusic());
        }}
      >
        Pause
      </div>
      <div
        style={{ width: '100px', height: '100px', backgroundColor: 'pink' }}
        onClick={(): void => {
          toggleSoundMute();
        }}
      >
        Mute
      </div>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}>
        Volume: {volume}
        <Slider
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(value: any): void => setVolume(value as number)}
        />
      </div>
    </Container>
  );
}

export default MusicPlayer;
