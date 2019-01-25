import React, { Component } from 'react';

import fishMarkerIcon from './img/fish_marker_icon.svg';

class Header extends Component {
    render() {
        return (
            <header className='banner'>
                <div className='banner__content'>
                    <div className='banner__icon'>
                        <img
                            className='banner__image'
                            src={fishMarkerIcon}
                            alt='Fish marker icon'
                        />
                    </div>
                    <p className='banner__text'>
                        Tap a location to learn more about its health!
                    </p>
                </div>
            </header>
        );
    }
}

export default Header;
