import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/swContext';
import Filters from './Filters';

function Search() {
  const { applyFilters, textSearch, filterPlanets, filtersApplied } = useContext(Context);
  const [searchNumber, setSearchNumber] = useState(0);
  const [searchOption, setSearchOption] = useState('population');
  const [searchComparison, setSearchComparison] = useState('maior que');
  const [options, setOptions] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);

  useEffect(() => {
    if (filtersApplied.length > 0) {
      let mappedOptions = [];
      filtersApplied.forEach((filter) => {
        const avaiableOptions = options.filter((option) => option !== filter.option);
        mappedOptions = [...avaiableOptions];
      });
      setOptions(mappedOptions);
    }
  }, [filtersApplied]);

  function handleFilterBtn() {
    const newFilter = {
      option: searchOption,
      comparison: searchComparison,
      number: searchNumber,
    };
    const arrayFilters = [...filtersApplied, newFilter];
    applyFilters(arrayFilters);
    filterPlanets(arrayFilters);
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
      </div>
      <Filters />
    </section>
  );
}

export default Search;
