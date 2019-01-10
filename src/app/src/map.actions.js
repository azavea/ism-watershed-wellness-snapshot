import { onChangeViewport } from 'redux-map-gl';
import { createAction } from 'redux-act';

export const toggleBackToMapButton = createAction(
    'Toggle back to map button visibility'
);

export { onChangeViewport };
