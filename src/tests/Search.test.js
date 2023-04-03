import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa o componente Search', () => {
  it('testa se os imputs funcionam como deveriam', () => {
    render(<App />);
    
  });
  it('testa se o botão Filtrar funciona', () => {
    render(<App />);
    
  });
  it('testa se o botão de deletar filtro funciona', () => {
    render(<App />);
    
  });
})