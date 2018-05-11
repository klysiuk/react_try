import React, {Component} from 'react';
import Dialog from './Dialog.js';
import { FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class CreateTimeline extends Component {
	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);

		this.state = {
			timelineName: ''
		}
	}

	handleNameChange(e)  {
		this.setState({
			timelineName: e.target.value
		})
	}

	submitResults = () => {
		this.props.onSubmit({timelineName: this.state.timelineName});

		this.setState({
			timelineName: ''
		});
	}

	render() {
		return (
			<Dialog {...this.props} title={'Create new timeline'} submit={this.submitResults}>
				<form>
			        <FormGroup>
			          <ControlLabel>Name</ControlLabel>

			          <FormControl
			            type="text"
			            value={this.state.timelineName}
			            placeholder="Optionally enter a name of new timeline"
			            onChange={this.handleNameChange}
			          />
		 
			        </FormGroup>
			    </form>
			</Dialog>
		);
	}

}