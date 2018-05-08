import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap'

class Dialog extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const container =  document.body;

		return (
			<div className="modal-container" style={{ height: 300 }}>

		        <Modal
		          show={this.props.show}
		          onHide={this.handleHide}
		          container={container}
		          aria-labelledby="contained-modal-title"
		        >
		          <Modal.Header closeButton>
		            <Modal.Title id="contained-modal-title">
		              {this.props.title}
		            </Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	{this.props.children}
		          </Modal.Body>
		          <Modal.Footer>
		         	 <Button onClick={this.props.submit}>Submit</Button>
		            <Button onClick={this.props.close}>Close</Button>
		          </Modal.Footer>
		        </Modal>
	      	</div>
      	);

	}
}

export default Dialog;