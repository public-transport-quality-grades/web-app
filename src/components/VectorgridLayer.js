// @flow

import L, {GridLayer as LeafletGridLayer} from 'leaflet';
import {} from 'leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled.js'
import PropTypes from 'prop-types';
import type {GridLayerProps} from 'react-leaflet';
import {GridLayer} from 'react-leaflet';


export default class VectorgridLayer extends GridLayer<LeafletGridLayer, GridLayerProps> {
    static propTypes = {
        url: PropTypes.string,
        opacity: PropTypes.number,
        zIndex: PropTypes.number,
        layerKey: PropTypes.string,
        featureStyle: PropTypes.func
    };

    getLayerOptions = (styleFunc: (properties: {}, zoom: number) => {}, opacity: number, zIndex: number) => {
        return {
            rendererFactory: L.canvas.tile,
            vectorTileLayerStyles: {
                oevgk: styleFunc
            },
            maxZoom: 17,
            maxNativeZoom: 17,
            opacity: opacity,
            zIndex: zIndex
        };
    };

    createLeafletElement(props: Object): Object {
        const {url, opacity, zIndex, featureStyle} = props;
        return L.vectorGrid.protobuf(url, this.getLayerOptions(featureStyle, opacity, zIndex));
    };

    updateLeafletElement(fromProps: Object, toProps: Object) {
        super.updateLeafletElement(fromProps, toProps);
        if (toProps.layerKey !== fromProps.layerKey) {
            this.leafletElement.setUrl(toProps.url);
        }
    };
}