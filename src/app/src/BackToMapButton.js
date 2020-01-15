import React from 'react';

import { deselectSensor } from './app.actions';
import { mapOverviewViewport } from './constants';
import deRiverBasin from './img/de_river_basin.svg';

export default function BackToMapButton(props) {
    const handleOnClick = () => {
        deselectSensor();
        props.handleOnClick(mapOverviewViewport);
    };

    return (
        <button
            type='button'
            id='back-button'
            className='button-back'
            onClick={handleOnClick}
        >
            <span className='button-back__text'>Back to map</span>
            <img className='button-back__image' src={deRiverBasin} alt='' />
        </button>
    );
}
