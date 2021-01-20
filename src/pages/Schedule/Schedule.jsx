import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import List from './List';

const hours = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];

const Schedule = () => {
  const [resources, setResources] = useState(8);
  const addResource = () => {
    console.log('addResource');
    setResources((prev) => prev - 1);
  };

  const removeResource = () => {
    console.log('removeResource');
    setResources((prev) => prev + 1);
  };

  return (
    <main id='schedule'>
      <div className='container'>
        <Link to='/schedule'>
          <h1>#Schedule Challenge</h1>
        </Link>
        <p className='text-right text-uppercase'>
          Motorcyclists left: <b>{resources}</b>
        </p>
        <List
          hours={hours}
          resources={resources}
          addResource={addResource}
          removeResource={removeResource}
        />
      </div>
    </main>
  );
};

export default Schedule;
