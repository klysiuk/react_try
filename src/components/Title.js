import React, {Component} from 'react';

class Title extends Component {
	constructor(props) {
		super(props);
		this.colorIndex = 0;
		this.colors = this.props.colors;
		this.state = {
			color: this.colors[this.colorIndex]
		}

	}

	changeBgColor = () => {
		this.colorIndex = (this.colors.length - 1) > this.colorIndex++ ? this.colorIndex++ : 0;
		this.setState({
			color: this.colors[this.colorIndex]
		});
	}

	render() {
		var divStyle = {
  			backgroundColor: this.state.color
		};

		return (
			<div style={divStyle}>
				<h1>{this.props.name}</h1>
				<button onClick={this.changeBgColor}>Change color</button>
			</div>
		)
	}
}

export default Title;