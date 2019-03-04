import React from 'react';

import { selectSensor } from './app.actions';
import { getFishIconForOverallRating, getClassNameFromOverallRating } from './sensorUtils';

export default function SensorMarker(props) {
    const { sensor, selectedSensor, sensorOverallRating } = props;

    // Makes sure the marker is centered in the visible
    // portion of the map, since half of the map is
    // covered by the sensor sidebar.
    const adj = 0.005;

    const handleOnClick = () => {
        if (!selectedSensor) {
            selectSensor(sensor);
            props.handleOnClick({
                latitude: sensor.geometry.coordinates[1],
                longitude: sensor.geometry.coordinates[0] + adj,
                zoom: 15,
                bearing: 0,
                pitch: 0,
            });
        }
    };

    return (
        <div onClick={handleOnClick}>
            <div className={`marker marker--${getClassNameFromOverallRating(sensorOverallRating)}`}>
                <div className='marker__inner'>
                    <div className='marker__content'>
                        <div className='marker__level' />
                        <div className='marker__symbol'>
                            <img
                                className='marker__image'
                                src={getFishIconForOverallRating(sensorOverallRating)}
                                alt='Sensor marker'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
