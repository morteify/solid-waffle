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
import { Slider, Row, Col } from 'antd';

const Container = styled.div`
  height: 5rem;
  width: 100vw;
  position: fixed;
  z-index: 2;
  bottom: 0;
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
  const isSongLoaded = useSelector((state: RootReducer) => !state.musicPlayer.isLoading);
  const [
    howlerSound,
    soundID,
    volume,
    setVolume,
    toggleSoundMute,
    currentSoundPosition,
    handleCurrentSoundPosition,
    songDuration,
  ] = useMusicPlayer();
  console.log(songDuration);
  console.log('current', currentSoundPosition);
  return (
    <Container>
      <Row>
        <Col span={8}>
          <AlbumCoverContainer>
            {currentSongCover ? <AlbumCover shape="square" src={currentSongCover} /> : <p>{"Song's album cover"}</p>}
            {currentSoundName}
          </AlbumCoverContainer>
        </Col>
        <Col span={8}>
          <Row>
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
            <div style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}>
              <Slider
                defaultValue={1}
                min={1}
                max={songDuration}
                step={1}
                value={currentSoundPosition}
                onChange={(value: number | [number, number]): void => handleCurrentSoundPosition(value as number)}
              />

              <div>{songDuration && songDuration}</div>
            </div>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
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
                onChange={(value: number | [number, number]): void => setVolume(value as number)}
              />
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MusicPlayer;
