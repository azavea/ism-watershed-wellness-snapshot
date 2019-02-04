import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import {
    hideIntro,
    selectSensor,
    deselectSensor,
    showSensorModal,
    hideSensorModal,
} from './app.actions';

const initialAppState = {
    isIntroVisible: true,
    selectedSensor: null,
    isSensorModalDisplayed: false,
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
    },
    initialAppState
);

export default appReducer;
