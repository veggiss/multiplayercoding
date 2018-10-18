import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
//import NotifierGenerator from "./alert";
import {Button} from 'react-bootstrap';
import {getRoom} from './websocket';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
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
		if (msg.answer === true) NotificationManager.success('All unit tests passed! Get ready for the next one!', 'Success', 3000);
		if (msg.answer === false) NotificationManager.error('Solution did not pass unit tests! Please try again.', 'Failed', 3000);

		if (msg.startCode) {
			if (this.editor.current.editor !== null) {
				this.editor.current.editor.setValue(msg.startCode, 1);
			}
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
	    	<NotificationContainer />
	    	<div className="aceHeight">
				<AceEditor
					ref={this.editor}
					editorProps={{$blockScrolling: Infinity}}
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
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: false,
					showLineNumbers: true,
					blockScrolling: Infinity,
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