import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Game from './components/game';
import Home from './components/home';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <div className='content'>
            <Route exact path='/play' component={Game}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
