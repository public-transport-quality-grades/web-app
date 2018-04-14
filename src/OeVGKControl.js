//@flow
import React, { Component } from 'react';
import { Accordion, Icon, Checkbox, Select } from 'semantic-ui-react';
import MapboxMap from './MapboxMap';
import './OeVGKControl.css';
import geojson from './geojson.json'

type Option = {
    text: string,
    value: string
};

type State = {
    oevgk18Enabled: boolean,
    oevgk93Enabled: boolean,
    dayOptions: Option[],
    timeOptions: Option[]
};


class OevGKControl extends Component<{}, State> {
    state = {
        oevgk18Enabled: true,
        oevgk93Enabled: false,
        dayOptions: [
            {text: 'Samstag', value: 'Samstag'},
            {text: 'Wochentag', value: 'Wochentag'}
        ],
        timeOptions: [
            {text: 'Tag', value: 'Tag'},
            {text: 'Abend', value: 'Abend'}
        ]
    };

    handleOeVGK18Toggle = () => {
        this.setState({ oevgk18Enabled: !this.state.oevgk18Enabled })
    };

    handleOeVGK93Toggle = () => {
        this.setState({ oevgk93Enabled: !this.state.oevgk93Enabled })
    };

    render() {
        const { oevgk18Enabled, oevgk93Enabled } = this.state
        return (
            <div>
                <Accordion styled id="control">
                    <Accordion.Title active={oevgk18Enabled} onClick={this.handleOeVGK18Toggle}>
                        <Icon name='dropdown' />
                        <Checkbox toggle defaultChecked={true}
                                  checked={oevgk18Enabled}
                                  className="accordionTitle"
                                  label="ÖV-Güteklassen 2018"
                                  onClick={this.handleOeVGK18Toggle} />
                    </Accordion.Title>
                    <Accordion.Content active={oevgk18Enabled}>
                        <div>
                            <p>
                                <Select fluid
                                        placeholder='Tag auswählen'
                                        options={this.state.dayOptions} />
                            </p>
                            <p>
                                <Select fluid
                                        placeholder='Zeitbereich auswählen'
                                        options={this.state.timeOptions} />
                            </p>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title active={oevgk93Enabled} onClick={this.handleOeVGK93Toggle}>
                        <Checkbox toggle checked={oevgk93Enabled}
                                  className="accordionTitle"
                                  label="ÖV-Güteklassen ARE"
                                  onClick={this.handleOeVGK93Toggle}/>
                    </Accordion.Title>
                </Accordion>
                <MapboxMap data={geojson}/>
            </div>
        );
    }
}

export default OevGKControl;