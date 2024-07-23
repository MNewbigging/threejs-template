import { observer } from "mobx-react-lite";
import { GameState } from "../game/game-state";
import "./pause-screen.scss";
import React from "react";

interface PauseScreenProps {
  gameState: GameState;
}

export const PauseScreen: React.FC<PauseScreenProps> = observer(
  ({ gameState }) => {
    return <div className="pause-screen"></div>;
  }
);
