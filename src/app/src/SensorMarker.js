import React from 'react';

import { selectSensor } from './app.actions';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
    cursor: 'pointer',
    fill: '#DDD7C0',
    stroke: 'none',
};

export default function SensorMarker(props) {
    const { sensor, selectedSensor, size = 20 } = props;

    // Makes sure the marker is centered in the visible
    // portion of the map, since half of the map is
    // covered by the sensor sidebar.
    const adj = 0.005;

    const handleOnClick = () => {
        if (!selectedSensor) {
            selectSensor(sensor.properties.Location);
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
        <svg
            height={size}
            viewBox='0 0 24 24'
            style={{
                ...pinStyle,
                transform: `translate(${-size / 2}px,${-size}px)`,
            }}
            onClick={handleOnClick}
        >
            <path d={ICON} />
        </svg>
    );
}
