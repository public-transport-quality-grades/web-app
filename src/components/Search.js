import { MapControl } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

require('leaflet-geosearch/assets/css/leaflet.css');

export default class Search extends MapControl {

  createLeafletElement() {
    console.log('geosearch')
    return GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      autoComplete: true,
      searchLabel: 'search'
    });
  };

};
