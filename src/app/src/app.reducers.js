import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import {
    hideIntro,
    selectSensor,
    deselectSensor,
    showSensorModal,
    hideSensorModal,
    completePollingSensor,
    updateSensorRatings,
} from './app.actions';

import { DEFAULT_SENSOR_DATA } from './constants';

const initialAppState = {
    isIntroVisible: true,
    selectedSensor: null,
    isSensorModalDisplayed: false,
    sensorData: DEFAULT_SENSOR_DATA,
    sensorRatings: {},
};

const appReducer = createReducer(
    {
        [hideIntro]: state =>
            update(state, {
                isIntroVisible: {
                    $set: false,
                },
            }),
        [selectSensor]: (state, payload) =>
            update(state, {
                selectedSensor: {
                    $set: payload,
                },
            }),
        [deselectSensor]: state =>
            update(state, {
                selectedSensor: {
                    $set: null,
                },
            }),
        [hideSensorModal]: state =>
            update(state, {
                isSensorModalDisplayed: {
                    $set: false,
                },
            }),
        [showSensorModal]: state =>
            update(state, {
                isSensorModalDisplayed: {
                    $set: true,
                },
            }),
        [completePollingSensor]: (state, payload) =>
            update(state, {
                sensorData: {
                    [payload.id]: {
                        $set: payload,
                    },
                },
            }),
        [updateSensorRatings]: (state, payload) =>
            update(state, {
                sensorRatings: {
                    [payload.id]: {
                        $set: payload.sensorRatings,
                    },
                },
            }),
    },
    initialAppState
);

export default appReducer;
