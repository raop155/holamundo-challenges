import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import cardback from 'assets/cardback.png';

const Card = ({ index, value, isOpen, checkAnswer }) => {
  return (
    <div
      className={`${styles.component} ${isOpen && styles['component--open']}`}
      onClick={() => !isOpen && checkAnswer(index)}
    >
      <div className={styles.front}>
        <img src={cardback} alt='cardback'></img>
      </div>
      <div className={styles.back}>{value}</div>
    </div>
  );
};

Card.propTypes = {
  value: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  checkAnswer: PropTypes.func.isRequired,
};

export default Card;
