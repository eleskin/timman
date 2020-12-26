import React, {useState} from 'react';
import styles from './Sidebar.module.css';
import {Link, useLocation} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {FileOutlined, SettingOutlined, HomeOutlined} from '@ant-design/icons';

const {Sider} = Layout;

const Sidebar = props => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  console.log(location.pathname);
  return (
    // <aside className={styles.sidebar}>
    //   <Link to="/" className={styles.sidebar__logo}>TimMan</Link>
    //   {
    //     props.auth
    //     &&
    //     <nav className={styles.sidebar__menu}>
    //       <Link to="/">Home</Link>
    //       <Link to="/documents">Documents</Link>
    //       <Link to="/settings">Settings</Link>
    //     </nav>
    //   }
    // </aside>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className={`${styles.sidebar__logo} ${collapsed && styles.sidebar__logo__collapsed_true}`}>
        <Link to="/home">Timman</Link>
      </div>
      {
        props.auth
        &&
        <Menu theme="dark" defaultSelectedKeys={location.pathname} mode="inline">
          <Menu.Item key="/home" icon={<HomeOutlined/>}  className={styles.sidebar__link}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/documents" icon={<FileOutlined/>} className={styles.sidebar__link}>
            <Link to="/documents">Documents</Link>
          </Menu.Item>
          <Menu.Item key="/settings" icon={<SettingOutlined/>} className={styles.sidebar__link}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      }
    </Sider>
  );
};

export default Sidebar;