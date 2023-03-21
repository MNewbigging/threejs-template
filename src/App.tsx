import "./App.css";
import "./app.scss";

import React from "react";
import planet00 from "/planet00.png";
import viteLogo from "/vite.svg";
import { observer } from "mobx-react-lite";

import planet08 from "./assets/planets/planet08.png";
import reactLogo from "./assets/react.svg";
import { AppState } from "./app-state";

interface AppProps {
  appState: AppState;
}

export const App: React.FC<AppProps> = observer(({ appState }) => {
  return (
    <div className="App">
      <canvas id="canvas"></canvas>

      <div className="card">
        <button onClick={appState.incrementCount}>
          count is {appState.count}
        </button>
      </div>

      <div className="planets">
        <div className="planet-7 logo"></div>
        <img src={planet00} className="logo" />

        <div className="planet-9 logo"></div>
        <img src={planet08} className="logo" />
      </div>
    </div>
  );
});
