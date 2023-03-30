import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './swContext';
import useFilterCase from '../hooks/useFilterCase';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);
  const applyFilter = useFilterCase([]);

  const arrayPlanets = filteredPlanets.length === 0 ? planets : filteredPlanets;

  async function fetchData(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response) {
        setError('no data');
        return;
      }
      const data = await response.json();
      setPlanets(data.results);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function textSearch(text) {
    const textFilter = planets
      .filter((planet) => planet.name.toLowerCase().includes(text));
    setFilteredPlanets(textFilter);
  }

  function filterPlanets(arrayFilters) {
    let filtered = [];
    arrayFilters.forEach((filter) => {
      const filterInfo = [
        filter.option,
        filter.comparison,
        filter.number,
      ];
      const eachFilter = applyFilter.filterCase(...filterInfo, arrayPlanets);
      filtered = eachFilter;
    });
    setFilteredPlanets(filtered);
  }

  function applyFilters(arrayFilters) {
    setFiltersApplied(arrayFilters);
  }

  const values = { applyFilters,
    error,
    fetchData,
    filteredPlanets,
    filterPlanets,
    filtersApplied,
    loading,
    planets,
    textSearch,
  };
  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default Provider;
