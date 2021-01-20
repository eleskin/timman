import React from 'react';
import {Layout, Menu} from 'antd';
import {BarsOutlined, FileOutlined, HomeOutlined} from '@ant-design/icons';
import styles from '../Sidebar/Sidebar.module.css';
import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <Layout.Footer style={{padding: '0'}}>
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
          icon={<BarsOutlined style={{margin: 0}}/>}
          className={styles.sidebar__link}
          title="Notes"
          style={{flexGrow: '1', textAlign: 'center'}}
        >
          <Link to="/notes"/>
        </Menu.Item>
        <Menu.Item
          key="/documents"
          icon={<FileOutlined style={{margin: 0}}/>}
          className={styles.sidebar__link}
          title="Documents"
          style={{flexGrow: '1', textAlign: 'center'}}
        >
          <Link to="/documents"/>
        </Menu.Item>
        {/*<Menu.Item key="/settings" icon={<SettingOutlined/>} className={styles.sidebar__link}>*/}
        {/*  <Link to="/settings">Settings</Link>*/}
        {/*</Menu.Item>*/}
      </Menu>
    </Layout.Footer>
  );
};

export default Footer;