//@flow
import React, { Component } from 'react';
import MapboxMap from './MapboxMap';
import './OeVGKControl.css';
import geojson from './geojson.json'

class OevGKControl extends Component<{}> {

    render() {
        return (
            <div>
                <div id="control">
                    <p>Some controls</p>
                </div>
                <MapboxMap data={geojson}/>
            </div>
        );
    }
}

export default OevGKControl;