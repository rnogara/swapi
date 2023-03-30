import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './swContext';
import useFilterCase from '../hooks/useFilterCase';

function Provider({ children }) {
  const arrayOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);
  const [options, setOptions] = useState(arrayOptions);
  const applyFilter = useFilterCase([]);

  useEffect(() => {
    if (filtersApplied.length > 0) {
      let filtered = [...planets];
      filtersApplied.forEach((filter) => {
        const filterInfo = [
          filter.option,
          filter.comparison,
          filter.number,
        ];
        const eachFilter = applyFilter.filterCase(...filterInfo, filtered);
        filtered = eachFilter;
      });
      setFilteredPlanets(filtered);
      let mappedOptions = [...arrayOptions];
      filtersApplied.forEach((filter) => {
        const avaiableOptions = arrayOptions.filter((option) => option !== filter.option);
        mappedOptions = avaiableOptions;
      });
      setOptions(mappedOptions);
    } else {
      setFilteredPlanets(planets);
      setOptions(arrayOptions);
    }
  }, [filtersApplied]);

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

  const values = { error,
    fetchData,
    filteredPlanets,
    filtersApplied,
    loading,
    options,
    planets,
    setFiltersApplied,
    setFilteredPlanets,
    textSearch };
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
