import React, { useState } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Form = ({ name, setName, goTo }) => {
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return setError(true);
    history.push(goTo);
  };

  return (
    <div className={styles.component}>
      <h3 className='my-5 font-italic'>Please insert your name:</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='name'
            aria-describedby='email'
            inputMode='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        {error && (
          <div className='invalid-feedback my-3' style={{ display: 'block' }}>
            Please insert a valid name
          </div>
        )}
        <button type='submit' className='btn btn-info btn-block py-3'>
          Aceptar
        </button>
      </form>
    </div>
  );
};

Form.propsTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

export default Form;
