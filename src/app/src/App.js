import React, { Component } from 'react';

import GLMap from './Map';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <GLMap />
            </div>
        );
    }
}

export default App;
