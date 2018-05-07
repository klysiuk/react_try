import React, { Component } from 'react';
import './App.css';
import Title from './components/Title.js'
import colors from './configs/colors.js';
import Timeline from './timeline/timeline.js';

class App extends Component {
   constructor(props) {
    super(props);
    this.timelineArea = React.createRef();
  }

  createTimeline = (ev) => {
    ev.preventDefault();

    let timeline = new Timeline();

    timeline.render({
      parentDomElem: this.timelineArea.current,
      startingPoint: 5,
      height: '300'
    });
    
  }

  render() {

    return (
      <div className="App" ref={this.timelineArea}>  
            <a href="#" onClick={this.createTimeline}>Create Timeline</a>   
      </div>

    );
  }
}

export default App;
