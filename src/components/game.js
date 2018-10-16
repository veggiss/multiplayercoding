import React, { Component } from 'react';
import {Client} from 'colyseus.js';

const MyContext = React.createContext();

class Game extends Component {
  constructor(){
    super();

    const endpoint = (window.location.hostname.indexOf("herokuapp") === -1)
      ? "ws://localhost:3030" // - Local
      : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}`;

    this.colyseus = new Client(endpoint);
    this.room = this.colyseus.join('game');
  }

  render() {
    return (
      <MyContext.Provider value={{
        room: this.room
      }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default Game;