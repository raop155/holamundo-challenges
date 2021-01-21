import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.component}>
      <nav>
        <Link to='/'>#HolaMundo #Challenges</Link>
      </nav>
    </header>
  );
};

export default Header;
