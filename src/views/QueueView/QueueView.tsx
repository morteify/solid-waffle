import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Spin, PageHeader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../redux/features/root';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

function QueueView(): JSX.Element {
  const history = useHistory();
  const tracks = useSelector((state: RootReducer) => state.musicPlayer.queue);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="QueueView"
        subTitle="Tracks queue"
        onBack={() => history.goBack()}
      />
      <CustomList
        dataSource={tracks}
        renderItem={(track: any): JSX.Element => (
          <>
            <List.Item key={track.title}>
              <List.Item.Meta
                avatar={<Avatar shape="square" size="large" src={track?.album?.cover?.small_square_crop} />}
                title={<TrackName>{track.title}</TrackName>}
                description={track.artist.name}
              />
            </List.Item>
          </>
        )}
      />
    </div>
  );
}

export default QueueView;
