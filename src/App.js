import React, { Component } from 'react';
import './App.css';
import TimelineList from './components/TimelineList.js';
import { Button, PageHeader} from 'react-bootstrap';
import CreateTimeline from './components/CreateTimeline.js';

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      timelines: [],
      showCreateTimelineDialog: false
    }
  }

  createTimeline = () => {
    this.setState({
      showCreateTimelineDialog: true
    });
  }

  saveAction = ({timelineName}) => {
    this.setState({
      timelines: [...this.state.timelines, ...[timelineName]],
      showCreateTimelineDialog: false
    });
  }

  deleteTimeline = name => {
      this.setState({
          timelines: this.state.timelines.filter(t => t !== name)
      })
  }
  
  render() {

    return (
      <div className="App">  
          <PageHeader>
            Timeline Creator
          </PageHeader>

            <Button bsStyle="primary" onClick={this.createTimeline} >Create Timeline</Button>
            <TimelineList timelines={this.state.timelines} deleteTimeline={this.deleteTimeline}/>
            <CreateTimeline
              show={this.state.showCreateTimelineDialog}
              onSubmit={this.saveAction}
            />
      </div>
    );
  }
}

export default App;
