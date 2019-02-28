import React, { Component } from 'react';
import { connect } from 'react-redux';

import GLMap from './Map';
import Intro from './Intro';
import Header from './Header';
import Footer from './Footer';
import SensorOverview from './SensorOverview';

import { POLLING_INTERVAL } from './constants';
import { pollSensor } from './app.actions';
import { getSensorByProp } from './sensorUtils';

class App extends Component {
    componentDidMount() {
        // Poll for new sensor data immediately and on a timed cycle thereafter
        const { dispatch, sensors } = this.props;

        const fetchSensorData = (sensor) => dispatch(pollSensor(sensor));
        this.pollSensorIntervalIds = sensors.features.map(sensor => {
            fetchSensorData(sensor);
            return setInterval(
                () => fetchSensorData(sensor),
                POLLING_INTERVAL
            );
        });
    }

    componentWillUnmount() {
        this.pollSensorIntervalIds.forEach(id => clearInterval(id));
    }

    render() {
        const {
            isIntroVisible,
            selectedSensor,
            isSensorModalDisplayed,
        } = this.props;
        let containerClassName = isIntroVisible
            ? 'main p-intro'
            : selectedSensor
            ? 'main p-detail'
            : 'main p-landing';
        const sensorData = getSensorByProp('Location', selectedSensor);
        if (isSensorModalDisplayed) {
            containerClassName += ' modal-is-open';
        }

        return (
            <div id='app-container' className={containerClassName}>
                {isIntroVisible ? <Intro /> : null}
                <div className='main l-landing'>
                    <Header />
                    <Footer />
                </div>
                <GLMap />
                {selectedSensor !== null ? (
                    <SensorOverview
                        sensor={sensorData}
                        isSensorModalDisplayed={isSensorModalDisplayed}
                    />
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
        isSensorModalDisplayed: state.app.isSensorModalDisplayed,
    };
}

export default connect(mapStateToProps)(App);
