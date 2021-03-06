import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure, TracksType } from '../../redux/features/tracks';
import { loadMusic, addMusicToQueue, SoundInfo } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import { List, message, Avatar, Badge, PageHeader } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { AppstoreAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import stagePic from '../../assets/stage.jpg';
import defaultAlbumPic from '../../assets/default-album.png';
import useVerifyAccessRights from '../../hooks/useVerifyAccessRights';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 256px);
  height: calc(100vh - 64px);
  overflow: auto;
`;

const TrackName = styled.p`
  &:hover {
    cursor: pointer;
    color: #dddeee;
  }
`;

const CustomList = styled(List)`
  /* height: calc(100vh - 64); */
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

const HeaderPicture = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  position: relative;
  background-attachment: fixed;
  opacity: 0.65;
`;

const CustomPageHeader = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: calc(250px - 64px);
`;

const PageTitle = styled.p`
  color: #fff;
  font-size: 36px;
  padding-left: 20px;
`;

function TracksView(): JSX.Element {
  const dispatch = useDispatch();
  const antListRef = useRef(null);
  const tracks = useSelector((state: RootReducer) => state.tracks.tracks);
  const currentTrackId = useSelector((state: RootReducer) => state.musicPlayer.currentTrack.soundId);
  const { hasAccessRights } = useVerifyAccessRights({ redirectTo: '/start' });

  useEffect(() => {
    dispatch(fetchTracksStart());
  }, []);

  const handleAddToQueueButton = (soundInfo: any): void => {
    const currentMusic = {
      soundId: soundInfo.id.toString() + Date.now(),
      artistName: soundInfo.artist.name,
      soundURL: 'https://audio.liberta.vip' + soundInfo.listen_url,
      soundName: soundInfo.title,
      albumCover: soundInfo?.album?.cover?.small_square_crop || null,
    };
    dispatch(addMusicToQueue({ soundInfo: currentMusic }));
    if (currentTrackId === null) dispatch(loadMusic(currentMusic));
  };

  return (
    <Container>
      <HeaderPicture src={stagePic} />
      <CustomPageHeader>
        <PageTitle>All Tracks</PageTitle>
      </CustomPageHeader>
      <CustomList
        dataSource={tracks}
        renderItem={(track: any): JSX.Element => (
          <List.Item key={track.title}>
            <ListItemContainer>
              <List.Item.Meta
                style={{ alignItems: 'center', margin: 0 }}
                avatar={
                  <Avatar
                    shape="square"
                    size="large"
                    src={track?.album?.cover?.small_square_crop ? track.album.cover.small_square_crop : defaultAlbumPic}
                  />
                }
                title={
                  <TrackName
                    onClick={(): void => {
                      const currentMusic = {
                        soundId: track.id.toString() + Date.now(),
                        artistName: track.artist.name,
                        soundURL: 'https://audio.liberta.vip' + track.listen_url,
                        soundName: track.title,
                        albumCover: track?.album?.cover?.small_square_crop || null,
                      };
                      dispatch(loadMusic(currentMusic));
                      dispatch(addMusicToQueue({ position: 0, soundInfo: currentMusic, replace: true }));
                    }}
                  >
                    {track.title}
                  </TrackName>
                }
                description={track.artist.name}
              />
              <AppstoreAddOutlinedButton onClick={(): void => handleAddToQueueButton(track)} />
            </ListItemContainer>
          </List.Item>
        )}
      />
    </Container>
  );
}

export default TracksView;
