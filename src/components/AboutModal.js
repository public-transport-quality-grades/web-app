import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import './AboutModal.css';

export default class AboutModal extends Component {
  render() {
    return (
      <Modal dimmer={false} trigger={<Button id="about_us">Über</Button>} closeIcon>
      <Modal.Header>Über</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>ÖV-Güteklassen 2018</Header>
          <section>
            ÖV-Güteklassen 2018 wurde im Rahmen einer Bachelorarbeit an der <a href="https://www.hsr.ch">Hochschule für Technik Rapperswil (HSR)</a> entwickelt.
            In der Verkehrs- und Raumplanung werden ÖV-Güteklassen für die Beurteilung eines Standortes bezüglich der Erschliessung mit dem öffentlichen Verkehr verwendet. Durch diese können Entscheidungen betreffend der Entwicklung eines Standortes getroffen werden. Die aktuelle Strategie sieht vor, an bereits gut erschlossenen Standorten zu verdichten statt neues Bauland zu erschliessen, um nachträglich die ÖV-Infrastruktur hochziehen zu müssen.
            Der Nutzen der ÖV-Güteklassen beschränkt sich nicht auf Verkehrs- und Raumplaner. Privatpersonen können ebenso bei der Wohnungs- wie auch der Jobsuche davon Gebrauch machen.
          </section>
          <Header>Autoren</Header>
          <section>
            <p>Robin Suter <a href="https://github.com/excape"><img src="github.png" class="text-icon" alt="github-icon"/></a></p>
            <p>Jonas Matter <a href="https://github.com/jmatj"><img src="github.png" class="text-icon" alt="github-icon"/></a></p>
          </section>
          <Header>Links</Header>
          <section>
            <p><a href="https://github.com/public-transport-quality-grades">Github Repositories <img src="github.png" class="text-icon" alt="github-icon"/></a></p>
          </section>
          <Header>Credits</Header>
          <section>
            <p>Digitales  Terrainmodell (DTM) &copy; <a href="https://www.swisstopo.admin.ch/">Bundesamt für Landestopografie</a></p>
            <p>ÖV-Güteklassen ARE &copy; <a href="https://www.are.admin.ch/are/de/home/verkehr-und-infrastruktur/grundlagen-und-daten/verkehrserschliessung-in-der-schweiz.html">Bundesamt für Raumentwicklung</a></p>
            <p>Fahrplandaten &copy; <a href="http://www.fahrplanfelder.ch">Offizielles Kursbuch</a></p>
            <p>&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a></p>
            <p>Basiskarte &copy; <a href="https://carto.com">Carto</a></p>
          </section>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
  }
}