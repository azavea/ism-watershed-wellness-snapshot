import React from 'react';
import { render } from 'react-dom';
import { assignAll } from 'redux-act';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as actions from './actions';
import createStoreWithMiddleware from './store';
import reducers from './reducers';

const store = createStoreWithMiddleware(reducers);
assignAll(actions, store)

render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App} />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
