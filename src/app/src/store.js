import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ diff: true, collapsed: true });
    middlewares.push(logger);
}

const configureStore = () => {
    const store = applyMiddleware(...middlewares)(createStore)(reducers);

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(reducers);
            });
        }
    }

    return store;
};

export { configureStore as default };
