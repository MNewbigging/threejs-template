import "./app.scss";

import React from "react";
import { observer } from "mobx-react-lite";

import { AppState } from "./app-state";
import { LoadingScreen } from "../ui/loading-screen/loading-screen";

interface AppProps {
  appState: AppState;
}

export const App: React.FC<AppProps> = observer(({ appState }) => {
  const started = appState.started;

  return (
    <div className="ui-root">
      {!started && <LoadingScreen appState={appState} />}
    </div>
  );
});
