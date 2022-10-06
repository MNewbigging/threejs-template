import React from 'react';
import { observer } from 'mobx-react-lite';

import { AppState } from './AppState';

import './app.scss';

interface AppProps {
  appState: AppState;
}

export const App: React.FC<AppProps> = observer(({ appState }) => {
  return (
    <div className='full-size center-content'>
      <button onClick={appState.incrementCount}>Count: {appState.count}</button>
    </div>
  );
});
