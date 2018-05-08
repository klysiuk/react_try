import React, { Component } from 'react';
import './App.css';
import Title from './components/Title.js'
import colors from './configs/colors.js';
import TimelineList from './components/TimelineList.js'

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      timelines: [],
      timelineNameCount: 0
    }
  }

  createTimeline = (ev) => {
    ev.preventDefault();

    // TODO add name in modal
    let timeline = this.state.timelineNameCount+1;

    this.setState({
      timelines: [...this.state.timelines, ...[timeline]],
      timelineNameCount: this.state.timelineNameCount+1
    });
  }

  render() {

    return (
      <div className="App">  
            <a href="#" onClick={this.createTimeline}>Create Timeline</a>
            <TimelineList timelines={this.state.timelines}/>
      </div>
    );
  }
}

export default App;
