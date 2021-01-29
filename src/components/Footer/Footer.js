import React from 'react';
import {Layout, Menu} from 'antd';
import {FileTextOutlined, FolderOutlined, HomeOutlined, UserOutlined, UnorderedListOutlined} from '@ant-design/icons';
import styles from '../Sidebar/Sidebar.module.css';
import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <Layout.Footer
      style={{padding: '0', position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%', height: '46px'}}>
      <Menu
        theme="dark"
        selectedKeys={`/${[location.pathname.split('/')[1]]}`}
        mode="horizontal"
        style={{display: 'flex', justifyContent: 'space-between'}}
      >
        <Menu.Item
          key="/home"
          icon={<HomeOutlined style={{margin: 0}}/>}
          className={styles.sidebar__link}
          title="Home"
          style={{flexGrow: '1', textAlign: 'center'}}
        >
          <Link to="/home"/>
        </Menu.Item>
        <Menu.Item
          key="/notes"
          icon={<FileTextOutlined style={{margin: 0}}/>}
          className={styles.sidebar__link}
          title="Notes"
          style={{flexGrow: '1', textAlign: 'center'}}
        >
          <Link to="/notes"/>
        </Menu.Item>
        <Menu.Item
          key="/todo"
          icon={<UnorderedListOutlined style={{margin: 0}}/>}
          className={styles.sidebar__link}
          title="To-do list"
          style={{flexGrow: '1', textAlign: 'center'}}
        >
          <Link to="/todo"/>
        </Menu.Item>
        <Menu.Item
          key="/documents"
          icon={<FolderOutlined style={{margin: 0}}/>}
          className={styles.sidebar__link}
          title="Documents"
          style={{flexGrow: '1', textAlign: 'center'}}
        >
          <Link to="/documents"/>
        </Menu.Item>
        <Menu.Item
          key="/settings"
          icon={<UserOutlined style={{margin: 0}}/>}
          className={styles.sidebar__link}
          title="Settings"
          style={{flexGrow: '1', textAlign: 'center'}}
        >
          <Link to="/settings"/>
        </Menu.Item>
      </Menu>
    </Layout.Footer>
  );
};

export default Footer;