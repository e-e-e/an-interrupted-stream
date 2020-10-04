import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ArenaClient } from 'arena-ts';
import { ContentClient } from './services/content';
import { getOptions } from './options';

const { token, channel } = getOptions();
const arena = new ContentClient(new ArenaClient({ token }));

ReactDOM.render(
  <React.StrictMode>
    <App arena={arena} channel={channel} />
  </React.StrictMode>,
  document.getElementById('root')
);
