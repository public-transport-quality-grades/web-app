import React, {Component} from 'react';
import type {Rating} from './OeVGKControl.js';
import {List} from 'semantic-ui-react';

type Props = {
  rating: Rating
};

class RatingInfoPanel extends Component<Props> {

    formatDate = (date: Date): string => {
        // TODO: Enable when date parsing is fixed
      return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
    };

    render(){
        const {day, typeOfDay, timeInterval} = this.props.rating;
        const {timeDescription, start, end} = timeInterval;

        return (
          <div className="ratingInfoPanel">
              <List>
                  <List.Item>
                      <List.Content>
                          <List.Header>Stichtag</List.Header>
                          <List.Description>{typeOfDay}, {day}</List.Description>
                      </List.Content>
                  </List.Item>
                  <List.Item>
                      <List.Content>
                          <List.Header>Tageszeit</List.Header>
                          <List.Description>{timeDescription}, {start} - {end}</List.Description>
                      </List.Content>
                  </List.Item>
              </List>
          </div>
        );
    };
}

export default RatingInfoPanel;