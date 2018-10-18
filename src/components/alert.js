import React from "react";
import ReactDOM from "react-dom";
import { AlertList } from "react-bs-notifier";

class NotifierGenerator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			position: "bottom-right",
			alerts: [],
			timeout: 2,
			newMessage: props.message
		};
	}

	generate(type) {
		const newAlert ={
			id: (new Date()).getTime(),
			type: type,
			headline: `Whoa, ${type}!`,
			message: this.state.newMessage
		};

		this.setState({
			alerts: [...this.state.alerts, newAlert]
		});
	}

	onAlertDismissed(alert) {
		const alerts = this.state.alerts;

		// find the index of the alert that was dismissed
		const idx = alerts.indexOf(alert);

		if (idx >= 0) {
			this.setState({
				// remove the alert from the array
				alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
			});
		}
	}

	clearAlerts() {
		this.setState({
			alerts: []
		});
	}

	onTimeoutChange({ target: { value } }) {
		this.setState({ timeout: (+value) * 1000 });
	}

	onNewMessageChange({ target: { value } }) {
		this.setState({ newMessage: value });
	}

	onPositionChange({ target: { value } }) {
		this.setState({
			position: value
		});
	}

	render() {
		const clearAllButton = this.state.alerts.length ? (
			<button
				className="btn btn-link"
				onClick={this.clearAlerts.bind(this)}>Clear all alerts</button>
		) : null;

		function showAlert(type) {
			this.generate(type);
		}

		return (
			<AlertList
				position={this.state.position}
				alerts={this.state.alerts}
				timeout={this.state.timeout}
				dismissTitle="Begone!"
				onDismiss={this.onAlertDismissed.bind(this)}
			/>
		);
	}
}

ReactDOM.render(<NotifierGenerator />, document.getElementById('alertBox'));
export default NotifierGenerator;