import { createViewportReducer } from 'redux-map-gl';

const initialState = {
    viewport: {
        latitude: 40.2161,
        longitude: -75.0726,
        zoom: 9,
        bearing: -30,
        pitch: 60,
    },
};

export default createViewportReducer(initialState);
