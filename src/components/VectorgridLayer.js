// @flow

import L from 'leaflet';
import PropTypes from 'prop-types';
import {} from 'leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled.js'
import { GridLayer } from 'react-leaflet';


export default class VectorgridLayer extends GridLayer<{}, {}> {
    static propTypes = {
        url: PropTypes.string.required,
        opacity: PropTypes.number,
        layerKey: PropTypes.string,
        featureStyle: PropTypes.func
    };

    getLayerOptions = (styleFunc: (properties: {}, zoom: number)=> {}, opacity: number) => {
        return {
            rendererFactory: L.canvas.tile,
            vectorTileLayerStyles: {
                'oevgk18_20181113_Daygeojson': styleFunc
            },
            maxZoom: 17,
            maxNativeZoom: 13,
            opacity: opacity
        };
    };

    createLeafletElement(props: Object): Object {
        const { url, featureStyle, opacity } = props;
        return L.vectorGrid.protobuf(url, this.getLayerOptions(featureStyle, opacity));
    }

    updateLeafletElement(fromProps: Object, toProps: Object) {
        super.updateLeafletElement(fromProps, toProps);
        const {url, featureStyle, opacity} = toProps;
        if (toProps.layerKey !== fromProps.layerKey) {
            this.leafletElement.protobuf(url, this.getLayerOptions(featureStyle, opacity))
        }
    }
}