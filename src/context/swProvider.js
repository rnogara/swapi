import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './swContext';
import handleFilters from '../handlers/handleFilters';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

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

  function filterPlanets(option, comparison, number) {
    const filtered = handleFilters(option, comparison, number, planets);
    const firstPlanet = planets[0];
    console.log(option, comparison, number, parseFloat(firstPlanet[option]));
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
