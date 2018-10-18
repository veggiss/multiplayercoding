import React, { Component } from 'react';
import '../App.css';
import {initClient, joinRoom} from '../components/websocket';
import {Tabs, Tab, Col} from 'react-bootstrap';
import Progression from '../components/progression';
import Question from '../components/question';
import Output from '../components/output';
import Answer from '../components/answer';

class Game extends Component {
  constructor() {
    super();
    initClient();
    joinRoom();
  }

  render() {
    return (
      <div className="centerStuff">
        <Col>
          <div>
            <Progression/>
          </div>
        </Col>
        
        <Col xs={6}>
          <div>
            <Tabs defaultActiveKey="instructions" id="uncontrolled-tab-example">
              <Tab eventKey="instructions" title="Instructions">
                <Question/>
              </Tab>
                <Tab eventKey="output" title="Output">
                <Output/>
              </Tab>
            </Tabs>
          </div>
        </Col>
        
        <Col xs={6}>
          <div>
            <Answer/>
          </div>
        </Col>

      </div>
    );
  }
}

export default Game;