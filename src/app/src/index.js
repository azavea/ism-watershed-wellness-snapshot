import React from 'react';
import ReactDOM from 'react-dom';
import { assignAll } from 'redux-act';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './sass/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as appActions from './app.actions';
import * as mapActions from './map.actions';
import configureStore from './store';

const store = configureStore();
assignAll(appActions, store);
assignAll(mapActions, store);

const renderWithHotReloading = Component => {
    return ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={App} />
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
};

renderWithHotReloading(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        renderWithHotReloading(NextApp);
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
