import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import Question from './Question';

const Questions = ({ setTime, setCorrect, setIncorrect }) => {
  const history = useHistory();
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);

  // Initialize data
  useEffect(() => {
    setTime(new Date());
    setCorrect(0);
    setIncorrect(0);
  }, [setTime, setCorrect, setIncorrect]);

  useEffect(() => {
    let mounted = true;

    fetch(`https://opentdb.com/api.php?amount=20&type=multiple&category=${id}`)
      .then((x) => x.json())
      .then((data) => mounted && setQuestions(data.results))
      .catch((error) => console.log(error));

    return () => {
      mounted = false;
    };
  }, [id]);

  const setAnswer = (isCorrect) => {
    if (isCorrect) setCorrect((prev) => prev + 1);
    if (!isCorrect) setIncorrect((prev) => prev + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (index === questions.length - 1) {
      history.push('/trivia/ranking');
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div>
      {questions?.length > 0 && (
        <h4 className='my-5 font-italic'>
          Question: {index + 1}/{questions.length}
        </h4>
      )}
      {questions?.length > 0 ? (
        <Question {...questions[index]} setAnswer={setAnswer} />
      ) : (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-border text-info' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

Questions.propTypes = {
  setTime: PropTypes.func.isRequired,
  setCorrect: PropTypes.func.isRequired,
  setIncorrect: PropTypes.func.isRequired,
};

export default Questions;
