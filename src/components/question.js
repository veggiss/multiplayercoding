import React, { Component } from 'react';
import {getRoom} from './websocket';
import {Jumbotron} from 'react-bootstrap';
import Spinner from './spinner';

class Question extends Component {
	constructor() {
		super();

		let room = getRoom();
		this.question = React.createRef();

		room.onMessage.add(this.handleResponse);
	}

	handleResponse = msg => {
		if (msg.question) {
			if (this.question.current !== null)	this.question.current.innerHTML = msg.question;
		}
	}

	render() {
		return (
			<div className="question" ref={this.question}>Looking for opponent<Spinner></Spinner></div>
		);
	}
}

export default Question;