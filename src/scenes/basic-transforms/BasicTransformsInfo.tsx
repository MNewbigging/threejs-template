import './basic-transforms-info.scss';

import React from 'react';

export const BasicTransformsInfo: React.FC = () => {
  return (
    <div className={'basic-transforms'}>
      <p>This scene demonstrates simple transformations on a cube, which you can control via:</p>
      <ul>
        <li>Arrow keys rotate</li>
        <li>WASD moves position</li>
        <li>Q and E scale</li>
        <li>Holdnig Shift increases speed</li>
      </ul>
      <p>
        Occasionally, holding shift with other keys maintains the transform change - press again to
        clear.
      </p>
    </div>
  );
};
