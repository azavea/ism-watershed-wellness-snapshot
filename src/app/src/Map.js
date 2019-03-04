import React, { Component } from 'react';
import ReactMapGL, {
    NavigationControl,
    Marker,
    FlyToInterpolator,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { updateViewport } from './map.actions';
import SensorMarker from './SensorMarker';
import BackToMapButton from './BackToMapButton';
import { toggleBackToMapButton } from './map.actions';

class GLMap extends Component {
    constructor() {
        super();

        this.mapRef = React.createRef();
    }

    componentDidMount() {
        const map = this.mapRef.current.getMap();
        map.addControl(new mapboxgl.AttributionControl({ compact: true }));
    }

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
        const {
            selectedSensor,
            sensorRatings,
        } = this.props;
        const overallRating = sensorRatings[sensor.properties.Id]
            ? sensorRatings[sensor.properties.Id].OVERALL_RATING
            : null;
        return (
            <Marker
                key={`marker-${index}`}
                longitude={sensor.geometry.coordinates[0]}
                latitude={sensor.geometry.coordinates[1]}
                anchor='bottom'
                offsetLeft={-40}
                offsetTop={-108}
            >
                <SensorMarker
                    sensor={sensor}
                    selectedSensor={selectedSensor}
                    sensorOverallRating={overallRating}
                    size={50}
                    handleOnClick={this.goToLocation}
                />
            </Marker>
        );
    };

    render() {
        return (
            <div id='map' className='map'>
                <ReactMapGL
                    {...this.props.mapstate}
                    ref={this.mapRef}
                    onViewportChange={this.props.updateViewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    mapStyle={
                        'mapbox://styles/azavea/cjrky7g714qpy2spmyk5u9llq'
                    }
                    interactive={false}
                    doubleClickZoom={false}
                    dragPan={false}
                    dragRotate={false}
                    touchRotate={false}
                    touchZoom={false}
                    scrollZoom={false}
                    attributionControl={false}
                >
                    <NavigationControl showZoom={false} />
                    {Object.values(this.props.sensors.features).map(
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
        mapstate: state.map.viewport,
        showBackToMapButton: state.map.isBackToMapButtonVisible,
        sensors: state.app.sensors,
        sensorRatings: state.app.sensorRatings,
        selectedSensor: state.app.selectedSensor,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateViewport: viewport => updateViewport(viewport),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GLMap);
