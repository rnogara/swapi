import React, { useContext, useState } from 'react';
import context from '../context/swContext';

function Search() {
  const { textSearch, filterPlanets } = useContext(context);
  const [searchNumber, setSearchNumber] = useState(0);
  const [searchOption, setSearchOption] = useState('population');
  const [searchComparison, setSearchComparison] = useState('maior que');
  const [filtersApplied, setFiltersApplied] = useState([]);

  function handleFilterBtn() {
    const newFilter = {
      option: searchOption,
      comparison: searchComparison,
      number: searchNumber,
    };
    if (filtersApplied.includes(newFilter)) {
      return;
    }
    // const maxFilter = 5;
    // if (filtersApplied.length === maxFilter) {
    //   return console.log('você só pode ter 5 filtros');
    // }
    const arrayFilters = [...filtersApplied, newFilter];
    setFiltersApplied(arrayFilters);
    filterPlanets(arrayFilters);
  }

  function handleDeleteFilterBtn(target) {
    const index = parseFloat(target.id);
    const newArray = filtersApplied.filter((filter, i) => i !== index);
    setFiltersApplied(newArray);
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
          onClick={ handleFilterBtn }
        >
          Filtrar
        </button>
      </div>
      <div className="applied-filters-wrapper">
        {filtersApplied.length > 0 && filtersApplied.map((filter, index) => (
          <div className="applied-filters-box" key={ index }>
            <p className="applied-filter-text">{filter.option}</p>
            <p className="applied-filter-text">{filter.comparison}</p>
            <p className="applied-filter-text">{filter.number}</p>
            <button
              id={ index }
              onClick={ ({ target }) => handleDeleteFilterBtn(target) }
              className="delete-filter-btn"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Search;
