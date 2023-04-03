import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import mockData from './mock/mockData.json';

describe('Testa o componente App', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ mockData }),
    })
  );
  it('testa se o fetch é feito', () => {
    render(<App />);
    
    const loading = screen.getByText('Carregando...');
    expect(loading).toBeInTheDocument();

    waitForElementToBeRemoved(loading);

    expect(fetch).toHaveBeenCalledTimes(1);
  });
})
