import React, { Component } from 'react';
import './App.css';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from '../Main';

class App extends Component {
  render() {
    return (
      
        <div className="App">
       
          <header className="App-header">
            <h1 className="App-title">Sign-Up Form In React</h1>
          </header>
          <br />
          <br />

          <Main />

        </div>
      
    );
  }
}

export default App;
