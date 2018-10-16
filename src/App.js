import React, { Component } from 'react';
import './App.css';
import Game from './components/game';
import Progression from './components/progression';
import Question from './components/question';
import Answer from './components/answer';

class App extends Component {
  constructor() {
    super();

    new Game();
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

export default App;
