import React, { useContext, useState } from 'react';
import Context from '../context/swContext';

function Sort() {
  const { arrayOptions, sortPlanets } = useContext(Context);
  const [sortOption, setSortOption] = useState('population');
  const [sortBy, setSortBy] = useState('');

  return (
    <div>
      <label htmlFor="column-sort">
        Ordenar
        <select
          name="column-sort"
          data-testid="column-sort"
          onClick={ ({ target }) => setSortOption(target.value) }
        >
          { arrayOptions.map((option, i) => (
            <option key={ i }>{option}</option>
          ))}
        </select>
      </label>
      <label>
        Crescente
        <input
          value="ASC"
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          onClick={ () => setSortBy('ASC') }
        />
      </label>
      <label>
        Decrescente
        <input
          value="DESC"
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          onClick={ () => setSortBy('DESC') }
        />
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ () => sortPlanets(sortOption, sortBy) }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Sort;
