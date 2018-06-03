// @flow

import {MapControl} from 'react-leaflet';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';

require('leaflet-geosearch/assets/css/leaflet.css');

export default class GeoSearch extends MapControl {

    createLeafletElement(props: Object): Object {
        return GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            style: 'bar',
            showMarker: false,
            autoClose: true,
            searchLabel: 'Suche'
        });
    };

};
