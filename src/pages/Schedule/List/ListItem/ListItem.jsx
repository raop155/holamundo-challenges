import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const ListItem = ({ interval, isBlocked, addResource, removeResource }) => {
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
      {interval && (
        <li className={`list-group-item list-group-item-${style}`} onClick={handleClick}>
          <div className='d-flex justify-content-between align-items-end'>
            <div>{interval}</div>
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
  interval: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  addResource: PropTypes.func.isRequired,
  removeResource: PropTypes.func.isRequired,
};

export default ListItem;
