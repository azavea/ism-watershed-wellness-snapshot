import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import { updateCount } from './actions'

const initialState = {
    n: 0,
};

export default createReducer({
    [updateCount]: state => update(state, { n: { $set: (state.n + 1) }}),
}, initialState);
