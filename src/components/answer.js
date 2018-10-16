import React, { Component } from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

class Answer extends Component {
	render() {
	  return (
	  	<div>
	    	<h4>Answer</h4>
	    	<form>
	    		<FormGroup bsSize="large">
					<FormControl type="text" placeholder="Type answer here"/>
	    		</FormGroup>
	    	</form>
	    	<Button bsStyle="primary" bsSize="small" block>
	    	  Check answer
	    	</Button>
	    </div>
	  );
	}
}

export default Answer;