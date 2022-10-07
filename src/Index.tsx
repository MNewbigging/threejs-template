import './index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { AppState } from './AppState';

const appState = new AppState();

const root = createRoot(document.getElementById('app-root'));

root.render(<App appState={appState} />);

// Allow time for canvas to render to DOM before accessing it
setTimeout(() => appState.setup(), 250);

if (module.hot) {
  module.hot.accept();
}
