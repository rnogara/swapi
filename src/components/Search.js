import React, { useContext } from 'react';
import context from '../context/swContext';

function Search() {
  const { textSearch } = useContext(context);

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => textSearch(target.value.toLowerCase()) }
      />
    </section>
  );
}

export default Search;
