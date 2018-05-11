import React, { Component } from 'react';
import Timeline from './Timeline.js'

export default class TimelineList extends Component {

	deleteTimeline = name => {
		this.props.deleteTimeline(name);
	}

	render() {
		return (
			this.props.timelines.map((t, i) => {
				return <Timeline name={t} key={i} deleteTimeline={this.deleteTimeline}/>			
			})
		)
	}

}