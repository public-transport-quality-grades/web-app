//@flow
import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import * as config from '../config.js';
import './LeafletMap.css';
require('leaflet/dist/leaflet.css');


type Props = {
    oeVKG18Data: {},
    oeVKGAREData: {},
    showOeVGK18: boolean,
    showOeVGKARE: boolean,
    selectedRatingId: number
}

type State = {
    lat: number,
    lng: number,
    zoom: number,

}

export default class LeafletMap extends React.Component<Props, State> {

  state = {
    lat: 46.8513,
    lng: 9.5264,
    zoom: 14
  };

  getOeVGK18Style = (feature: any, layer: any) => {
    return {
        stroke: false,
        fillColor: feature.properties.fill,
        fillOpacity: 1
    }
  };

  getOeVKGAREStyle = (feature: any, layer: any) => {
    var styleObj = {fillOpacity: 0}
    switch (feature.properties.KLASSE) {
      case "A": styleObj.color = config.colorsARE.A; break;
      case "B": styleObj.color = config.colorsARE.B; break;
      case "C": styleObj.color = config.colorsARE.C; break;
      case "D": styleObj.color = config.colorsARE.D; break;
      default: styleObj.color = config.colorsARE.D;
    }    
    return styleObj;
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
        />
        { this.props.showOeVGK18 &&
          <GeoJSON key={this.props.selectedRatingId} data={this.props.oeVKG18Data} style={this.getOeVGK18Style} className="leaflet-geojson-layer" />
        }
        {this.props.showOeVGKARE && this.props.oeVKGAREData.hasOwnProperty('type') &&
          <GeoJSON data={this.props.oeVKGAREData} style={this.getOeVKGAREStyle} />
        }
      </Map>
    );
  }
}