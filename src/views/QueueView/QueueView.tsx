import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Spin, PageHeader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../redux/features/root';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { removeMusicFromQueue, SoundInfo, loadMusic } from '../../redux/features/musicPlayer';
import { DeleteOutlined } from '@ant-design/icons';

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
  flex-direction: row;
  justify-items: space-between;
  align-items: center;
  width: 100%;
`;

const DeleteOutlinedButton = styled(DeleteOutlined)`
  font-size: 20px;
  color: #c0c0c0;
  margin-left: 30px;
  &:hover {
    color: #d4d4d4;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

function QueueView(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const tracks = useSelector((state: RootReducer) => state.musicPlayer.queue);

  const handleRemoveFromQueueButton = (track: any) => {
    dispatch(removeMusicFromQueue({ soundID: track.soundId as string }));
  };

  return (
    <Container>
      <PageHeader
        className="site-page-header"
        title="QueueView"
        subTitle="Tracks queue"
        onBack={() => history.goBack()}
      />
      <CustomList
        dataSource={tracks}
        renderItem={(track: any): JSX.Element => (
          <List.Item key={track.soundId as string}>
            <ListItemContainer>
              <List.Item.Meta
                avatar={<Avatar shape="square" size="large" src={track.albumCover} />}
                title={<TrackName>{track.soundName}</TrackName>}
                description={track.artistName}
              />
              <DeleteOutlinedButton onClick={() => handleRemoveFromQueueButton(track)} />
            </ListItemContainer>
          </List.Item>
        )}
      />
    </Container>
  );
}

export default QueueView;
