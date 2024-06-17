import "./app.scss";

import React from "react";
import { observer } from "mobx-react-lite";

import { AppState } from "./app-state";
import { LoadingScreen } from "../loading-screen/loading-screen";
import { PauseScreen } from "../pause-screen/pause-screen";
import { GameScreen } from "../game-screen/game-screen";

interface AppProps {
  appState: AppState;
}

export const App: React.FC<AppProps> = observer(({ appState }) => {
  const { gameState } = appState;
  const paused = appState.paused;
  const started = appState.started;

  return (
    <div id="canvas-root">
      {!started && <LoadingScreen appState={appState} />}

      {paused && gameState && <PauseScreen gameState={gameState} />}

      {started && !paused && gameState && <GameScreen gameState={gameState} />}
    </div>
  );
});
