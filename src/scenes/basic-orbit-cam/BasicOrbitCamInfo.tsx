import './basic-orbit-cam-info.scss';

import React from 'react';

export const BasicOrbitCamInfo: React.FC = () => {
  return (
    <div className={'basic-orbit-cam-info'}>
      <p>
        This scene demonstrates a simple orbit style camera, which you control by moving the mouse:
      </p>
      <ul>
        <li>Left to right to rotate the camera around the red cube side to side</li>
        <li>Up and down to rotate the camera around the red cube above and below</li>
        <li>Wheel to zoom in and out</li>
      </ul>
      <p>
        The camera always looks at the red cube - the blue cube is there as a reference to
        understand the way the camera moves.
      </p>
    </div>
  );
};
