import React from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header/>
      <Sidebar/>
    </div>
  );
};

export default Home;