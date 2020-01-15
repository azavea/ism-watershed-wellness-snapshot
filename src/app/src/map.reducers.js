import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import {
    toggleBackToMapButton,
    updateViewport,
    showMarkers,
} from './map.actions';

import { primaryMapStyle, initialMapViewport } from './constants';

// Map-related state
export const initialMapState = {
    isBackToMapButtonVisible: false,
    areMarkersVisible: false,
    style: primaryMapStyle,
    // State specific to and required by MapBoxGL
    viewport: initialMapViewport,
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
        [showMarkers]: (state, payload) =>
            update(state, {
                areMarkersVisible: {
                    $set: true,
                },
            }),
    },
    initialMapState
);

export default mapReducer;
