import React, { useContext } from 'react';
import Context from '../context/swContext';

function Filters() {
  const { setFiltersApplied, filtersApplied } = useContext(Context);

  function handleDeleteFilterBtn(target) {
    const index = parseFloat(target.id);
    const newArray = filtersApplied.filter((filter, i) => i !== index);
    setFiltersApplied(newArray);
  }

  return (
    <div className="applied-filters-wrapper">
      {filtersApplied.length > 0 && filtersApplied.map((filter, index) => (
        <div className="applied-filters-box" key={ index } data-testid="filter">
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
