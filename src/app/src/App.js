import React, { Component } from 'react';
import { connect } from 'react-redux';

import GLMap from './Map';
import Intro from './Intro';
import Header from './Header';
import Footer from './Footer';
import SensorOverview from './SensorOverview';

import { POLLING_INTERVAL } from './constants';
import { pollSensor } from './app.actions';

class App extends Component {
    componentDidMount() {
        // Poll for new sensor data immediately and on a timed cycle thereafter
        const { dispatch, sensors } = this.props;
        const fetchSensorData = sensor => dispatch(pollSensor(sensor));
        this.pollSensorIntervalIds = sensors.features.map(sensor => {
            fetchSensorData(sensor);
            return setInterval(() => fetchSensorData(sensor), POLLING_INTERVAL);
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
            sensorRatings,
            sensorData,
            sensors,
        } = this.props;
        let containerClassName = isIntroVisible
            ? 'main p-intro'
            : selectedSensor
            ? 'main p-detail'
            : 'main p-landing';
        if (isSensorModalDisplayed) {
            containerClassName += ' modal-is-open';
        }

        const sensorReadingDates = sensors.features.map(sensor => {
            const sensorId = sensor.properties.Id;
            return sensorData[sensorId].timestamp;
        });

        return (
            <div id='app-container' className={containerClassName}>
                {isIntroVisible ? <Intro /> : null}
                <div className='main l-landing'>
                    <Header />
                    <Footer sensorReadingDates={sensorReadingDates} />
                </div>
                <GLMap />
                {selectedSensor !== null ? (
                    <SensorOverview
                        sensor={selectedSensor}
                        sensorRatings={
                            sensorRatings[selectedSensor.properties.Id]
                        }
                        sensorData={sensorData[selectedSensor.properties.Id]}
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
        sensors: state.app.sensors,
        sensorRatings: state.app.sensorRatings,
        sensorData: state.app.sensorData,
        isSensorModalDisplayed: state.app.isSensorModalDisplayed,
    };
}

export default connect(mapStateToProps)(App);
