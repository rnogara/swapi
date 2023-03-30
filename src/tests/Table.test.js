import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Provider from '../context/swProvider';

describe('Testa o componente Table', () => {
  it('testar se os elementos dos planetas e respectivos filmes aparecem', () => {
    render(<Provider><App /></Provider>);
    
    
  });
})