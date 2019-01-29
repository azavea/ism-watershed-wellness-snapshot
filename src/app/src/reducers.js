import { combineReducers } from 'redux';

import map from './map.reducers';
import app from './app.reducers';

export default combineReducers({
    map,
    app,
});
