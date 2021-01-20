import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RankingItem from './RankingItem';
import victorySound from 'assets/victory.mp3';
import useSound from 'use-sound';

const getMinutesBetweenDates = (startDate, endDate) => {
  var diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};

const Ranking = ({ name, correct, incorrect, time, storageName }) => {
  const [playVictory] = useSound(victorySound);
  const [showResult, setShowResult] = useState(false);
  const [ranking, setRanking] = useState([]);
  const minutesRef = useRef(getMinutesBetweenDates(time, new Date()).toFixed(2));

  // Play victory sound!!
  useEffect(() => {
    playVictory();
  }, [playVictory]);

  useEffect(() => {
    try {
      const ranks = JSON.parse(localStorage.getItem(storageName)) || [];
      setRanking(ranks);

      // Validate inputs for new insert of rank
      if (!name || !time) return;
      setShowResult(true);

      const newRank = {
        name,
        correct,
        incorrect,
        time: minutesRef.current,
      };

      let newRanking = [...ranks, newRank];
      newRanking = newRanking.sort((a, b) => {
        return b.correct - a.correct - (b.time - a.time);
      });
      setRanking(newRanking);

      localStorage.setItem(storageName, JSON.stringify(newRanking));
    } catch (error) {
      console.log(error);
    }
  }, [name, correct, incorrect, time, storageName]);

  return (
    <div>
      {showResult && (
        <>
          <h4 className='my-5 font-italic'>
            Congratulations <span className='text-primary'>{name}</span>!
          </h4>
          {correct > 0 && <p className='text-success'>Correct: {correct}</p>}
          {incorrect > 0 && <p className='text-danger'>Errors: {incorrect}</p>}
          <p className='text-warning'>Time: {minutesRef.current} minutes</p>
        </>
      )}
      <h4 className='my-5 text-center text-decoration'>
        <u>RANKING</u>
      </h4>
      <ul className='list-group my-4'>
        {ranking?.length > 0 &&
          ranking.map((rank, index) => <RankingItem key={index} index={index} {...rank} />)}
      </ul>
    </div>
  );
};

Ranking.defaultProps = {
  correct: 0,
  incorrect: 0,
};

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  correct: PropTypes.number.isRequired,
  incorrect: PropTypes.number.isRequired,
  time: PropTypes.object.isRequired,
  storageName: PropTypes.string.isRequired,
};

export default Ranking;
