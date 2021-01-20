import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Link, Route } from 'react-router-dom';
import Form from 'components/Form';
import Categories from './Categories';
import Questions from './Questions';
import Ranking from 'components/Ranking';

const Trivia = () => {
  const [name, setName] = useState('');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [time, setTime] = useState(new Date());

  return (
    <main id='trivia' className={styles.component}>
      <div className={`container`}>
        <Link to='/trivia'>
          <h1>#Trivia Challenge</h1>
        </Link>
        <Route path='/trivia' exact>
          <Form name={name} setName={setName} goTo='/trivia/categories' />
        </Route>
        <Route path='/trivia/categories'>
          <Categories />
        </Route>
        <Route path='/trivia/questions/:id'>
          <Questions setTime={setTime} setCorrect={setCorrect} setIncorrect={setIncorrect} />
        </Route>
        <Route path='/trivia/ranking'>
          <Ranking
            name={name}
            correct={correct}
            incorrect={incorrect}
            time={time}
            storageName='trivia-ranking'
          />
        </Route>
      </div>
    </main>
  );
};

export default Trivia;
