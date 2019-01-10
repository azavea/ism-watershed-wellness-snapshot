import React, { Component } from 'react';
import ReactMapGL, {
    NavigationControl,
    Marker,
    FlyToInterpolator,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'react-redux';

import { onChangeViewport } from './map.actions';
import './Map.scss';
import SensorMarker from './SensorMarker';
import BackToMapButton from './BackToMapButton';
import sensors from './sensors.json';
import { toggleBackToMapButton } from './map.actions';

class GLMap extends Component {
    goToLocation = options => {
        toggleBackToMapButton();

        this.props.updateViewport(
            Object.assign({}, options, {
                transitionInterpolator: new FlyToInterpolator(),
                transitionDuration: 3000,
            })
        );
    };

    renderCityMarkers = (sensor, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={sensor.geometry.coordinates[0]}
                latitude={sensor.geometry.coordinates[1]}
            >
                <SensorMarker
                    sensor={sensor}
                    size={50}
                    handleOnClick={this.goToLocation}
                />
            </Marker>
        );
    };

    render() {
        return (
            <div id='map'>
                <ReactMapGL
                    height={'100%'}
                    width={'100%'}
                    {...this.props.mapstate}
                    onViewportChange={this.props.updateViewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    mapStyle={'mapbox://styles/alash/cjpconu8b0sas2qn5rx51uog8'}
                    interactive={false}
                    doubleClickZoom={false}
                    dragPan={false}
                    dragRotate={false}
                    touchZoomRotate={false}
                    scrollZoom={false}
                >
                    <NavigationControl showZoom={false} />
                    {Object.values(sensors.features).map(
                        this.renderCityMarkers
                    )}
                </ReactMapGL>
                {this.props.showBackToMapButton ? (
                    <BackToMapButton handleOnClick={this.goToLocation} />
                ) : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mapstate: state.map.viewport.toJS(),
        showBackToMapButton: state.map.isBackToMapButtonVisible,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateViewport: viewport => dispatch(onChangeViewport(viewport)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GLMap);
