import React from 'react';
import styles from './Sidebar.module.css';
import {Link, useLocation} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {FileOutlined, HomeOutlined, BarsOutlined, UserOutlined} from '@ant-design/icons';

const Sidebar = props => {
  const location = useLocation();

  return (
    <Layout.Sider className={styles.sidebar} collapsed={true}>
      <div className={`${styles.sidebar__logo} ${styles.sidebar__logo__collapsed_true}`}>
        <Link to="/home">Timman</Link>
      </div>
      {
        props.auth
        &&
        <Menu theme="dark" selectedKeys={`/${[location.pathname.split('/')[1]]}`} mode="vertical">
          <Menu.Item key="/home" icon={<HomeOutlined/>} className={styles.sidebar__link} title="Home">
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/notes" icon={<BarsOutlined/>} className={styles.sidebar__link} title="Notes">
            <Link to="/notes">Notes</Link>
          </Menu.Item>
          <Menu.Item key="/documents" icon={<FileOutlined/>} className={styles.sidebar__link} title="Documents">
            <Link to="/documents">Documents</Link>
          </Menu.Item>
          <Menu.Item key="/settings" icon={<UserOutlined/>} className={styles.sidebar__link}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      }
    </Layout.Sider>
  );
};

export default Sidebar;