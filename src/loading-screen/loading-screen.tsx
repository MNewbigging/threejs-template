import "./loading-screen.scss";
import React from "react";
import { Spinner } from "@blueprintjs/core";
import { SpinnerSize } from "@blueprintjs/core/lib/esm/components";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <Spinner size={SpinnerSize.LARGE} />
    </div>
  );
};
