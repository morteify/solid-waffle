import React, { useRef, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchArtistsStart } from '../../redux/features/artists';
import { loadMusic, addMusicToQueue, SoundInfo } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import { List, message, Avatar, Badge, PageHeader, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { AppstoreAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import stage2Pic from '../../assets/stage2.jpg';
import defaultArtist from '../../assets/default-artist.png';
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

const HeaderPicture = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  background-attachment: fixed;
  background-position: bottom;
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

function ArtistsView() {
  const dispatch = useDispatch();
  const artists = useSelector((state: RootReducer) => state.artists.artists);
  const { hasAccessRights } = useVerifyAccessRights({ redirectTo: '/start' });

  useEffect(() => {
    dispatch(fetchArtistsStart());
  }, []);

  return (
    <Container>
      <HeaderPicture src={stage2Pic} />
      <CustomPageHeader>
        <PageTitle>Artists</PageTitle>
      </CustomPageHeader>
      <CustomList
        dataSource={artists}
        renderItem={(artist: any): JSX.Element => (
          <List.Item key={artist.name}>
            <List.Item.Meta
              style={{ alignItems: 'center', margin: 0 }}
              avatar={
                <Avatar
                  shape="circle"
                  size="large"
                  src={artist?.cover?.small_square_crop ? artist.cover.small_square_crop : defaultArtist}
                />
              }
              title={<TrackName>{artist.name}</TrackName>}
            />
          </List.Item>
        )}
      />
    </Container>
  );
}

export default ArtistsView;
