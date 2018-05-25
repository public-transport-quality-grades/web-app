// @flow

import L, {GridLayer as LeafletGridLayer} from 'leaflet';
import PropTypes from 'prop-types';
import {} from 'leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled.js'
import { GridLayer } from 'react-leaflet';
import type { GridLayerProps } from 'react-leaflet';


export default class VectorgridLayer extends GridLayer<LeafletGridLayer, GridLayerProps> {
    static propTypes = {
        url: PropTypes.string.required,
        opacity: PropTypes.number,
        layerKey: PropTypes.string,
        featureStyle: PropTypes.func
    };

    getLayerOptions = (styleFunc: (properties: {}, zoom: number)=> {}, layerName: string, opacity: number) => {
        return {
            rendererFactory: L.canvas.tile,
            vectorTileLayerStyles: {
                'oevgk18': styleFunc
            },
            maxZoom: 17,
            maxNativeZoom: 17,
            opacity: opacity
        };
    };

    createLeafletElement(props: Object): Object {
        const { url, featureStyle, opacity, layerName } = props;
        return L.vectorGrid.protobuf(url, this.getLayerOptions(featureStyle, layerName, opacity));
    }

    updateLeafletElement(fromProps: Object, toProps: Object) {
        super.updateLeafletElement(fromProps, toProps);
        if (toProps.layerKey !== fromProps.layerKey) {
            this.leafletElement.setUrl(toProps.url);
        }
    }
}