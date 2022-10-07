import React from 'react';
import { observer } from 'mobx-react-lite';

import { AppState } from './AppState';

import './app.scss';
import { Drawer } from './components/drawer/Drawer';

interface AppProps {
  appState: AppState;
}

export const App: React.FC<AppProps> = observer(({ appState }) => {
  return (
    <div className='app'>
      <Drawer
        drawerState={appState.drawerState}
        currentScene={appState.activeSceneName}
        selectScene={appState.selectScene}
        toggleFullScreen={appState.toggleFullScreen}
      />
      <canvas id='main-canvas'></canvas>
    </div>
  );
});
