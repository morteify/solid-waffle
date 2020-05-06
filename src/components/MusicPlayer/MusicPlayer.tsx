import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { pauseMusic, playMusic } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Slider, Row, Col, Button, Tooltip } from 'antd';
import { Layout } from 'antd';
import {
  SoundOutlined,
  LoadingOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  AudioMutedOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const Container = styled.div`
  height: 80px;
  width: 100vw;
  position: fixed;
  z-index: 2;
  bottom: 0;
  background-color: #ffffff;
  border-top: 2px #f0f0f0 solid;
`;

const TrackContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const SoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AlbumCoverContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  height: 100%;
`;

const AlbumCover = styled(Avatar)`
  width: 4rem;
  height: 4rem;
`;

const SoundName = styled.p`
  font-weight: bold;
  padding-left: 10px;
  margin: 0;
`;

const AristName = styled.p`
  padding-left: 10px;
  margin: 0;
`;

const SoundVolumeControl = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin-right: 15px;
`;

const VolumeSliderContainer = styled.div`
  width: 120px;
`;

const PlaybackControl = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  padding-top: 10px;
`;

const PlayButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SoundProgress = styled(Slider)`
  width: 100%;
  margin: 5px 15px 0 15px;
`;

const PlayButton = styled(PlayCircleOutlined)`
  font-size: 35px;
  color: #c5c9d1;
  &:hover {
    color: #d4d4d4;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const PauseButton = styled(PauseCircleOutlined)`
  font-size: 35px;
  color: #c5c9d1;
  &:hover {
    color: #d4d4d4;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const LoadingIndicator = styled(LoadingOutlined)`
  font-size: 35px;
  color: #c5c9d1;
`;

const SoundButton = styled(SoundOutlined)`
  font-size: 20px;
  color: #c0c0c0;
  &:hover {
    color: #d4d4d4;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const MuteButton = styled(AudioMutedOutlined)`
  font-size: 20px;
  color: #c0c0c0;
  &:hover {
    color: #d4d4d4;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

interface MusicPlayer {
  soundName?: string;
}

function MusicPlayer(): JSX.Element {
  const dispatch = useDispatch();
  const soundURL = useSelector((state: RootReducer) => state.musicPlayer.soundURL);
  const currentSoundName = useSelector((state: RootReducer) => state.musicPlayer.soundName);
  const currentArtistName = useSelector((state: RootReducer) => state.musicPlayer.artistName);
  const currentSongCover = useSelector((state: RootReducer) => state.musicPlayer.albumCover);
  const [timer, setTimer] = useState(0);
  const {
    sound,
    soundID,
    isSoundPlaying,
    playSound,
    pauseSound,
    getVolume,
    setVolume,
    isMuted,
    toggleSoundMute,
    getSoundDuration,
    currentSoundPosition,
    setCurrentSoundPosition,
  } = useMusicPlayer({ soundURL });

  useEffect(() => {
    if (isSoundPlaying) handleCurrentSoundPosition();
    else clearInterval(timer);
  }, [isSoundPlaying]);

  useEffect(() => {
    console.log('currentSoundPosition', currentSoundPosition);
  }, [currentSoundPosition]);

  const handleCurrentSoundPosition = (): void => {
    setTimer(
      setInterval(() => {
        const val = Math.round(sound?.seek(soundID) as number);
        if (!Number.isNaN(val)) setCurrentSoundPosition(val);
      }, 500),
    );
  };

  return (
    <Container>
      <Row>
        <Col span={7}>
          <TrackContainer>
            <AlbumCoverContainer>
              {currentSongCover && <AlbumCover shape="square" src={currentSongCover} />}
            </AlbumCoverContainer>
            <SoundInfo>
              <SoundName>{currentSoundName}</SoundName>
              <AristName>{currentArtistName}</AristName>
            </SoundInfo>
          </TrackContainer>
        </Col>
        <Col span={10}>
          <PlaybackControl>
            {/* <PlayButtonContainer>
              {!isSongLoaded ? (
                <LoadingIndicator />
              ) : isSongPlaying ? (
                <PauseButton onClick={handlePlayButton} />
              ) : (
                <PlayButton onClick={handlePlayButton} />
              )}
            </PlayButtonContainer> */}

            <PlayButtonContainer>
              {isSoundPlaying ? <PauseButton onClick={pauseSound} /> : <PlayButton onClick={playSound} />}
            </PlayButtonContainer>

            <SliderContainer>
              <div>{moment.utc(moment.duration(currentSoundPosition, 'seconds').asMilliseconds()).format('mm:ss')}</div>
              <SoundProgress
                defaultValue={0}
                min={0}
                tooltipVisible={false}
                max={getSoundDuration()}
                step={1}
                value={currentSoundPosition}
                onChange={(value: number | [number, number]): void => setCurrentSoundPosition(value as number)}
              />
              <div>{moment.utc(moment.duration(getSoundDuration(), 'seconds').asMilliseconds()).format('mm:ss')}</div>
            </SliderContainer>
          </PlaybackControl>
        </Col>
        <Col span={7}>
          <SoundVolumeControl>
            {isMuted || getVolume() === 0 ? (
              <MuteButton onClick={toggleSoundMute} />
            ) : (
              <SoundButton onClick={toggleSoundMute} />
            )}
            <VolumeSliderContainer>
              <Slider
                defaultValue={0.5}
                min={0}
                max={1}
                step={0.01}
                value={getVolume()}
                tipFormatter={(value) => Math.round(value * 100)}
                onChange={(value: number | [number, number]): void => setVolume(value as number)}
              />
            </VolumeSliderContainer>
          </SoundVolumeControl>
        </Col>
      </Row>
    </Container>
  );
}

export default MusicPlayer;
