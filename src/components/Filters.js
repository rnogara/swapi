import React, { useContext } from 'react';
import Context from '../context/swContext';

function Filters() {
  const { applyFilters, filtersApplied, filterPlanets } = useContext(Context);

  function handleDeleteFilterBtn(target) {
    const index = parseFloat(target.id);
    const newArray = filtersApplied.filter((filter, i) => i !== index);
    applyFilters(newArray);
    filterPlanets(newArray);
  }

  return (
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
  );
}

export default Filters;
