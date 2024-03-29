import "./app.scss";

import React from "react";
import { observer } from "mobx-react-lite";

import { AppState } from "./app-state";
import { LoadingScreen } from "./loading-screen/loading-screen";

interface AppProps {
  appState: AppState;
}

export const App: React.FC<AppProps> = observer(({ appState }) => {
  return (
    <div className="app">
      <div id="canvas-root"></div>

      {appState.gameLoader.loading && <LoadingScreen />}
    </div>
  );
});
