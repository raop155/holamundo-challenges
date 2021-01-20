import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import PropTypes from 'prop-types';

const Question = ({ question, correct_answer, incorrect_answers, setAnswer }) => {
  const [answers, setAnswers] = useState([]);
  const handleAnswer = (answer) => {
    if (decode(answer) === decode(correct_answer)) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  useEffect(() => {
    // Combine correct and incorrect answers
    let combineAnswers = [...incorrect_answers, correct_answer];
    // Shuffle answers
    combineAnswers = combineAnswers.sort(() => Math.random() - 0.5);
    // Add "None of them" answer to get 5 answers total
    combineAnswers.push('None of them');

    setAnswers(combineAnswers);
  }, [correct_answer, incorrect_answers]);

  return (
    <>
      <h3 className='text-white-50 mb-3'>{decode(question)}</h3>
      {answers?.length > 0 &&
        answers.map((answer, index) => (
          <button
            key={index}
            className='btn btn-info btn-block'
            onClick={() => handleAnswer(answer)}
          >
            {decode(answer)}
          </button>
        ))}
    </>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  correct_answer: PropTypes.string.isRequired,
  incorrect_answers: PropTypes.array.isRequired,
  setAnswer: PropTypes.func.isRequired,
};

export default Question;
