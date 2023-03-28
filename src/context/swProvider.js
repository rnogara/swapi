import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import context from './swContext';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [planets, setPlanets] = useState([]);

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
      console.log(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const values = useMemo(() => ({
    error,
    fetchData,
    loading,
    planets,
  }), [error, loading, planets]);
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
