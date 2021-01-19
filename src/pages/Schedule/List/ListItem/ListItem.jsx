import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const ListItem = ({ hours, isBlocked, addResource, removeResource }) => {
  const [style, setStyle] = useState('dark');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (isBlocked) {
      if (quantity > 0) {
        setStyle('success');
      } else {
        setStyle('danger');
      }
    } else {
      if (quantity > 0) {
        setStyle('success');
      } else {
        setStyle('dark');
      }
    }
  }, [quantity, isBlocked]);

  const handleClick = () => {
    if (isBlocked && quantity === 0) return;
    if (quantity === 0) {
      setQuantity(1);
      addResource();
    } else {
      setQuantity(0);
      removeResource();
    }
  };

  return (
    <div>
      {hours && (
        <li className={`list-group-item list-group-item-${style}`} onClick={handleClick}>
          <div className='d-flex justify-content-between align-items-end'>
            <div>{hours}</div>
            <div>Quantity: {quantity}/1</div>
          </div>
        </li>
      )}
    </div>
  );
};

ListItem.defaultProps = {
  quantity: 0,
};

ListItem.propTypes = {
  hours: PropTypes.string.isRequired,
};

export default ListItem;
