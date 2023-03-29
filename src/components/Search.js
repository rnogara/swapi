import React, { useContext, useState } from 'react';
import context from '../context/swContext';

function Search() {
  const { textSearch, filterPlanets } = useContext(context);
  const [searchNumber, setSearchNumber] = useState(0);
  const [searchOption, setSearchOption] = useState('population');
  const [searchComparison, setSearchComparison] = useState('maior que');

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => textSearch(target.value.toLowerCase()) }
      />
      <div>
        <select
          data-testid="column-filter"
          onClick={ ({ target }) => setSearchOption(target.value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onClick={ ({ target }) => setSearchComparison(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ searchNumber }
          onChange={ ({ target }) => setSearchNumber(target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ () => filterPlanets(searchOption, searchComparison, searchNumber) }
        >
          Filtrar
        </button>
      </div>
    </section>
  );
}

export default Search;
