import { createReducer } from 'redux-act';
import enhanceMapReducer from 'redux-map-gl';
import update from 'immutability-helper';

import { toggleBackToMapButton } from './map.actions';

// Map-related state
const initialMapState = {
    isBackToMapButtonVisible: false,
};

// State specific to and required by MapBoxGL
export const initialViewportState = {
    latitude: 40.2161,
    longitude: -75.0726,
    zoom: 9,
    bearing: -30,
    pitch: 60,
};

// Map-related reducer
const mapReducer = createReducer(
    {
        [toggleBackToMapButton]: state =>
            update(state, {
                isBackToMapButtonVisible: {
                    $set: !state.isBackToMapButtonVisible,
                },
            }),
    },
    initialMapState
);

// Add MapBoxGL-specific reducer to map reducer
const enhancedMapReducer = enhanceMapReducer(mapReducer, initialViewportState);

export default enhancedMapReducer;
