//@flow
import React, {Component} from 'react';
import {Accordion, Icon, Checkbox, Select} from 'semantic-ui-react';
import MapboxMap from './MapboxMap';
import './OeVGKControl.css';

type Option = {
    text: string,
    value: string
};

type Rating = {
    id: number,
    day: Date,
    typeOfDay: string,
    timeInterval: {
        timeDescription: string,
        start: string,
        end: string
    }
}

type State = {
    oevgk18Enabled: boolean,
    oevgk93Enabled: boolean,
    dayOptions: Option[],
    timeOptions: Option[],
    availableRatings: Rating[],
    selectedDay: string,
    selectedRatingId: string,
    mapData: {}
};


class OevGKControl extends Component<{}, State> {
    state = {
        oevgk18Enabled: true,
        oevgk93Enabled: false,
        dayOptions: [],
        timeOptions: [],
        availableRatings: [],
        selectedDay: "",
        selectedRatingId: "",
        mapData: {}
    };

    componentWillMount = () => {
        this.updateDayOptions().then(this.updateTimeOptions);
    };

    componentWillUpdate = (nextProps: {}, nextState: State) => {
        if (nextState.selectedRatingId !== this.state.selectedRatingId) {
            this.updateMapData(nextState.selectedRatingId);
        }
    };

    updateDayOptions = (): Promise<string> => {
        return fetch('/api/availableDays')
            .then(this.getJsonResponse)
            .then((data: any) => {
                // TODO error handling
                if (!data.days)
                    return Promise.reject("key 'days' not in availableDaysResponse");
                let newDayOptions = data.days.map((day): Option => {
                    return {text: day, value: day};
                });
                let defaultSelection = newDayOptions[0].value;
                this.setState({dayOptions: newDayOptions, selectedDay: newDayOptions[0].value});
                return defaultSelection;
            });
    };

    updateTimeOptions = (selectedDay: string) => {
        fetch(`/api/availableRatings?typeOfDay=${selectedDay}`)
            .then(this.getJsonResponse)
            .then((data: Rating[]) => {
                // TODO error handling
                let newTimeOptions: Option[] = data.map((rating: Rating): Option => {
                    return {
                        text: rating.timeInterval.timeDescription,
                        value: rating.id.toString()
                    };
                });
                let newSelectedRatingId: string = this.state.timeOptions === newTimeOptions ?
                    this.state.selectedRatingId : newTimeOptions[0].value;

                this.setState({
                    availableRatings: data,
                    timeOptions: newTimeOptions,
                    selectedRatingId: newSelectedRatingId
                });

            })
    };

    updateMapData = (ratingId: string) => {
        fetch(`/api/rating/${ratingId}`)
            .then(this.getJsonResponse)
            .then((data: {}) => {
                this.setState({mapData: data});
            });
    };

    handleOeVGK18Toggle = () => {
        this.setState({oevgk18Enabled: !this.state.oevgk18Enabled})
    };

    handleOeVGK93Toggle = () => {
        this.setState({oevgk93Enabled: !this.state.oevgk93Enabled})
    };

    handleDaySelect = (event: SyntheticMouseEvent<Select>, selectProps: { value: string }) => {
        let {value} = selectProps;
        this.updateTimeOptions(value);
        this.setState({selectedDay: value});
    };

    handleTimeSelect = (event: SyntheticMouseEvent<Select>, selectProps: { value: string }) => {
        let {value} = selectProps;
        this.setState({selectedRatingId: value});
    };

    getJsonResponse = (response: Response) => {
        return response.json();
    };

    render() {
        const {oevgk18Enabled, oevgk93Enabled} = this.state
        return (
            <div>
                <Accordion styled id="control">
                    <Accordion.Title active={oevgk18Enabled} onClick={this.handleOeVGK18Toggle}>
                        <Icon name='dropdown'/>
                        <Checkbox toggle defaultChecked={true}
                                  checked={oevgk18Enabled}
                                  className="accordionTitle"
                                  label="ÖV-Güteklassen 2018"
                                  onClick={this.handleOeVGK18Toggle}/>
                    </Accordion.Title>
                    <Accordion.Content active={oevgk18Enabled}>
                        <div>
                            <Select fluid
                                    placeholder='Tag auswählen'
                                    value={this.state.selectedDay}
                                    options={this.state.dayOptions}
                                    onChange={this.handleDaySelect}/>
                            <Select fluid
                                    placeholder='Zeitbereich auswählen'
                                    value={this.state.selectedRatingId}
                                    options={this.state.timeOptions}
                                    onChange={this.handleTimeSelect}/>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title active={oevgk93Enabled} onClick={this.handleOeVGK93Toggle}>
                        <Checkbox toggle checked={oevgk93Enabled}
                                  className="accordionTitle"
                                  label="ÖV-Güteklassen ARE"
                                  onClick={this.handleOeVGK93Toggle}/>
                    </Accordion.Title>
                </Accordion>
                <MapboxMap data={this.state.mapData} showLayer={this.state.oevgk18Enabled}/>
            </div>
        );
    }
}

export default OevGKControl;