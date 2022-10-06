import './index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { AppState } from './AppState';

// Creates the root state class for the entire application
const appState = new AppState();

// Render the top-level component inside the app-root element container (found in index.html)
let container: HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    // Grab the app container
    container = document.getElementById('app-root');

    // Make it a root for the react app
    const root = createRoot(container);

    // Render top level App component
    root.render(<App appState={appState} />);

    // Allow time for canvas to render to DOM before accessing it
    setTimeout(() => appState.setup(), 250);
  }
});

// Necesasry for hot module reloading; should refresh page on code changes
if (module.hot) {
  module.hot.accept();
}
