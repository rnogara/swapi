import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import Provider from '../context/swProvider';
import mockData from './mock/mockData.json';
// import testData from '../../cypress/mocks/testData';

describe('Testa o componente App', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ mockData }),
    })
  );
  it('testa se o fetch é feito', () => {
    render(<Provider><App /></Provider>);
    
    const loading = screen.getByText('Carregando...');
    expect(loading).toBeInTheDocument();

    waitForElementToBeRemoved(loading);

    expect(fetch).toHaveBeenCalledTimes(1);
  });
})
