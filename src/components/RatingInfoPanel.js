import React, {Component} from 'react';
import type {Rating} from './OeVGKControl.js';
import {List} from 'semantic-ui-react';

type Props = {
  rating: Rating
};

class RatingInfoPanel extends Component<Props> {

    formatDate = (date: Date): string => {
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    };

    render(){
        const {due_date, type_of_day, time_interval} = this.props.rating;
        const {time_description, start, end} = time_interval;

        return (
          <div className="ratingInfoPanel">
              <List>
                  <List.Item>
                      <List.Content>
                          <List.Header>Stichtag</List.Header>
                          <List.Description>{type_of_day}, {this.formatDate(due_date)}</List.Description>
                      </List.Content>
                  </List.Item>
                  <List.Item>
                      <List.Content>
                          <List.Header>Zeitintervall</List.Header>
                          <List.Description>{time_description}, {start} - {end}</List.Description>
                      </List.Content>
                  </List.Item>
              </List>
          </div>
        );
    };
}

export default RatingInfoPanel;