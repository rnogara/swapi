import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './swContext';
import handleFilters from '../handlers/handleFilters';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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
      const arrayPlanets = filteredPlanets.length === 0 ? planets : filteredPlanets;
      const eachFilter = handleFilters(...filterInfo, arrayPlanets);
      filtered = eachFilter;
    });
    setFilteredPlanets(filtered);
  }

  const values = {
    error,
    fetchData,
    filteredPlanets,
    filterPlanets,
    loading,
    planets,
    textSearch,
  };
  return (
    <context.Provider value={ values }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default Provider;
