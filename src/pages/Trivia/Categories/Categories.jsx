import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    fetch('https://opentdb.com/api_category.php')
      .then((x) => x.json())
      .then((data) => mounted && setCategories(data.trivia_categories))
      .catch((error) => console.log(error));

    return () => {
      mounted = false;
    };
  }, []);

  const setCategory = (category) => {
    history.push(`/trivia/questions/${category}`);
  };

  return (
    <div>
      <h4 className='my-5 font-italic'>Select a category please:</h4>
      {categories?.length > 0 ? (
        categories?.map(({ id, name }) => (
          <button key={id} className='btn btn-info btn-block' onClick={() => setCategory(id)}>
            {name}
          </button>
        ))
      ) : (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-border text-info' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
