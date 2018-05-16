//@flow
import React from 'react';
import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";
import * as config from '../config.js';

const Map = ReactMapboxGl({
    accessToken: "not-needed",
});


type Coordinate = number[]

type Props = {
    oeVKG18Data: {},
    oeVKGAREData: {},
    showOeVGK18: boolean,
    showOeVGKARE: boolean
}

type State = {
    center: Coordinate,
    zoom: Array<number>
}

export default class MapboxMap extends React.Component<Props, State> {

    state = {
        center: [8.81669, 47.22382],
        zoom: [9]
    };


    render() {
        return (
            <Map
                style={config.mapboxStyleUrl}
                center={this.state.center}
                zoom={this.state.zoom}
                containerStyle={{
                    height: "100vh",
                    width: "100vw"
                }}>
                {this.props.showOeVGK18 &&
                <GeoJSONLayer data={this.props.oeVKG18Data}
                              fillPaint={{
                                  "fill-color": ["get", "fill"],
                                  "fill-opacity": ["get", "fill-opacity"],
                                  "fill-outline-color": "rgba(0, 0, 0, 0)" // set an invisible outline with opacity 0
                              }}/>
                }
                {this.props.showOeVGKARE && this.props.oeVKGAREData.hasOwnProperty('type') &&
                <GeoJSONLayer data={this.props.oeVKGAREData}
                              fillPaint={{
                                  "fill-color": ["case",
                                      ["==", ["get", "KLASSE"], "A"], config.colorsARE.A,
                                      ["==", ["get", "KLASSE"], "B"], config.colorsARE.B,
                                      ["==", ["get", "KLASSE"], "C"], config.colorsARE.C,
                                      ["==", ["get", "KLASSE"], "D"], config.colorsARE.D,
                                      "#ffffff" // default if none match
                                  ],
                                  "fill-opacity": 0.5
                              }}
                    />
                }
            </Map>
        );
    }
}