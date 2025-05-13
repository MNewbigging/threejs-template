import "./app.scss";

import React from "react";
import { observer } from "mobx-react-lite";

import { LoadingScreen } from "../loading-screen/loading-screen";
import { appState } from "../state/app-state";

export const App: React.FC = observer(() => {
  const started = appState.started;

  return (
    <div className="ui-root">
      {!started && <LoadingScreen appState={appState} />}
    </div>
  );
});
