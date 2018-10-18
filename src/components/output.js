import React, { Component } from 'react';
import {getRoom} from './websocket';

class Output extends Component {
	constructor() {
		super();

		let room = getRoom();
		this.output = React.createRef();
		room.onMessage.add(this.handleResponse);
	}

	handleResponse = msg => {
		if (msg.output) {
			if (this.output.current !== null) {
				console.log("lol");
				this.output.current.innerHTML = '';
				let greenMark = '<span style="color: green;">&#10003;</span>'
				let redMark = '<span style="color: red;">&#10007;</span>'
				let passes = msg.passes;
				let failures = msg.failures;
				passes.forEach(m => {
					this.output.current.innerHTML += `${greenMark} ${m.title} (${m.duration}ms)<br/>`;
				});

				failures.forEach(m => {
					this.output.current.innerHTML += `${redMark} ${m.title} (${m.duration}ms)<br/>`;
				});
			}
		}

		if (msg.question) {
			if (this.output.current !== null) {
				this.output.current.innerHTML = '';
			}
		}
	}

	render() {
		return (
			<div>
				<div ref={this.output} className="question"></div>
			</div>
		);
	}
}

export default Output;