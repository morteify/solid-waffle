import React from 'react';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { useHistory } from 'react-router-dom';

function SideMenu() {
  const history = useHistory();

  const handleClick = (event: ClickParam): void => {
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
        <Menu.Item key="songs">Songs</Menu.Item>
        <Menu.Item key="albums">Albums</Menu.Item>
        <Menu.Item key="artists">Artists</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
}

export default SideMenu;
