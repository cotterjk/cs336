import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
	loadCoordinatesFromServer: function(e) {
		e.preventDefault();
		$.ajax({
			url: API_URL,
			dataType: 'json',
			cache: false,
		})
     .done(function(result){
     		this.setState({data: result});
     }.bind(this))
     .fail(function(xhr, status, errorThrown) {
     		console.error(this.props.url, status, errorThrown.toString());
     }.bind(this));
	},
	render: function() {
		//if first time thru
		return (
			<form className="buttons">
				<input className="ui-button ui-widget ui-corner-all" type="submit" value="Show dots??" />
			</form>
		);
		//if done w/ first time (to see all results)
		/*
		return (
			<form className="buttons" onSubmit={this.handleSubmit}>
				<input className="ui-button ui-widget ui-corner-all" type="submit" value="Results" />
			</form>
		);*/
	}
});
