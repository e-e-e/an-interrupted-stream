import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ArenaClient } from 'arena-ts';
import { ContentClient } from './services/content';

const arena = new ContentClient(new ArenaClient());

ReactDOM.render(
  <React.StrictMode>
    <App arena={arena} />
  </React.StrictMode>,
  document.getElementById('root')
);
