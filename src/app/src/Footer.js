import React from 'react';

import feedIcon from './img/feed.svg';

export default function Footer({ elapsedTime, timeLabel }) {
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
                <p className='footer__text'>
                    Health reading last updated {elapsedTime} {timeLabel} ago!
                </p>
            </div>
        </footer>
    );
}
