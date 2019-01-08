import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'react-redux';

import onChangeViewport from './map.actions';
import './Map.scss';

class GLMap extends Component {
    render() {
        return (
            <div id='map'>
                <ReactMapGL
                    height={'100%'}
                    width={'100%'}
                    {...this.props.viewport}
                    onViewportChange={this.props.updateViewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.map.viewport.toJS();
}

function mapDispatchToProps(dispatch) {
    return {
        updateViewport: viewport => dispatch(onChangeViewport({ viewport })),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GLMap);
