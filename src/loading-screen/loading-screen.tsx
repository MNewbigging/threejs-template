import "./loading-screen.scss";
import React from "react";

import { observer } from "mobx-react-lite";
import { AppState } from "../state/app-state";

interface LoadingScreenProps {
  appState: AppState;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = observer(
  ({ appState }) => {
    const loaded = appState.loaded;

    return (
      <div className="loading-screen">
        {!loaded && <span>Loading...</span>}

        {loaded && (
          <div className="start-button" onClick={appState.startGame}>
            Start
          </div>
        )}
      </div>
    );
  }
);
