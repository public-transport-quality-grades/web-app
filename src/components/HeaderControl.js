import React, {Component} from 'react';
import FAQModal from './FAQModal';
import AboutModal from './AboutModal';
import './HeaderControl.css';

export default class HeaderControl extends Component {
    render() {
        return (
            <header>
                <h2>ÖV-Güteklassen 2018</h2>
                <nav>
                    <FAQModal/>
                    <AboutModal/>
                </nav>
            </header>
        )
    }
}