import React from 'react';

import feedIcon from './img/feed.svg';
import {
    getElapsedTimeLabel,
    getMostRecentDateFromList,
    getElapsedTimeSince,
} from './sensorUtils';

export default function Footer({ sensorReadingDates }) {
    const msElapsedSinceLastUpdate = getElapsedTimeSince(
        getMostRecentDateFromList(sensorReadingDates)
    );
    const label = getElapsedTimeLabel(msElapsedSinceLastUpdate);
    const message = label
        ? `Health reading last updated ${label}.`
        : 'Common sensor readings displayed for each site.';

    return (
        <footer className='footer footer--current-reading'>
            <div className='footer__content'>
                <div className='footer__icon'>
                    <img
                        className='footer__image'
                        src={feedIcon}
                        alt='Feed icon'
                    />
                </div>
                <p className='footer__text'>{message}</p>
            </div>
        </footer>
    );
}
