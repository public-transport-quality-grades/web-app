//@flow
import React from 'react';
import {Map, Pane, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import * as config from '../config.js';
import './LeafletMap.css';
import VectorgridLayer from './VectorgridLayer';
import GeoSearch from './GeoSearch';

require('leaflet/dist/leaflet.css');


type Props = {
    oeVGK18Rating: {
        tile_name: string
    },
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
        lat: 46.80111111,
        lng: 8.22666667,
        zoom: 9,
    };

    componentDidMount = () => {
        this.readHashParameters(window.location.hash);
    };

    readHashParameters = (hash: string) => {
        if (!!hash) {
            let zoom, lat, lng;
            [zoom, lat, lng] = hash.replace('#', '').split('/');
            this.setState({zoom: parseInt(zoom, 10), lat: parseFloat(lat), lng: parseFloat(lng)});
        }
    };

    updateHash = (event: any) => {
        const map = event.target;
        const {lat, lng} = map.getCenter();
        const zoom = map.getZoom();
        window.location.hash = `#${zoom}/${lat.toPrecision(5)}/${lng.toPrecision(5)}`;
    };

    getOeVKGAREStyle = (properties: any) => {
        return {
            color: config.colorsARE[properties.KLASSE]
        };
    };

    getTransportStopsStyle = () => {
        const LeafIcon = L.Icon.extend({
            options: {
                iconSize: [12, 12]
            }
        });
        const stopIcon = new LeafIcon({
            iconUrl: 'stop-icon.svg'
        });
        return {
            icon: stopIcon
        };
    };


    getOeVGK18Style = (properties: any) => {
        return {
            stroke: false,
            fill: true,
            fillColor: config.colorsOeVGK18[properties.grade],
            fillOpacity: 1
        }
    };


    render() {
        const position = [this.state.lat, this.state.lng];
        const {oeVGK18Rating} = this.props;
        return (
            <Map center={position} zoom={this.state.zoom} maxZoom={17} minZoom={8} zoomControl={false}
                 onMoveend={this.updateHash}>
                <TileLayer
                    attribution={'Elevation model &copy; Bundesamt für Landestopografie ' +
                    '<a href="https://www.swisstopo.admin.ch/">Swisstopo</a> | ' +
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                    url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                />
                <Pane name={'oevgk18Pane'}>
                    {this.props.showOeVGK18 && this.props.oeVGK18Rating &&
                    <VectorgridLayer
                        layerKey={oeVGK18Rating.tile_name}
                        url={"/data/" + oeVGK18Rating.tile_name + "/{z}/{x}/{y}.pbf"}
                        opacity={config.oeVGK18Opacity}
                        zIndex={2}
                        featureStyle={this.getOeVGK18Style}/>
                    }
                </Pane>
                <Pane name={'oevgkAREPane'}>
                    {this.props.showOeVGKARE &&
                    <VectorgridLayer
                        layerKey={'oevgkare'}
                        url={"/data/Oev_Gueteklassen_ARE/{z}/{x}/{y}.pbf"}
                        zIndex={3}
                        featureStyle={this.getOeVKGAREStyle}/>
                    }
                </Pane>
                <Pane name={'transportStopsPane'}>
                    <VectorgridLayer
                        layerKey={'transport_stops'}
                        url={"/data/transport_stops/{z}/{x}/{y}.pbf"}
                        zIndex={4}
                        featureStyle={this.getTransportStopsStyle}/>
                </Pane>
                <GeoSearch/>
            </Map>
        );
    }
}