import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
	getInitialState: function() [
		return {x: 0, y: 0};
	},
	handleXChange: function(e) {
		this.setState({x: e.target.value});
	},
	handleYChange: function(e) {
		this.setState({y: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var x = this.state.x.trim();
		var y = this.state.y.trim();
		if (!x || !y) { return; }
		this.props.onCoordinateSubmit({x: x, y: y});
		this.setState({x: 0, y: 0});
	},
	render: function() {
		//if first time thru
		return (
			<form className="buttons" onSubmit={this.handleSubmit}>
				<input className="ui-button ui-widget ui-corner-all" type="submit" value="Restart" />
			</form>
		);
		//if done w/ first time (to see all results)
		return (
			<form className="buttons" onSubmit={this.handleSubmit}>
				<input className="ui-button ui-widget ui-corner-all" type="submit" value="Results" />
			</form>
		);
	}
});