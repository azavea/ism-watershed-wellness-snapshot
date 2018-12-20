import React, { Component } from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';

import logo from './logo.svg';
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
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.js</code> and save to reload foo
                    </p>
                    <a
                        className='App-link'
                        href='https://reactjs.org'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Learn React
                    </a>
                    <p>
                        <button onClick={() => this.inc()}>Click Me</button>
                    </p>
                    <p>{this.props.n}</p>
                </header>
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
