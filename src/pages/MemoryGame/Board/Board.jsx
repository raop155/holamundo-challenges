import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import Card from './Card';
import { useHistory } from 'react-router-dom';
import errorSound from 'assets/error.wav';
import scoreSound from 'assets/score.wav';
import useSound from 'use-sound';

// Initial data
let data = [
  {
    value: 1,
    isOpen: false,
    isMatched: false,
  },
  {
    value: 2,
    isOpen: false,
    isMatched: false,
  },
  {
    value: 3,
    isOpen: false,
    isMatched: false,
  },
  {
    value: 4,
    isOpen: false,
    isMatched: false,
  },
  {
    value: 5,
    isOpen: false,
    isMatched: false,
  },
  {
    value: 6,
    isOpen: false,
    isMatched: false,
  },
  {
    value: 7,
    isOpen: false,
    isMatched: false,
  },
  {
    value: 8,
    isOpen: false,
    isMatched: false,
  },
];

// Combie with the same data & shuffle data
data = [...data, ...data].sort(() => Math.random() - 0.5);

const Board = ({ setIncorrect, setTime }) => {
  const [playError] = useSound(errorSound);
  const [playScore] = useSound(scoreSound);
  const history = useHistory();
  const isGameActive = useRef(true);
  const timerRef = useRef(null);
  const [count, setCount] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [cardArray, setCardArray] = useState(data);

  const setOpenCard = (id) => {
    setCardArray(cardArray.map((card, index) => (index === id ? { ...card, isOpen: true } : card)));
  };

  const setMatchCards = (firstCardId, secondCardId) => {
    setCardArray(
      cardArray.map((card, index) =>
        index === firstCardId || index === secondCardId
          ? { ...card, isOpen: true, isMatched: true }
          : card,
      ),
    );
  };

  const closeUnmatchedCards = () => {
    isGameActive.current = false;
    timerRef.current = setTimeout(() => {
      setCardArray(
        cardArray.map((card) => (card.isMatched === true ? card : { ...card, isOpen: false })),
      );
      isGameActive.current = true;
    }, 1500);
  };

  const checkAnswer = (id) => {
    if (!isGameActive.current) return;

    // Open the card
    setOpenCard(id);

    // Check if it's a pair match
    const card = { ...cardArray[id], id };
    if (firstCard) {
      if (card.value === firstCard.value) {
        playScore();
        setMatchCards(firstCard.id, id);
        setCount((prev) => prev + 1);
      } else {
        playError();
        closeUnmatchedCards();
        addIncorrect();
      }
      setFirstCard(null);
    } else {
      setFirstCard(card);
    }
  };

  const addIncorrect = () => {
    setIncorrect((prev) => prev + 1);
  };

  // Initialize data
  useEffect(() => {
    setTime(new Date());
    setIncorrect(0);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [setTime, setIncorrect]);

  // Check if game is over
  useEffect(() => {
    if (count === data.length / 2) {
      history.push('/memory-game/ranking');
    }
  }, [count, history]);

  return (
    <div className={`${styles.component} `}>
      <h4 className='my-5 font-italic'>Find the match card pair:</h4>
      <div className={`${styles.board} ${!isGameActive.current && styles['board--shake']}`}>
        {cardArray?.length > 0 &&
          cardArray.map((data, index) => (
            <Card key={index} index={index} {...data} checkAnswer={checkAnswer} />
          ))}
      </div>
    </div>
  );
};

Board.propTypes = {
  setIncorrect: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default Board;
