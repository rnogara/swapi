import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './context/swProvider';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider>
      <App />
    </Provider>
    ,
  );
