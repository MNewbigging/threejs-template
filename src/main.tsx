import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app/App";
import { AppState } from "./app/app-state";

const appState = new AppState();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App appState={appState} />
  </React.StrictMode>
);
