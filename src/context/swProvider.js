import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './swContext';

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
    let filtered = [];
    console.log(option, comparison, number);
    if (comparison === 'maior que') {
      filtered = planets.filter((planet) => planet[option].value > `${number}`);
    }
    if (comparison === 'menor que') {
      filtered = planets.filter((planet) => planet[option].value < `${number}`);
    }
    if (comparison === 'igual a') {
      filtered = planets.filter((planet) => planet[option].value === `${number}`);
    }
    if (filtered.length === 0) {
      setFilteredPlanets(planets);
    } else {
      setFilteredPlanets(filtered);
    }
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
