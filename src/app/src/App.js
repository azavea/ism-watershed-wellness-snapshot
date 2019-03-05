import React, { Component } from 'react';
import { connect } from 'react-redux';

import GLMap from './Map';
import Intro from './Intro';
import Header from './Header';
import Footer from './Footer';
import SensorOverview from './SensorOverview';

import { POLLING_INTERVAL, msPerDay, msPerHour } from './constants';
import { pollSensor } from './app.actions';
import { msToDays, msToHours, msToMins } from './sensorUtils';

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
        const msElapsedSinceLastUpdate =
            new Date().getTime() - Math.max(...sensorReadingDates);
        // Display footer timestamp in sensible units
        // Minutes if < 1 hr; hours if 1h - 24h; days if 1 day+
        let timeSinceLastUpdate = msToMins(msElapsedSinceLastUpdate);
        let timeLabel = 'minutes';
        if (timeSinceLastUpdate >= msPerDay) {
            timeSinceLastUpdate = msToDays(msElapsedSinceLastUpdate);
            timeLabel = 'days';
        } else if (timeSinceLastUpdate >= msPerHour) {
            timeSinceLastUpdate = msToHours(msElapsedSinceLastUpdate);
            timeLabel = 'hours';
        }

        return (
            <div id='app-container' className={containerClassName}>
                {isIntroVisible ? <Intro /> : null}
                <div className='main l-landing'>
                    <Header />
                    <Footer
                        elapsedTime={timeSinceLastUpdate}
                        timeLabel={timeLabel}
                    />
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
