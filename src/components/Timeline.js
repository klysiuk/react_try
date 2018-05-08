import React, { Component } from 'react';
import TimelineChart from '../timeline/timeline.js';
import ChartDialog from './ChartDialog.js';

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
			parentDomElem: this.timelineArea.current,
			startingPoint: 5, // starting hour
			height: '300' // height in pixels
		});
	}

	saveAction = ({actionName, startTime, endTime}) => {
		this.timeline.addSection({actionName, startTime, endTime});
		console.log('Save');
	}

	render() {
		return (
			<div>
				<div ref={this.timelineArea}>
				</div>


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