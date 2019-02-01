import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';

import GLMap from './Map';
import Intro from './Intro';
import Header from './Header';
import Footer from './Footer';
import SensorOverview from './SensorOverview';

class App extends Component {
    render() {
        const { isIntroVisible, selectedSensor, sensors } = this.props;
        const containerClassName = isIntroVisible
            ? 'main p-intro'
            : selectedSensor
            ? 'main p-detail'
            : 'main p-landing';
        const sensorData = find(sensors.features, f => {
            return f.properties.Location === selectedSensor;
        });

        return (
            <div className={containerClassName}>
                {isIntroVisible ? <Intro /> : null}
                <div className='main l-landing'>
                    <Header />
                    <Footer />
                </div>
                <GLMap />
                {this.props.selectedSensor !== null ? (
                    <SensorOverview sensor={sensorData} />
                ) : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isIntroVisible: state.app.isIntroVisible,
        selectedSensor: state.app.selectedSensor,
        sensors: state.map.sensors,
    };
}

export default connect(mapStateToProps)(App);
