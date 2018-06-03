import React, {Component} from 'react';
import type {Rating} from './OeVGKControl.js';
import Moment from 'react-moment';
import {List} from 'semantic-ui-react';

type Props = {
  rating: Rating
};

class RatingInfoPanel extends Component<Props> {

    formatDate = (date: Date): string => {
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    };

    render(){
        const {due_date, time_interval} = this.props.rating;
        const {start, end} = time_interval;

        return (
          <div className="ratingInfoPanel">
              <List>
                  <List.Item>
                      <List.Content>
                          <List.Header>Stichtag</List.Header>
                          <List.Description>{this.formatDate(due_date)}, <Moment format="HH:mm" parse="HH:mm:ss">{start}</Moment> - <Moment format="HH:mm" parse="HH:mm:ss">{end}</Moment> Uhr</List.Description>
                      </List.Content>
                  </List.Item>
              </List>
          </div>
        );
    };
}

export default RatingInfoPanel;