import React, { Component } from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';

import GLMap from './Map';
import './App.scss';
import { updateCount } from './actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.inc = this.inc.bind(this);
    }

    inc() {
        updateCount();
    }

    render() {
        return (
            <div className='App'>
                <GLMap />
            </div>
        );
    }
}

App.propTypes = {
    n: number.isRequired,
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);
