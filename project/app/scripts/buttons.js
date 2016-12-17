/* React component for the button(s)
 * 12/19 - Renders a show/hide button that will toggle the visibility of the canvas, effectively hiding the coordinate points
 * drawn by the container component
 *
 * Written by Cotter Koopman and Javin Unger for CS336, Fall 2016
 */

import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
	getInitialState: function() {
		return {visibility: "hidden"}
	},
	handleShowHide: function(e) {
		e.preventDefault();
		if (this.state.visibility === "hidden") {
			this.setState({visibility: "visible"});
		} else {
			this.setState({visibility: "hidden"});	
		}
		$("canvas").css({"visibility": this.state.visibility});
	},
	render: function() {
		return (
			<form className="buttons" onClick={this.handleShowHide}>
				<input id="shButton" className={this.state.visibility} type="button" value="Show/Hide" />
			</form>
		);
	}
});
