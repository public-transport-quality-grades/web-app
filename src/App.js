//@flow
import React, { Component } from 'react';
import OeVGKControl from './OeVGKControl'
import './App.css';

class App extends Component<{}> {
    // handleShowLayerChange = (event) => {
    //     this.setState({showLayer: event.target.checked});
    // };

    render() {
        return (
            <div>
                <OeVGKControl />
            </div>
        );
    }
}

export default App;