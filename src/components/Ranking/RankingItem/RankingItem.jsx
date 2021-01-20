import React from 'react';

const RankingItem = ({ index, name, correct }) => {
  let style = 'dark';
  const position = index + 1;
  if (position <= 3) style = 'success';
  if (position > 3 && position <= 5) style = 'warning';

  return (
    <li key={index} className={`list-group-item list-group-item-${style}`}>
      <div className='d-flex justify-content-between'>
        <div>
          <strong>#{position}</strong>
        </div>
        <div>{name}</div>
        <div>Correct: {correct}</div>
      </div>
    </li>
  );
};

export default RankingItem;
