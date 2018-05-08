import React, { Component } from 'react';
import Timeline from './Timeline.js'

export default class TimelineList extends Component {

	render() {
		return (
			this.props.timelines.map(t => {
				return <Timeline name={t}/>			
			})
		)
	}

}