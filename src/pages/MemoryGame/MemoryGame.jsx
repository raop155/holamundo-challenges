import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import Form from 'components/Form';
import Ranking from 'components/Ranking';
import Board from './Board';

const Trivia = () => {
  const [name, setName] = useState('');
  const [incorrect, setIncorrect] = useState(0);
  const [time, setTime] = useState(new Date());
  // localStorage.clear();

  return (
    <main id='memory-game'>
      <div className='container'>
        <Link to='/memory-game'>
          <h1 className='mb-5'>#Memory Game Challenge</h1>
        </Link>
        <Route path='/memory-game' exact>
          <Form name={name} setName={setName} goTo='/memory-game/board' />
        </Route>
        <Route path='/memory-game/board'>
          <Board setIncorrect={setIncorrect} setTime={setTime} />
        </Route>
        <Route path='/memory-game/ranking'>
          <Ranking name={name} incorrect={incorrect} time={time} storageName='memory-ranking' />
        </Route>
      </div>
    </main>
  );
};

export default Trivia;
