import React, { useState, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure, TracksType } from '../../redux/features/tracks';
import { loadMusic, addMusicToQueue, SoundInfo } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import { List, message, Avatar, Spin, PageHeader } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { AppstoreAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 256px);
  height: calc(100vh - 64px);
`;

const TrackName = styled.p`
  &:hover {
    cursor: pointer;
    color: #dddeee;
  }
`;

const CustomList = styled(List)`
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 1.5rem;
`;

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-items: space-between;
  align-items: center;
  width: 100%;
`;

const AppstoreAddOutlinedButton = styled(AppstoreAddOutlined)`
  font-size: 20px;
  color: #c0c0c0;
  margin-left: 30px;
  &:hover {
    color: #d4d4d4;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

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

  const handleAddToQueueButton = (soundInfo: SoundInfo) => {
    dispatch(addMusicToQueue({ soundInfo }));
  };

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader className="site-page-header" title="Songs" subTitle="All tracks on the instance" />
        <CustomList
          dataSource={tracks}
          renderItem={(track: any): JSX.Element => (
            <List.Item key={track.title}>
              <ListItemContainer>
                <List.Item.Meta
                  avatar={<Avatar shape="square" size="large" src={track?.album?.cover?.small_square_crop} />}
                  title={
                    <TrackName
                      onClick={(): void => {
                        dispatch(
                          loadMusic({
                            artistName: track.artist.name,
                            soundURL: 'https://audio.liberta.vip' + track.listen_url,
                            soundName: track.title,
                            albumCover: track?.album?.cover?.small_square_crop || null,
                          }),
                        );
                      }}
                    >
                      {track.title}
                    </TrackName>
                  }
                  description={track.artist.name}
                />
                <AppstoreAddOutlinedButton onClick={() => handleAddToQueueButton(track)} />
              </ListItemContainer>
            </List.Item>
          )}
        ></CustomList>
      </div>
    </Container>
  );
}

export default TracksView;
