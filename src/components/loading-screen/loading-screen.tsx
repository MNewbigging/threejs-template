import "./loading-screen.scss";
import { appState } from "../../app-state/app-state";
import { useEventUpdater } from "../hooks/use-event-updater";

export function LoadingScreen() {
  useEventUpdater("game-loaded");

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
