import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootReducer } from '../../redux/features/root';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Slider, Row, Col, List, Popover } from 'antd';
import { Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import { removeMusicFromQueue, SoundInfo, loadMusic } from '../../redux/features/musicPlayer';
import {
  SoundOutlined,
  LoadingOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  AudioMutedOutlined,
  UnorderedListOutlined,
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

const SoundInfoContainer = styled.div`
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

const UnorderedListOutlinedButton = styled(UnorderedListOutlined)`
  font-size: 20px;
  color: #c0c0c0;
  margin-right: 20px;
  &:hover {
    color: #d4d4d4;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const QueuePreviewList = styled(List)`
  max-height: 25rem;
  overflow-y: auto;
`;

interface MusicPlayer {
  soundName?: string;
}

function MusicPlayer(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const soundURL = useSelector((state: RootReducer) => state.musicPlayer.currentTrack.soundURL);
  const musicQueue = useSelector((state: RootReducer) => state.musicPlayer.queue);
  const currentSoundName = useSelector((state: RootReducer) => state.musicPlayer.currentTrack.soundName);
  const currentArtistName = useSelector((state: RootReducer) => state.musicPlayer.currentTrack.artistName);
  const currentSongCover = useSelector((state: RootReducer) => state.musicPlayer.currentTrack.albumCover);
  const [soundsToPlay, setSoundsToPlay] = useState<string[]>([]);
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
    changeCurrentSoundPosition,
    isLoading,
    setOnLoadCallback,
    setOnEndCallback,
  } = useMusicPlayer({ soundURL: soundsToPlay });

  useEffect(() => {
    const onEndCallback = () => {
      return () => {
        dispatch(removeMusicFromQueue({ position: 0 }));
      };
    };
    setOnEndCallback(onEndCallback);

    const onLoadCallback = (itemToUpdate: SoundInfo) => {
      return () => {
        console.log('itemToUpdate', itemToUpdate);
        dispatch(loadMusic(itemToUpdate));
      };
    };
    setOnLoadCallback(onLoadCallback(musicQueue[0]));
  }, [sound]);

  useEffect(() => {
    if (isSoundPlaying) handleCurrentSoundPosition();
    else clearInterval(timer);
  }, [isSoundPlaying]);

  useEffect(() => {
    const musicQueueURLs = musicQueue.map((item) => item.soundURL);
    const soundsURLs = [...musicQueueURLs];
    setSoundsToPlay(soundsURLs);
  }, [soundURL, musicQueue]);

  const handleCurrentSoundPosition = (): void => {
    setTimer(
      setInterval(() => {
        const val = Math.round(sound?.seek(soundID) as number);
        if (!Number.isNaN(val)) setCurrentSoundPosition(val);
      }, 500),
    );
  };

  const handlePlayButton = () => {
    if (musicQueue.length !== 0) {
      if (isSoundPlaying) {
        pauseSound();
      } else {
        playSound();
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col span={7}>
          <TrackContainer>
            <AlbumCoverContainer>
              {currentSongCover && <AlbumCover shape="square" src={currentSongCover} />}
            </AlbumCoverContainer>
            <SoundInfoContainer>
              <SoundName>{currentSoundName}</SoundName>
              <AristName>{currentArtistName}</AristName>
            </SoundInfoContainer>
          </TrackContainer>
        </Col>
        <Col span={10}>
          <PlaybackControl>
            <PlayButtonContainer>
              {isLoading ? (
                <LoadingIndicator />
              ) : isSoundPlaying ? (
                <PauseButton onClick={handlePlayButton} />
              ) : (
                <PlayButton onClick={handlePlayButton} />
              )}
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
                onChange={(value: number | [number, number]): void => changeCurrentSoundPosition(value as number)}
              />
              <div>{moment.utc(moment.duration(getSoundDuration(), 'seconds').asMilliseconds()).format('mm:ss')}</div>
            </SliderContainer>
          </PlaybackControl>
        </Col>
        <Col span={7}>
          <SoundVolumeControl>
            <Popover
              content={
                <QueuePreviewList
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  size="small"
                  dataSource={musicQueue.slice(1, musicQueue.length)}
                  renderItem={(item: any, index: number) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: '#1890ff55', verticalAlign: 'middle' }} size="default">
                            {index + 2}
                          </Avatar>
                        }
                        title={item.soundName}
                        description={item.artistName}
                      />
                    </List.Item>
                  )}
                />
              }
              title={`Queue:`}
              trigger="hover"
            >
              <UnorderedListOutlinedButton onClick={() => history.push('/queue')} />
            </Popover>
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
