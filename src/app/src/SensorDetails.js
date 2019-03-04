import React from 'react';
import ReactDOM from 'react-dom';

import closeIcon from './img/times.svg';
import { hideSensorModal } from './app.actions';
import {
    getFishIconForVariableRating,
    getFishBackgroundForVariableRating,
    getClassNameFromVariableRating,
} from './sensorUtils';
import { VARIABLES, VARIABLE_DETAILS } from './constants';

export default function SensorDetail({ sensor, sensorRatings, sensorData }) {
    const variableSections = VARIABLES.map(v => {
        const {
            properties: { HealthyRanges },
        } = sensor;

        const { unit, name, description } = VARIABLE_DETAILS[v];

        const variableRating = sensorRatings[v];
        const score = sensorData[v];
        const scoreWithUnit = `${score} ${unit}`;
        const range = `${HealthyRanges[v].lower}-${
            HealthyRanges[v].upper
        } ${unit}`;

        return (
            <section className='section' key={v}>
                <div className='section__content'>
                    <h3 className='section__title'>{name}</h3>
                    <p className='section__description'>
                        Between {range} is considered a healthy range
                    </p>
                    <p className='section__body'>{description}</p>
                </div>
                <div
                    className={`section__illustration indicator-reading indicator-reading--${getClassNameFromVariableRating(
                        variableRating
                    )}`}
                >
                    <img
                        className='indicator-reading__fish'
                        src={getFishIconForVariableRating(variableRating)}
                        alt=''
                    />
                    <div className='indicator-reading__reading'>
                        {scoreWithUnit}
                    </div>
                    <img
                        className='indicator-reading__background'
                        src={getFishBackgroundForVariableRating(variableRating)}
                        alt=''
                    />
                </div>
            </section>
        );
    });

    return ReactDOM.createPortal(
        <div id='modal-1' className='modal is-open'>
            <div
                className='modal__container'
                role='dialog'
                aria-modal='true'
                aria-labelledby='modal-1-title'
            >
                <header className='modal__header'>
                    <div className='modal__header-content'>
                        <h1 className='modal__mini-title'>Health</h1>
                        <h2 id='modal-1-title' className='modal__title'>
                            {sensor.properties.Location} in detail
                        </h2>
                        <p className='modal__intro'>
                            To determine the overall health of this site, we
                            look at 5 key indicators. See{' '}
                            {sensor.properties.Location}’s current reading for
                            each indicator below:
                        </p>
                    </div>
                    <button
                        aria-label='Close modal'
                        data-micromodal-close
                        className='modal__close button button--icon'
                        onClick={hideSensorModal}
                    >
                        <img
                            className='button__image'
                            src={closeIcon}
                            alt='Close modal'
                        />
                    </button>
                </header>

                <div id='modal-1-content' className='modal__content'>
                    {variableSections}
                </div>

                <footer className='modal__footer'>
                    <button
                        className='modal__button button button--primary'
                        data-micromodal-close
                        aria-label='Close this dialog window'
                        onClick={hideSensorModal}
                    >
                        Close
                    </button>
                </footer>
            </div>
            <div className='modal__overlay' tabIndex='-1' />
        </div>,
        document.getElementById('app-container')
    );
}
