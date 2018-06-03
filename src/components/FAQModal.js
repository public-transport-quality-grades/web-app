import React, {Component} from 'react';
import {Button, Modal, Accordion, Icon} from 'semantic-ui-react';
import * as config from '../config.js';
import ColorLegend from './ColorLegend';
import './Modal.css';

export default class FAQModal extends Component {
    state = {
        activeIndex: 0 
    };

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    };

    render() {
        const { activeIndex } = this.state;

        return (
            <Modal dimmer={false} trigger={<Button id="faq">FAQ</Button>} closeIcon>
                <Modal.Header>FAQ</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Accordion>
                            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Was bedeuten die verschiedenen ÖV-Güteklassen?
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <p>
                                    ÖV-Güteklassen geben Auskunft darüber, wie gut ein Standort mit dem ÖV erschlossen ist. Die Quantifizeriung folgt folgendem Muster:
                                </p>
                                <ColorLegend colors={config.colorsOeVGK18} meaning={config.meaningOeVGK18}/>
                            </Accordion.Content>
                            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Wo finde ich weitere Informationen über das Projekt?
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <p>
                                    Das gesamte Projekt ist frei verfügbar auf <a href="https://github.com/public-transport-quality-grades">Github.</a> Die Arbeit ist im Rahmen einer Bachelorarbeit entstanden. Diese ist kann <a href="https://github.com/public-transport-quality-grades/thesis/releases/download/v1.0/index.pdf">unter</a> eingesehen werden.
                                </p>
                            </Accordion.Content>
                        </Accordion>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    };
}