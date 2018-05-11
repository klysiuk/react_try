import React, { Component } from 'react';
import TimelineChart from '../timeline/timeline.js';
import ChartDialog from './ChartDialog.js';
import { Button, ButtonToolbar } from 'react-bootstrap';

class Timeline extends Component {
	constructor(props) {
		super(props);
		this.timelineArea = React.createRef();
		this.state = {
			showDialog: false,
			startTime: null,
			endTime: null,
			actionName: ''
		}
	}

	componentDidMount() {
		this.init();
		this.timelineArea.current.addEventListener("userClickOnChart", (ev) => {
			ev.preventDefault();

			this.showDialog({
				startTime: ev.detail.time,
				endTime: ev.detail.endTime
			});
		})

	}

	showDialog({actionName, startTime, endTime}) {
		this.setState({
			showDialog: true,
			startTime,
			endTime,
			actionName
		});
	}

	init() {
		this.timeline = new TimelineChart();

		this.timeline.render({
			parent: this.timelineArea.current,
			startingHour: 5, // starting hour
			height: 250, // height in pixels
			title: this.props.name
		});

	}

	saveAction = ({actionName, startTime, endTime, color}) => {
		this.timeline.addSection({actionName, startTime, endTime, color});
		this.setState({
			showDialog: false
		});
		console.log('Save');
	}

	deleteTimeline = () => {
		this.timeline.unrender();
		this.timeline = null;
		this.props.deleteTimeline(this.props.name)
	}

	saveFile = format => () => {
		this.timeline.export(this.props.name, format);
	}

	render() {
		return (
			<div className="timeline">
				<ButtonToolbar className="pull-right">
				<Button onClick={this.saveFile('png')}>Save as PNG</Button>
				<Button onClick={this.saveFile('jpg')} bsStyle="primary">Save as JPEG</Button>
				<Button onClick={this.saveFile('pdf')} bsStyle="success">Save as PDF</Button>
				<Button bsStyle="info">Save as SVG</Button>
				<Button bsStyle="danger" onClick={this.deleteTimeline}>Delete</Button>
				</ButtonToolbar>

				<div ref={this.timelineArea}></div>

				<ChartDialog
					show={this.state.showDialog}
					name={this.state.actionName}
					startTime={this.state.startTime}
					endTime={this.state.endTime}
					onSubmit={this.saveAction}
				/>
			</div>
		)
	}
}

export default Timeline;