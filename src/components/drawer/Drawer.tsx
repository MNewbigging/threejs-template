import './drawer.scss';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { DrawerState } from './DrawerState';
import { Dialog } from '../dialog/Dialog';
import { SceneInfoRenderer } from '../scene-info/SceneInfoRenderer';
import { SceneName, sceneNames } from '../../scenes/SceneList';

interface DrawerProps {
  drawerState: DrawerState;
  currentScene: SceneName;
  toggleFullScreen: () => void;
  selectScene: (sceneName: SceneName) => void;
}

export const Drawer: React.FC<DrawerProps> = observer(
  ({ drawerState, currentScene, toggleFullScreen, selectScene }) => {
    // Scene list
    const sceneListItems = sceneNames.map((name) => {
      const selectedClass = currentScene === name ? 'selected' : '';

      return (
        <div
          key={`scene-list-item-${name}`}
          className={`scene-list-item ${selectedClass}`}
          onClick={() => selectScene(name)}
        >
          {name}
        </div>
      );
    });

    return (
      <>
        {/* Scene info */}
        <Dialog
          dialogState={drawerState.dialogState}
          children={SceneInfoRenderer.renderSceneInfo(currentScene)}
          title={currentScene + ' info'}
        />

        <div className={'drawer-outer ' + drawerState.stage}>
          <div className={'drawer-inner'}>
            <div className={'drawer-buttons'}>
              <div
                className={'drawer-button toggle ' + drawerState.stage}
                onClick={drawerState.toggleDrawer}
              >
                {drawerState.getToggleText()}
              </div>
              <div
                className={'drawer-button info ' + drawerState.stage}
                onClick={drawerState.showSceneInfo}
              >
                i
              </div>
              <div
                className={'drawer-button fullscreen ' + drawerState.stage}
                onClick={toggleFullScreen}
              >
                [+]
              </div>
            </div>

            {/* Scene list */}
            <div className='scene-list'>
              Scenes
              {sceneListItems}
            </div>
          </div>
        </div>
      </>
    );
  }
);
