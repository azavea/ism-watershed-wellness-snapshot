import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import { hideIntro, selectSensor, deselectSensor } from './app.actions';

const initialAppState = {
    isIntroVisible: true,
    selectedSensor: null,
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
    },
    initialAppState
);

export default appReducer;
