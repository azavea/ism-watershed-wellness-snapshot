import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import { toggleBackToMapButton, updateViewport } from './map.actions';

// Map-related state
export const initialMapState = {
    isBackToMapButtonVisible: false,
    // State specific to and required by MapBoxGL
    viewport: {
        latitude: 40.2161,
        longitude: -75.0726,
        zoom: 9,
        bearing: -30,
        pitch: 60,
        height: '100vh',
        width: '100vw',
    }
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
        [updateViewport]: (state, payload) =>
            update(state, {
                viewport: {
                    $merge: payload,
                },
            }),
    },
    initialMapState
);

export default mapReducer;
