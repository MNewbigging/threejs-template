import './dialog.scss';

import React from 'react';

import { DialogState } from './DialogState';
import { observer } from 'mobx-react-lite';

interface DialogProps {
  dialogState: DialogState;
  children: React.ReactNode;
  title: string;
}

export const Dialog: React.FC<DialogProps> = observer(({ dialogState, children, title }) => {
  // Remove from DOM if closed
  if (dialogState.isClosed()) {
    return <></>;
  }

  // Otherwise, show dialog
  return (
    <div id={dialogState.id} className={'dialog ' + dialogState.stage}>
      <div className='header'>
        <div className='title'>{title}</div>
        <div className='close-button' onClick={() => dialogState.close()}>
          X
        </div>
      </div>
      {children}
    </div>
  );
});
