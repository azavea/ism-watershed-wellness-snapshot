import React from 'react';

import listUl from './img/list-ul.svg';
import SensorDetails from './SensorDetails';
import { showSensorModal } from './app.actions';
import { getClassNameFromOverallRating } from './sensorUtils';

export default function SensorOverview({
    sensor,
    sensorRatings,
    sensorData,
    isSensorModalDisplayed,
}) {
    return (
        <div className='main l-detail'>
            <div className='sidebar'>
                <div className='sidebar__content'>
                    <header className='sidebar__header'>
                        <h1 className='sidebar__mini-title'>Health</h1>
                        <h2 className='sidebar__title'>
                            {sensor.properties.Location}
                        </h2>
                        <p className='sidebar__intro'>
                            {sensor.properties.Description}
                        </p>
                    </header>

                    <div
                        className={`health health--${getClassNameFromOverallRating(
                            sensorRatings.OVERALL_RATING
                        )}`}
                    >
                        <h3 className='health__heading'>
                            This site is in{' '}
                            <div className='health__rating-text'>
                                {sensorRatings.OVERALL_RATING.toLowerCase()}{' '}
                                condition
                            </div>
                        </h3>
                        <div className='health__illustration'>
                            <button
                                type='button'
                                id='openModal'
                                className='health__button button button--secondary button--pulsate button--icon'
                                onClick={showSensorModal}
                            >
                                <img
                                    src={listUl}
                                    alt='More details'
                                    className='button__image'
                                />
                            </button>
                            {isSensorModalDisplayed ? (
                                <SensorDetails
                                    sensor={sensor}
                                    sensorData={sensorData}
                                    sensorRatings={sensorRatings}
                                />
                            ) : null}
                            <div className='health__level' />
                        </div>
                        <p className='health__description'>
                            This means that fish and birds are able to Cras
                            mattis consectetur purus sit amet fermentum. Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit.
                            All this contributes to the overall health of the
                            Delaware Water Gap!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
