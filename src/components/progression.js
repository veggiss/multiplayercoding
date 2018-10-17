import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap';
import {getClient, getRoom} from './websocket';

class Progress extends Component {
	constructor() {
		super();
		const client = getClient();
		const room = getRoom();
		room.listen('players/:id/progress', this.listenFunc);

		this.id = client.id;
		this.state = {
			you: 0,
			opponent: 0
		};
	}

	listenFunc = msg => {
		if (msg.path.id === this.id) this.setState({...this.state, you: msg.value});
		else this.setState({...this.state, opponent: msg.value});
	}

	render() {
	  return (
	    <div>
	    	You: <ProgressBar active now={this.state.you} />
	    	Opponent: <ProgressBar active now={this.state.opponent} />
	    </div>
	  );
	}
}

export default Progress;