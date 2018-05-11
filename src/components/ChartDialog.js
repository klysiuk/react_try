import React, {Component} from 'react';
import Dialog from './Dialog.js';
import { TimePicker } from 'antd';
import 'antd/lib/time-picker/style/index.css';
import { FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { CirclePicker } from 'react-color';

export default class ChartDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
      		actionName: props.actionName,
      		startTime: props.startTime,
      		endTime: props.endTime || props.startTime
    	}

	}

	componentWillReceiveProps(props) { // Will be used for editing activity later
	    this.setState({
	    	actionName: props.actionName,
	      	startTime: props.startTime,
	      	endTime: props.endTime || props.startTime
	    })
	}


	handleChangeTime = field => (time) => {
    	this.setState({ [field]: time });
  	}

  	handleColorChange = (color) => {
		this.setState({ color: color.hex });
	};

	submitResults = () => {
		let {startTime, endTime, color} = this.state;
		// for some reason FormControl can not be controlled
		this.props.onSubmit({startTime, endTime, color, actionName: this.inputName.value});
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
				            inputRef={ref => { this.inputName = ref; }}
				          />
			 
				        </FormGroup>
				         <FormGroup>
				         	<CirclePicker color={ this.state.color } onChangeComplete={this.handleColorChange}/>
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