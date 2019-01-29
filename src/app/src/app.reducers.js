import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import { hideIntro } from './app.actions';

const initialAppState = {
    isIntroVisible: true,
};

const appReducer = createReducer(
    {
        [hideIntro]: state =>
            update(state, {
                isIntroVisible: {
                    $set: false,
                },
            }),
    },
    initialAppState
);

export default appReducer;
