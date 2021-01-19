import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ListItem } from './ListItem';
import PropTypes from 'prop-types';

const List = ({ hours, resources, addResource, removeResource }) => {
  const intervals = hours.map((hour, index) => {
    if (hours[index + 1]) {
      return `${hour} - ${hours[index + 1]}`;
    } else {
      return '';
    }
  });

  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (resources === 0) {
      setIsBlocked(true);
    } else {
      setIsBlocked(false);
    }
  }, [resources]);

  return (
    <div className={styles.component}>
      <ul className='list-group'>
        {intervals.map((interval, index) => (
          <ListItem
            key={index}
            hours={interval}
            isBlocked={isBlocked}
            resources={resources}
            addResource={addResource}
            removeResource={removeResource}
          />
        ))}
      </ul>
    </div>
  );
};

List.propTypes = {
  hours: PropTypes.array.isRequired,
};

export default List;
