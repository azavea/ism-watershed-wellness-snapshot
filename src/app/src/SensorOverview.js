import React from 'react';

import listUl from './img/list-ul.svg';
import SensorDetails from './SensorDetails';
import { showSensorModal } from './app.actions';

export default function SensorOverview({ sensor, isSensorModalDisplayed }) {
    return (
        <div className='main l-detail l-detail--tinicum'>
            <div className='sidebar'>
                <div className='sidebar__content'>
                    <header className='sidebar__header'>
                        <h1 className='sidebar__mini-title'>Health</h1>
                        <h2 className='sidebar__title'>
                            {sensor.properties.Location}
                        </h2>
                        <p className='sidebar__intro'>
                            {sensor.properties.Name}
                        </p>
                    </header>

                    <div className='health health--positive'>
                        <h3 className='health__heading'>
                            This site is in healthy condition!
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
                                <SensorDetails sensor={sensor} />
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