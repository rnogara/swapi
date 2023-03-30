import React, { useContext, useState } from 'react';
import Context from '../context/swContext';
import Filters from './Filters';

function Search() {
  const { setFiltersApplied, textSearch, filtersApplied, options } = useContext(Context);
  const [searchNumber, setSearchNumber] = useState(0);
  const [searchOption, setSearchOption] = useState('population');
  const [searchComparison, setSearchComparison] = useState('maior que');

  function handleFilterBtn() {
    const newFilter = {
      option: searchOption,
      comparison: searchComparison,
      number: searchNumber,
    };
    const arrayFilters = [...filtersApplied, newFilter];
    setFiltersApplied(arrayFilters);
  }

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
          { options.map((option, i) => (
            <option key={ i }>{option}</option>
          ))}
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
          onClick={ handleFilterBtn }
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ () => setFiltersApplied([]) }
        >
          Remover todas filtragens
        </button>
      </div>
      <Filters />
    </section>
  );
}

export default Search;
