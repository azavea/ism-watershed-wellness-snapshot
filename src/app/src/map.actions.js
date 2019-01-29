import { createAction } from 'redux-act';

export const toggleBackToMapButton = createAction(
    'Toggle back to map button visibility'
);
export const updateViewport = createAction('Update map viewport');
