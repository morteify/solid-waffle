import React from 'react';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { useHistory } from 'react-router-dom';

function SideMenu() {
  const history = useHistory();

  const handleClick = (event: ClickParam) => {
    history.push(`/${event.key}`);
  };

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256, height: '100vh', paddingTop: '10px' }}
      defaultSelectedKeys={['songs']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <Menu.ItemGroup key="g1" title="Browse Music">
        {/* <Menu.Item key="home">Home</Menu.Item> */}
        <Menu.Item key="songs">Songs</Menu.Item>
        <Menu.Item key="albums">Albums</Menu.Item>
        <Menu.Item key="artists">Artists</Menu.Item>
      </Menu.ItemGroup>
      {/* <Menu.ItemGroup key="g2" title="Your Music">
        <Menu.Item key="favourites">Favourites</Menu.Item>
        <Menu.Item key="history">History</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="g3" title="Your Playlists">
        <Menu.Item key="7">Playlist 1</Menu.Item>
        <Menu.Item key="8">Playlist 2</Menu.Item>
        <Menu.Item key="9">Playlist 3</Menu.Item>
        <Menu.Item key="10">Playlist 4</Menu.Item>
      </Menu.ItemGroup> */}
    </Menu>
  );
}

export default SideMenu;
