import React from 'react';
import styles from './Sidebar.module.css';
import {Link} from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.sidebar__logo}>TimMan</Link>
      {
        props.auth
        &&
        <nav className={styles.sidebar__menu}>
          <Link to="/">Home</Link>
          <Link to="/documents">Documents</Link>
        </nav>
      }
    </aside>
  );
};

export default Sidebar;