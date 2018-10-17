import React, { Component } from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import {getRoom} from './websocket';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Answer extends Component {
	constructor() {
		super();

		this.room = getRoom();
		this.editor = React.createRef();
		this.answerField = '';

		this.room.onMessage.add(this.handleResponse);
	}

	handleResponse = msg => {
		if (msg.answer === true) console.log("You answered correct");
		if (msg.answer === false) console.log("You answered wrong");

		if (msg.startCode) {
			this.editor.current.editor.setValue(msg.startCode, 1);
		}
	}

	checkAnswer = () => {
		this.room.send({checkAnswer: this.answerField});
	}

	onChange = e => {
		this.answerField = e;
	}
	
	render() {
	  return (
	  	<div>
	    	<h4>Answer</h4>
	    	<div className="aceHeight">
				<AceEditor
					ref={this.editor}
					mode="javascript"
					theme="monokai"
					name="blah2"
					width="100%"
					onLoad={this.onLoad}
					onChange={this.onChange}
					fontSize={14}
					showPrintMargin={true}
					showGutter={true}
					highlightActiveLine={true}
					setOptions={{
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: true,
					enableSnippets: false,
					showLineNumbers: true,
					tabSize: 2,
				}}/>
		    	<Button onClick={this.checkAnswer} bsStyle="primary" bsSize="small" block>
		    	  Check answer
		    	</Button>
			</div>
	    </div>
	  );
	}
}

export default Answer;