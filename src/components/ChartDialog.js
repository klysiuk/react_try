import React, {Component} from 'react';
import Dialog from './Dialog.js';
import { TimePicker } from 'antd';
import 'antd/lib/time-picker/style/index.css';
import { FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

export default class ChartDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
      		actionName: props.actionName,
      		startTime: props.startTime,
      		endTime: props.endTime || props.startTime
    	}
	}

	componentWillReceiveProps(props){
	    this.setState({
	    	actionName: props.actionName,
	      	startTime: props.startTime,
	      	endTime: props.endTime || props.startTime
	    })
	}

	handleChangeName = (event) => {
		this.setState({
			actionName: event.target.value
		});
	}

	handleChangeTime = field => (time) => {
    	this.setState({ [field]: time });
  	}

	submitResults = () => {
		let {startTime, endTime, actionName} = this.state;
		this.props.onSubmit({startTime, endTime, actionName});
	}

	render() {
		let {startTime, endTime, actionName} = this.state;

		return (

			<Dialog {...this.props} title={'Please select duration'} submit={this.submitResults}>
				<div>
					<form>
				        <FormGroup
				          controlId="form"
				          // validationState={this.getValidationState()}
				        >
				          <ControlLabel>Action name</ControlLabel>

				          <FormControl
				            type="text"
				            value={actionName}
				            placeholder="Enter text"
				            onChange={this.handleChangeName}
				          />
			 
				        </FormGroup>
				        <FormGroup>

					        <TimePicker 
							 	minuteStep={15}
							 	secondStep={60}
							 	value={startTime}
							 	format={"HH:mm"}
							 	onChange={this.handleChangeTime('startTime')}
							 />

							 <TimePicker 
							 	minuteStep={15}
							 	secondStep={60}
							 	value={endTime}
							 	format={"HH:mm"}
							 	onChange={this.handleChangeTime('endTime')}
							 />

				        </FormGroup>
				    </form>
				</div>
			</Dialog>
		);
	}
}