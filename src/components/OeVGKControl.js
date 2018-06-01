//@flow
import React, {Component} from 'react';
import {Accordion, Icon, Checkbox, Select} from 'semantic-ui-react';
import * as config from '../config.js'
import LeafletMap from './LeafletMap';
import RatingInfoPanel from './RatingInfoPanel';
import ColorLegend from './ColorLegend';
import './OeVGKControl.css';

type DayOption = {
    text: string,
    value: string
};

type TimeOption = {
    text: string,
    value: number
};

export type Rating = {
    id: number,
    due_date: Date,
    type_of_day: string,
    time_interval: {
        time_description: string,
        start: string,
        end: string
    },
    tile_name: string
}


type State = {
    oeVGK18Enabled: boolean,
    oeVGKAREEnabled: boolean,
    dayOptions: DayOption[],
    timeOptions: TimeOption[],
    availableRatings: Rating[],
    selectedDay: string,
    selectedRatingId: number,
    mapDataOeVGKARE: {}
};


class OevGKControl extends Component<{}, State> {
    state = {
        oeVGK18Enabled: true,
        oeVGKAREEnabled: false,
        dayOptions: [],
        timeOptions: [],
        availableRatings: [],
        selectedDay: "",
        selectedRatingId: -1,
        mapDataOeVGKARE: {}
    };

    componentDidMount = () => {
        this.updateDayOptions().then(this.updateTimeOptions);
    };

    updateDayOptions = (): Promise<string> => {
        return fetch('/api/typesOfDays')
            .then(this.getJsonResponse)
            .then((data: any) => {
                if (!data.days)
                    return Promise.reject("key 'days' not in availableDaysResponse");
                let newDayOptions = data.days.map((day): DayOption => {
                    return {text: day, value: day};
                });
                let defaultSelection = newDayOptions[0].value;
                this.setState({dayOptions: newDayOptions, selectedDay: newDayOptions[0].value});
                return defaultSelection;
            });
    };

    updateTimeOptions = (selectedDay: string) => {
        fetch(`/api/gradings?typeOfDay=${selectedDay}`)
            .then(this.getJsonResponse)
            .then((data: Rating[]) => {
                // TODO error handling

                // correctly parse day as date
                const ratings: Rating[] = data.map((rating: Rating): Rating => {
                    rating.due_date = new Date(rating.due_date);
                    return rating;
                });

                let newTimeOptions: TimeOption[] = ratings.map((rating: Rating): TimeOption => {
                    return {
                        text: rating.time_interval.time_description,
                        value: rating.id
                    };
                });
                let newSelectedRatingId: number = this.state.timeOptions === newTimeOptions ?
                    this.state.selectedRatingId : newTimeOptions[0].value;

                this.setState({
                    availableRatings: ratings,
                    timeOptions: newTimeOptions,
                    selectedRatingId: newSelectedRatingId,
                });

            })
    };

    handleOeVGK18Toggle = () => {
        this.setState({
            oeVGK18Enabled: !this.state.oeVGK18Enabled
        });
    };

    handleOeVGK93Toggle = () => {
        this.setState({
            oeVGKAREEnabled: !this.state.oeVGKAREEnabled
        });
    };

    handleDaySelect = (event: SyntheticMouseEvent<Select>, selectProps: { value: string }) => {
        let {value} = selectProps;
        this.updateTimeOptions(value);
        this.setState({selectedDay: value});
    };

    handleTimeSelect = (event: SyntheticMouseEvent<Select>, selectProps: { value: number }) => {
        let {value} = selectProps;
        this.setState({selectedRatingId: value});
    };

    getJsonResponse = (response: Response) => {
        return response.json();
    };

    render() {
        const {oeVGK18Enabled, oeVGKAREEnabled, mapDataOeVGKARE,
            availableRatings, selectedRatingId} = this.state;
        const selectedRatingIndex = availableRatings.findIndex((rating: Rating) => rating.id === selectedRatingId);
        const selectedRating = availableRatings[selectedRatingIndex];

        return (
            <div>
                <Accordion styled id="control">
                    <Accordion.Title active={oeVGK18Enabled} onClick={this.handleOeVGK18Toggle}>
                        <Icon name='dropdown'/>
                        <Checkbox toggle
                              checked={oeVGK18Enabled}
                              className="accordionTitle"
                              label="ÖV-Güteklassen 2018"
                              onClick={this.handleOeVGK18Toggle}/>
                    </Accordion.Title>
                    <Accordion.Content active={oeVGK18Enabled}>
                        <div className="dropdowns">
                            <Select fluid
                                    placeholder='Tag auswählen'
                                    value={this.state.selectedDay}
                                    options={this.state.dayOptions}
                                    onChange={this.handleDaySelect}/>
                            <Select fluid
                                    placeholder='Zeitbereich auswählen'
                                    value={selectedRatingId}
                                    options={this.state.timeOptions}
                                    onChange={this.handleTimeSelect}/>
                        </div>
                        {selectedRating &&
                            <RatingInfoPanel rating={selectedRating} />
                        }

                        {oeVGK18Enabled &&
                            <ColorLegend colors={config.colorsOeVGK18}/>
                        }
                    </Accordion.Content>

                    <Accordion.Title active={oeVGKAREEnabled} onClick={this.handleOeVGK93Toggle}>
                        <Icon name='dropdown'/>
                        <Checkbox toggle checked={oeVGKAREEnabled}
                                  className="accordionTitle"
                                  label="ÖV-Güteklassen ARE"
                                  onClick={this.handleOeVGK93Toggle}/>
                    </Accordion.Title>
                    <Accordion.Content active={oeVGKAREEnabled}>
                        <ColorLegend colors={config.colorsARE}/>
                    </Accordion.Content>
                </Accordion>
                <LeafletMap 
                    oeVGK18Rating={selectedRating} oeVKGAREData={mapDataOeVGKARE}
                    showOeVGK18={oeVGK18Enabled} showOeVGKARE={oeVGKAREEnabled} />
            </div>
        );
    }
}

export default OevGKControl;