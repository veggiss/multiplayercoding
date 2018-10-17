import React, { Component } from 'react';
import '../App.css';
import {initClient, joinRoom} from '../components/websocket';
import Progression from '../components/progression';
import Question from '../components/question';
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
        <div className="grid-container">
          <div className="question">
            <Question/>
          </div>
          <div className="answer">
            <Answer/>
          </div>
          <div className="progression">
            <Progression/>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;