import React, { Component } from 'react';
import './App.css';
import Title from './components/Title.js'
import colors from './configs/colors.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title name="Hello" colors={Object.values(colors)}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
