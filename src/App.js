import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Game from './components/game';
//import Home from './components/home';
import Header from './components/header';
import Profile from './components/profile';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <div className='content'>
            <Route exact path='/play' component={Game}/>
            <Route exact path='/profile' component={Profile}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
