import './standard-orbit-cam-info.scss';

import React from 'react';

export const StandardOrbitCamInfo: React.FC = () => {
  return (
    <div className={'standard-orbit-cam-info'}>
      <p>This scene uses the built in Orbit Controls provided by Three.js, which you control by:</p>
      <ul>
        <li>Click and drag to move around view target</li>
        <li>Use the mouse wheel to zoom in and out</li>
        <li>Use the left/right arrow keys to change target cube</li>
      </ul>
      <p>The blue cube is targeted by the orbit camera controls.</p>
    </div>
  );
};
