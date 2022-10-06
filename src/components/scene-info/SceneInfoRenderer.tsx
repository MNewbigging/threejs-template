import React from 'react';
import { BasicOrbitCamInfo } from '../../scenes/basic-orbit-cam/BasicOrbitCamInfo';
import { BasicTextureInfo } from '../../scenes/basic-texture/BasicTextureInfo';
import { BasicTransformsInfo } from '../../scenes/basic-transforms/BasicTransformsInfo';
import { BufferGeometryInfo } from '../../scenes/buffer-geometry/BufferGeometryInfo';
import { MaterialsInfo } from '../../scenes/materials/MaterialsInfo';
import { SceneName } from '../../scenes/SceneList';
import { StandardOrbitCamInfo } from '../../scenes/standard-orbit-cam/StandardOrbitCamInfo';

export class SceneInfoRenderer {
  public static renderSceneInfo(sceneName: SceneName) {
    switch (sceneName) {
      case SceneName.BASIC_TRANSFORMS:
        return <BasicTransformsInfo />;
      case SceneName.BASIC_ORBIT_CAM:
        return <BasicOrbitCamInfo />;
      case SceneName.STANDARD_ORBIT_CAM:
        return <StandardOrbitCamInfo />;
      case SceneName.BUFFER_GEOMETRY:
        return <BufferGeometryInfo />;
      case SceneName.BASIC_TEXTURE:
        return <BasicTextureInfo />;
      case SceneName.MATERIALS:
        return <MaterialsInfo />;
      default:
        return <div>No info for this scene!</div>;
    }
  }
}
