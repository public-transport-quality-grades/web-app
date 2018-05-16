import React, {Component} from 'react';
import './ColorLegend.css';

type Props = {
  colors: {}
};

class ColorLegend extends Component<Props> {

    createLegend = () => {
        let legendEntries = [];
        Object.keys(this.props.colors).forEach((grade, index) => {
           const color = this.props.colors[grade];
            legendEntries.push(
                       <div className="colorPane" title={color} key={index + color} style={{
                           backgroundColor: color
                       }} />);
             legendEntries.push(
                 <div className="legendDescription" key={index + grade}>
                     Güteklasse {grade}
                 </div>
           );
        });
        return legendEntries;
    };

    render(){
        return (
            <div>
                <div className="colorLegend">
                  {this.createLegend()}
                </div>
            </div>
        );
    };
}

export default ColorLegend;