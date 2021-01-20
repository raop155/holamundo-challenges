import React from 'react';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.component}>
      <span>
        Made by{' '}
        <a href='https://raop155.com' target='_blank' rel='noreferrer'>
          <strong className='text-primary'>Ricardo Olarte</strong>
        </a>
      </span>
    </footer>
  );
};

export default Footer;
