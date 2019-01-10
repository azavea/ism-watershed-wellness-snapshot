import React from 'react';

import { initialViewportState } from './map.reducers';
import './BackToMapButton.scss';

export default function BackToMapButton(props) {
    const handleOnClick = () => props.handleOnClick(initialViewportState);

    return (
        <div id='back-to-map' onClick={handleOnClick}>
            Back to map
        </div>
    );
}
