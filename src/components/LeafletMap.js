//@flow
import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import './LeafletMap.css';
require('leaflet/dist/leaflet.css');


type Props = {
    geojson: {},
    showLayer: boolean
}

type State = {
    lat: number,
    lng: number,
    zoom: number
}

export default class LeafletMap extends React.Component<Props, State> {

    state = {
      lat: 47.22382,
      lng: 8.81669,
      zoom: 12,
    };

  getStyle = (feature: any, layer: any) => {
    return {
        stroke: false,
        fillColor: feature.properties.fill,
        //fillOpacity: feature.properties['fill-opacity']
        fillOpacity: 1
    }
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          subdomains='abcd'
        />
        { this.props.showLayer &&
          <GeoJSON data={this.props.geojson} style={this.getStyle} className="leaflet-geojson-layer"/>
        }
      </Map>
    );
  }
}