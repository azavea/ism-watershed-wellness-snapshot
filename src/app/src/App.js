import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';

import GLMap from './Map';
import Intro from './Intro';
import Header from './Header';
import Footer from './Footer';
import SensorOverview from './SensorOverview';

import { setSensorData } from './app.actions';
import { POLLING_INTERVAL, SENSORS } from './constants';

import {
    makeRiverGaugeRequest,
    parseRiverGaugeApiData,
    parseRiverGaugeCsvData,
} from './sensorUtils';

class App extends Component {
    componentDidMount() {
        // Poll for new sensor data immediately and on a timed cycle thereafter
        setInterval(function pollData() {
            (async () => {
                const requests = SENSORS.map(sensor =>
                    makeRiverGaugeRequest(sensor.id, sensor.apiAccess)
                );
                const responses = await Promise.all(requests);
                const allSensorData = SENSORS.reduce((acc, sensor, idx) => (
                    Object.assign(acc, sensor.apiAccess
                        ? parseRiverGaugeApiData(sensor.id, responses[idx])
                        : parseRiverGaugeCsvData(sensor.id, responses[idx])
                    )
                ), {});
                setSensorData(allSensorData);
            })();
            return pollData;
        }(), POLLING_INTERVAL);
    }

    render() {
        const {
            isIntroVisible,
            selectedSensor,
            sensors,
            isSensorModalDisplayed
        } = this.props;
        let containerClassName = isIntroVisible
            ? 'main p-intro'
            : selectedSensor
            ? 'main p-detail'
            : 'main p-landing';
        const sensorData = find(sensors.features, f => {
            return f.properties.Location === selectedSensor;
        });

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
