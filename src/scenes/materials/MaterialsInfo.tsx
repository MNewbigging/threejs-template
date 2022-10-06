import './materials-info.scss';

import React from 'react';

export const MaterialsInfo: React.FC = () => {
  return (
    <div className={'materials-info'}>
      <p>This scene demonstrates various different materials:</p>
      <ul>
        <li>Standard material, which reacts to light</li>
        <li>Matcap material, which fakes light</li>
        <li>Normal material, which displays normal based on camera</li>
        <li>Depth material, which is whiter the closer the camera is to it</li>
        <li>Phong material, which reacts to light realistically</li>
        <li>Toon material, which gives a cartoon effect that reacts to light</li>
      </ul>
    </div>
  );
};
