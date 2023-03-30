import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Provider from '../context/swProvider';

describe('Testa o componente Search', () => {
  it('testa se os imputs funcionam como deveriam', () => {
    render(<Provider><App /></Provider>);
    
  });
  it('testa se o botão Filtrar funciona', () => {
    render(<Provider><App /></Provider>);
    
  });
  it('testa se o botão de deletar filtro funciona', () => {
    render(<Provider><App /></Provider>);
    
  });
})