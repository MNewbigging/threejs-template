import './index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { AppState } from './AppState';

// Creates the root state class for the entire application
const appState = new AppState();

// Render the top-level component inside the app-root element (found in index.html)
const root = createRoot(document.getElementById('app-root'));
root.render(<App appState={appState} />);

// Allow time for canvas to render to DOM before accessing it
setTimeout(() => appState.setup(), 250);

// Necesasry for hot module reloading; should refresh page on code changes
if (module.hot) {
  module.hot.accept();
}
