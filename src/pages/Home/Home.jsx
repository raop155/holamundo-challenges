import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const challenges = [
  { title: 'Schedule', path: '/schedule' },
  { title: 'Trivia', path: '/trivia' },
  { title: 'Memory Game', path: '/memory-game' },
];

const Home = () => {
  return (
    <div id='home' className={styles.component}>
      <div className='container'>
        <h1>Challenges:</h1>
        <ul>
          {challenges.map(({ title, path }) => {
            return (
              <Link key={path} to={path}>
                <li>{title}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
