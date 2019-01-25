import React, { Component } from 'react';

import feedIcon from './img/feed.svg';

class Footer extends Component {
    render() {
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
                        Health reading last updated 3 minutes ago!
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;
