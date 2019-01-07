import { createViewportReducer } from 'redux-map-gl';

const initialState = {
    viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    },
};

export default createViewportReducer(initialState);
