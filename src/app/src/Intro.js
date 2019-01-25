import React, { Component } from 'react';

import { hideIntro } from './app.actions';

class Intro extends Component {
    render() {
        return (
            <div className='main l-intro'>
                <main className='main__content'>
                    <div className='intro'>
                        <h1 className='intro__heading'>
                            <div className='intro__small-heading'>
                                How healthy is the
                            </div>
                            Delaware River Basin?
                        </h1>
                        <button
                            type='button'
                            id='enter-button'
                            className='intro__button button button--primary button--pulsate'
                            onClick={hideIntro}
                        >
                            Find out
                        </button>
                    </div>
                </main>
            </div>
        );
    }
}

export default Intro;
