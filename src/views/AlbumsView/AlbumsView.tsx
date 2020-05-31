import React, { useRef, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchAlbumsStart, fetchAlbumsSuccess, fetchAlbumsFailure } from '../../redux/features/albums';
import { loadMusic, addMusicToQueue, SoundInfo } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import { List, message, Avatar, Badge, PageHeader } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { AppstoreAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import albumsPic from '../../assets/albums.jpg';

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

function AlbumsView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumsStart());
  }, []);

  return (
    <Container>
      <HeaderPicture src={albumsPic} />
      <CustomPageHeader>
        <PageTitle>Albums</PageTitle>
      </CustomPageHeader>
      <CustomList
        dataSource={[{ title: 'hmm' }]}
        renderItem={(track: any): JSX.Element => <List.Item key={track.title}></List.Item>}
      />
    </Container>
  );
}

export default AlbumsView;
