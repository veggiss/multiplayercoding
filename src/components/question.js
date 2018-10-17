import React, { Component } from 'react';
import {getRoom} from './websocket';

class Question extends Component {
	constructor() {
		super();

		let room = getRoom();

		room.onMessage.add(this.handleResponse);

		this.state = {
			question: 'Waiting for opponent..'
		}
	}

	handleResponse = msg => {
		if (msg.question) {
			this.setState({...this.state, question: msg.question});
		}
	}

	render() {
		return (
			<div>
				<h4>Question</h4>
				<div><p>{this.state.question}</p></div>
			</div>
		);
	}
}

export default Question;