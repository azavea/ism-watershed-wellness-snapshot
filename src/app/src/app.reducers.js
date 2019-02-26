import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import {
    hideIntro,
    selectSensor,
    deselectSensor,
    showSensorModal,
    hideSensorModal,
    setSensorData,
} from './app.actions';

const initialAppState = {
    isIntroVisible: true,
    selectedSensor: null,
    isSensorModalDisplayed: false,
    sensorData: {},
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
        [setSensorData]: (state, payload) =>
            update(state, {
                sensorData: {
                    [payload.id]: {
                        $set: payload,
                    },
                },
            }),
    },
    initialAppState
);

export default appReducer;
