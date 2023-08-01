import React, { useContext, useState } from 'react';
import Context from '../context/swContext';

function Filters() {
  const { setFiltersApplied, filtersApplied,
    options } = useContext(Context);
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
    <div>
      <label htmlFor="column-filter">
        Filtrar
        <select
          name="column-filter"
          data-testid="column-filter"
          onClick={ ({ target }) => setSearchOption(target.value) }
        >
          { options.map((option, i) => (
            <option key={ i }>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          onClick={ ({ target }) => setSearchComparison(target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
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
    </div>
  );
}

export default Filters;
