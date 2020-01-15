import { createAction } from 'redux-act';
import { FlyToInterpolator } from 'react-map-gl';

export const toggleBackToMapButton = createAction(
    'Toggle back to map button visibility'
);
export const updateViewport = createAction('Update map viewport', options =>
    Object.assign({}, options, {
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 2000,
    })
);
export const showMarkers = createAction('Show markers');
