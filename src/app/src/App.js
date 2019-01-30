import React, { Component } from 'react';
import { connect } from 'react-redux';

import GLMap from './Map';
import Intro from './Intro';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
    render() {
        const isIntroVisible = this.props.isIntroVisible;
        const containerClassName = isIntroVisible
            ? 'main p-intro'
            : 'main p-landing';

        return (
            <div className={containerClassName}>
                {isIntroVisible ? <Intro /> : null}
                <div className='main l-landing'>
                    <Header />
                    <Footer />
                </div>
                <GLMap />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isIntroVisible: state.app.isIntroVisible,
    };
}

export default connect(mapStateToProps)(App);
