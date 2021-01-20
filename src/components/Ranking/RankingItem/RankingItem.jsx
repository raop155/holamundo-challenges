import React from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const RankingItem = ({ index, name, correct, incorrect, time }) => {
  let style = 'dark';
  const position = index + 1;
  if (position <= 3) style = 'success';
  if (position > 3 && position <= 5) style = 'warning';

  return (
    <li key={index} className={`list-group-item list-group-item-${style} ${styles.component}`}>
      <div className={styles.content}>
        <div>
          <strong>#{position}</strong>
        </div>
        <div className={styles.name}>{name}</div>
        <div>
          {correct > 0 && (
            <div>
              <small>Correct: {correct}</small>
            </div>
          )}
          {incorrect > 0 && (
            <div>
              <small>Errors: {incorrect}</small>
            </div>
          )}
        </div>

        <div>{time} min</div>
      </div>
    </li>
  );
};

RankingItem.defaultProps = {
  correct: 0,
  incorrect: 0,
};

RankingItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  correct: PropTypes.number.isRequired,
  incorrect: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
};

export default RankingItem;
