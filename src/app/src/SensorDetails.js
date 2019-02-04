import React from 'react';
import ReactDOM from 'react-dom';

import closeIcon from './img/times.svg';
import positiveFishIcon from './img/fish_positive.svg';
import positiveBackground from './img/health_background_positive.svg';
import warningFishIcon from './img/fish_warning.svg';
import warningBackground from './img/health_background_warning.svg';
import negativeFishIcon from './img/fish_negative.svg';
import negativeBackground from './img/health_background_negative.svg';
import { hideSensorModal } from './app.actions';

export default function SensorDetail({ sensor }) {
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
                    <section className='section'>
                        <div className='section__content'>
                            <h3 className='section__title'>Turbidity</h3>
                            <p className='section__description'>
                                Between 1-50 NTU is considered a healthy range
                            </p>
                            <p className='section__body'>
                                Turbidity is a measurement of the cloudiness in
                                a body of water. This cloudiness is caused by
                                the presense of particles that can be invisible
                                to the human eye.
                            </p>
                        </div>
                        <div className='section__illustration indicator-reading indicator-reading--positive'>
                            <img
                                className='indicator-reading__fish'
                                src={positiveFishIcon}
                                alt=''
                            />
                            <div className='indicator-reading__reading'>
                                43 NTU
                            </div>
                            <img
                                className='indicator-reading__background'
                                src={positiveBackground}
                                alt=''
                            />
                        </div>
                    </section>

                    <section className='section'>
                        <div className='section__content'>
                            <h3 className='section__title'>Dissolved Oxygen</h3>
                            <p className='section__description'>
                                Between 2-24 mg/L is considered a healthy range
                            </p>
                            <p className='section__body'>
                                A measure of the concentration of oxygen
                                dissolved in a body of water, relative to the
                                maximum concentration.
                            </p>
                        </div>
                        <div className='section__illustration indicator-reading indicator-reading--positive'>
                            <img
                                className='indicator-reading__fish'
                                src={positiveFishIcon}
                                alt=''
                            />
                            <div className='indicator-reading__reading'>
                                3 mg/L
                            </div>
                            <img
                                className='indicator-reading__background'
                                src={positiveBackground}
                                alt=''
                            />
                        </div>
                    </section>

                    <section className='section'>
                        <div className='section__content'>
                            <h3 className='section__title'>pH</h3>
                            <p className='section__description'>
                                Between 6.5-8.5pH is considered a healthy range
                            </p>
                            <p className='section__body'>
                                pH is a quantitative measure of the acidity
                                (below 7.0pH) or basicity (above 7.0pH) in a
                                body of water.
                            </p>
                        </div>
                        <div className='section__illustration indicator-reading indicator-reading--positive'>
                            <img
                                className='indicator-reading__fish'
                                src={positiveFishIcon}
                                alt=''
                            />
                            <div className='indicator-reading__reading'>
                                8.35 pH
                            </div>
                            <img
                                className='indicator-reading__background'
                                src={positiveBackground}
                                alt=''
                            />
                        </div>
                    </section>

                    <section className='section'>
                        <div className='section__content'>
                            <h3 className='section__title'>
                                Water temperature
                            </h3>
                            <p className='section__description'>
                                Between 40-87°F is considered a healthy range
                            </p>
                            <p className='section__body'>
                                Water temperature affects the growth and
                                reproduction of living organisms as well as
                                water density.
                            </p>
                        </div>
                        <div className='section__illustration indicator-reading indicator-reading--negative'>
                            <img
                                className='indicator-reading__fish'
                                src={negativeFishIcon}
                                alt=''
                            />
                            <div className='indicator-reading__reading'>
                                95°F
                            </div>
                            <img
                                className='indicator-reading__background'
                                src={negativeBackground}
                                alt=''
                            />
                        </div>
                    </section>

                    <section className='section'>
                        <div className='section__content'>
                            <h3 className='section__title'>
                                Index of Biological Integrity
                            </h3>
                            <p className='section__description'>
                                Aenean lacinia bibendum nulla sed consectetur
                            </p>
                            <p className='section__body'>
                                Index of Biological Integrity (IBI) is a
                                scientific measurement of stream health through
                                biological criteria, such as the presence of
                                animal life.
                            </p>
                        </div>
                        <div className='section__illustration indicator-reading indicator-reading--warning'>
                            <img
                                className='indicator-reading__fish'
                                src={warningFishIcon}
                                alt=''
                            />
                            <div className='indicator-reading__reading'>
                                Moderate
                            </div>
                            <img
                                className='indicator-reading__background'
                                src={warningBackground}
                                alt=''
                            />
                        </div>
                    </section>
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
