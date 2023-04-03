import React, { useContext, useEffect } from 'react';
import Context from '../context/swContext';
import AppliedFilters from './AppliedFilters';
import Filters from './Filters';
import Sort from './Sort';

function Search() {
  const { textSearch, setFiltersApplied, fetchData } = useContext(Context);

  const API_URL = 'https://swapi.dev/api/planets';
  useEffect(() => {
    fetchData(API_URL);
  }, []);

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Insira sua pesquisa"
        onChange={ ({ target }) => textSearch(target.value.toLowerCase()) }
      />
      <div>
        <Filters />
        <Sort />
        <button
          data-testid="button-remove-filters"
          onClick={ () => setFiltersApplied([]) }
        >
          Remover todas filtragens
        </button>
      </div>
      <AppliedFilters />
    </section>
  );
}

export default Search;
