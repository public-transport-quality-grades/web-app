//@flow
import React, { Component } from 'react';
import OeVGKControl from './components/OeVGKControl'
import HeaderControl from './components/HeaderControl'

class App extends Component<{}> {
    render() {
        return (
            <div>
                <HeaderControl />
                <OeVGKControl />
            </div>
        );
    }
}

export default App;