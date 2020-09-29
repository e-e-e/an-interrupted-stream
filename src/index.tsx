import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ArenaClient } from 'arena-ts';

const arena = new ArenaClient();

ReactDOM.render(
  <React.StrictMode>
    <App arena={arena} />
  </React.StrictMode>,
  document.getElementById('root')
);
