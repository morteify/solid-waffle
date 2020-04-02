import React, { useState, useEffect } from 'react';
import { Track } from '../../redux/features/tracks';
import { useHistory } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTracksStart, fetchTracksSuccess, fetchTracksFailure, TracksType } from '../../redux/features/tracks';
import { playMusicRequest } from '../../redux/features/musicPlayer';
import { RootReducer } from '../../redux/features/root';
import { List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

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
  height: calc(100vh - 64px);
  overflow: auto;
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

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CustomList
          dataSource={tracks}
          renderItem={(track: Track): JSX.Element => (
            <List.Item key={track.title}>
              <List.Item.Meta
                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={
                  <TrackName
                    onClick={(): void => {
                      dispatch(
                        playMusicRequest({
                          soundURL: 'https://funkwhale.it' + track.listen_url,
                          soundName: track.title,
                        }),
                      );
                    }}
                  >
                    {track.title}
                  </TrackName>
                }
                description={track.listen_url}
              />
              <div>Content</div>
            </List.Item>
          )}
        >
          {/* {this.state.loading && this.state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )} */}
        </CustomList>
      </div>
    </Container>
  );
}

export default TracksView;
