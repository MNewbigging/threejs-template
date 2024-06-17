import "./loading-screen.scss";
import React from "react";
import { Spinner } from "@blueprintjs/core";
import { SpinnerSize } from "@blueprintjs/core/lib/esm/components";
import { AppState } from "../app/app-state";
import { observer } from "mobx-react-lite";

interface LoadingScreenProps {
  appState: AppState;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = observer(
  ({ appState }) => {
    const loaded = appState.loaded;

    return (
      <div className="loading-screen">
        {!loaded && <Spinner size={SpinnerSize.LARGE} />}

        {loaded && (
          <div className="start-button" onClick={appState.startGame}>
            Start
          </div>
        )}
      </div>
    );
  }
);
