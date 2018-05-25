//@flow
import React from 'react';
import { Map, TileLayer, GeoJSON, Pane } from 'react-leaflet';
import * as config from '../config.js';
import './LeafletMap.css';
import VectorgridLayer from './VectorgridLayer';
require('leaflet/dist/leaflet.css');


type Props = {
    oeVGK18Rating: {
        tile_name: string
    },
    oeVKGAREData: {},
    showOeVGK18: boolean,
    showOeVGKARE: boolean
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
    zoom: 14,
  };

  getOeVGK18Style = (properties: any, zoom: any) => {
    return {
        stroke: false,
        fill: true,
        fillColor: config.colorsOeVGK18[properties.grade],
        fillOpacity: 1
    }
  };

  getOeVKGAREStyle = (feature: any, layer: any) => {
    return {
        fillOpacity: 0,
        color: config.colorsARE[feature.properties.KLASSE]
    };
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    const {oeVGK18Rating} = this.props;
    return (
      <Map center={position} zoom={this.state.zoom} maxZoom={17} minZoom={8} zoomControl={false}>
        <TileLayer
          attribution={'Elevation model &copy; Bundesamt für Landestopografie ' +
          '<a href="https://www.swisstopo.admin.ch/">Swisstopo</a> | ' +
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
          url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
        />
        <Pane name={'oevgk18Pane'}>

            { this.props.showOeVGK18 && this.props.oeVGK18Rating &&
                <VectorgridLayer layerKey={oeVGK18Rating.tile_name}
                             url={"/data/" + oeVGK18Rating.tile_name + "/{z}/{x}/{y}.pbf"}
                             opacity={config.oeVGK18Opacity} featureStyle={this.getOeVGK18Style}/>
            }
        </Pane>
        <Pane name={'oevgkAREPane'}>
            {this.props.showOeVGKARE && this.props.oeVKGAREData.hasOwnProperty('type') &&
                <GeoJSON data={this.props.oeVKGAREData} style={this.getOeVKGAREStyle} />
            }
        </Pane>
      </Map>
    );
  }
}