import './basic-texture-info.scss';

import React from 'react';

export const BasicTextureInfo: React.FC = () => {
  return (
    <div>
      <p>This scene shows two cubes with loaded textures applied.</p>
      <p>
        The grey/blue cube has a tiny texture and uses a magFilter to enhance the quality at the
        larger size.
      </p>
    </div>
  );
};
