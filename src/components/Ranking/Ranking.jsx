import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RankingItem from './RankingItem';

const getMinutesBetweenDates = (startDate, endDate) => {
  var diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};

const Ranking = ({ name, correct, incorrect, time }) => {
  const [showResult, setShowResult] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (time) setMinutes(Math.ceil(getMinutesBetweenDates(time, new Date())));

    try {
      const ranks = JSON.parse(localStorage.getItem('trivia-ranking')) || [];
      setRanking(ranks);

      // Validate inputs for new insert of rank
      if (!name || !correct || !incorrect || !time) return;
      setShowResult(true);

      const newRank = {
        name,
        correct,
        incorrect,
        time,
      };

      let newRanking = [...ranks, newRank];
      newRanking = newRanking.sort((a, b) => {
        return b.correct - a.correct;
      });
      setRanking(newRanking);

      localStorage.setItem('trivia-ranking', JSON.stringify(newRanking));
    } catch (error) {
      console.log(error);
    }
  }, [name, correct, incorrect, time]);

  return (
    <div>
      {showResult && (
        <>
          <h4 className='my-5 font-italic'>Congratulations {name}!</h4>
          <p className='text-success'>Correct: {correct}</p>
          <p className='text-danger'>Incorrect: {incorrect}</p>
          <p className='text-warning'>Time: {minutes} minute(s)</p>
        </>
      )}
      <h4 className='my-5 text-center text-decoration'>
        <u>RANKING</u>
      </h4>
      <ul className='list-group'>
        {ranking?.length > 0 &&
          ranking.map((rank, index) => <RankingItem key={index} index={index} {...rank} />)}
      </ul>
    </div>
  );
};

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  correct: PropTypes.number.isRequired,
  incorrect: PropTypes.number.isRequired,
  time: PropTypes.object.isRequired,
};

export default Ranking;
