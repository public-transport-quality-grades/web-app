//@flow
import React from 'react';
import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";
import * as config from '../config.js'

const Map = ReactMapboxGl({
    accessToken: "not-needed",
});


type Coordinate = number[]

type Props = {
    data: {},
    showLayer: boolean
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
                {this.props.showLayer &&
                <GeoJSONLayer data={this.props.data}
                              fillPaint={{
                                  "fill-color": ["get", "fill"],
                                  "fill-opacity": ["get", "fill-opacity"],
                                  "fill-outline-color": ["get", "stroke"]
                              }}/>
                }}
                }
            </Map>
        );
    }
}