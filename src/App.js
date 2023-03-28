import React, { useContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import context from './context/swContext';

function App() {
  const { fetchData } = useContext(context);

  const API_URL = 'https://swapi.dev/api/planets';
  useEffect(() => {
    fetchData(API_URL);
  });

  return (
    <>
      <Header />
      <Table />
    </>
  );
}

export default App;
