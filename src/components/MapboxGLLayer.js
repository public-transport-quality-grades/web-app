// @flow

import L from 'leaflet'
import {} from 'mapbox-gl-leaflet'
import PropTypes from 'prop-types'
import type {GridLayerProps} from 'react-leaflet';
import {GridLayer} from 'react-leaflet';


export default class MapboxGLLayer extends GridLayer<MapboxGLLayer, GridLayerProps> {
    static propTypes = {
        attribution: PropTypes.string,
        accessToken: PropTypes.string.isRequired,
        style: PropTypes.string,
        zIndex: PropTypes.number,
    };

    createLeafletElement(props: Object): Object {
        return L.mapboxGL(props)
    };
}