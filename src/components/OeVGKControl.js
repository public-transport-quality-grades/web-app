//@flow
import React, {Component} from 'react';
import {Accordion, Checkbox, Icon, Select} from 'semantic-ui-react';
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
    oeVGK18AccordionOpen: boolean,
    oeVGKAREEnabled: boolean,
    oeVGKAREAccordionOpen: boolean,
    dayOptions: DayOption[],
    timeOptions: TimeOption[],
    availableRatings: Rating[],
    selectedDay: string,
    selectedRatingId: number
};

class OevGKControl extends Component<{}, State> {
    state = {
        oeVGK18Enabled: true,
        oeVGK18AccordionOpen: true,
        oeVGKAREEnabled: false,
        oeVGKAREAccordionOpen: false,
        dayOptions: [],
        timeOptions: [],
        availableRatings: [],
        selectedDay: "",
        selectedRatingId: -1
    };

    componentDidMount = () => {
        this.updateDayOptions().then(this.updateTimeOptions);
    };

    updateDayOptions = (): Promise<string> => {
        return fetch('/api/typesOfDays')
            .then(this.getJsonResponse)
            .then((data: {days: string[]}) => {
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

    handleOeVGK18Toggle = (e) => {
        this.setState({
            oeVGK18Enabled: !this.state.oeVGK18Enabled
        });
        e.stopPropagation();
    };

    handleOeVGKAREToggle = (e) => {
        this.setState({
            oeVGKAREEnabled: !this.state.oeVGKAREEnabled
        });
        e.stopPropagation();
    };

    handleOeVGK18AccordionClick = () => {
        this.setState({oeVGK18AccordionOpen: !this.state.oeVGK18AccordionOpen});
    };

    handleOeVGKAREAccordionClick = () => {
        this.setState({oeVGKAREAccordionOpen: !this.state.oeVGKAREAccordionOpen});
        console.log(this.state.oeVGKAREAccordionOpen);
    };

    render() {
        const {oeVGK18Enabled, oeVGKAREEnabled, availableRatings, selectedRatingId, oeVGK18AccordionOpen, oeVGKAREAccordionOpen} = this.state;
        const selectedRatingIndex = availableRatings.findIndex((rating: Rating) => rating.id === selectedRatingId);
        const selectedRating = availableRatings[selectedRatingIndex];
        return (
            <main>
                <Accordion styled id="control" exclusive={false}>
                    <Accordion.Title onClick={this.handleOeVGK18AccordionClick} active={oeVGK18AccordionOpen}>
                        <Icon name='dropdown'/>
                        <Checkbox toggle
                                  checked={oeVGK18Enabled}
                                  className="accordionTitle"
                                  onClick={this.handleOeVGK18Toggle}/>
                        <label>ÖV-Güteklassen 2018</label>
                    </Accordion.Title>
                    <Accordion.Content active={oeVGK18AccordionOpen}>
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
                        <RatingInfoPanel rating={selectedRating}/>
                        }
                        <ColorLegend colors={config.colorsOeVGK18}/>
                    </Accordion.Content>

                    <Accordion.Title onClick={this.handleOeVGKAREAccordionClick} active={oeVGKAREAccordionOpen}>
                        <Icon name='dropdown'/>
                        <Checkbox toggle
                                  checked={oeVGKAREEnabled}
                                  className="accordionTitle"
                                  onClick={this.handleOeVGKAREToggle}/>
                        <label>ÖV-Güteklassen ARE</label>
                    </Accordion.Title>
                    <Accordion.Content active={oeVGKAREAccordionOpen}>
                        <ColorLegend colors={config.colorsARE}/>
                    </Accordion.Content>
                </Accordion>
                <LeafletMap
                    oeVGK18Rating={selectedRating}
                    showOeVGK18={oeVGK18Enabled}
                    showOeVGKARE={oeVGKAREEnabled}/>
            </main>
        );
    }
}

export default OevGKControl;