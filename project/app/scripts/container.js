/* React component for the container
 * 12/19 - Top-level component that contains buttons, image, and instruction. This component GETS the coordinates from
 * the server and, upon successfully doing so, draws each coordinate on the canvas.
 * When the component is mounted, the server is polled at set intervals, as to constantly update the canvas
 *
 * Written by Cotter Koopman and Javin Unger for CS336, Fall 2016
 */

import React from 'react';
import $ from 'jquery';

import Instruction from './instruction';
import Buttons from './buttons';
import Image from './image';
import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	loadCoordinatesFromServer: function() {
  		$.ajax({
    		url: API_URL,
		dataType: 'json',
		cache: false,
	})
	.done(function(result){
    		this.setState({data: result});
		var canvas = document.getElementById('imageCanvas');
		var context = canvas.getContext('2d');
		for (var i = 0; i <result.length; i++) {
			$.each (result, function(key, value) {
				context.beginPath();
				context.arc(value.x,value.y,3, 0, 2*Math.PI);
				context.fillStyle="#f08080";
				context.fill();
				context.stroke();
			});
		}
    	}.bind(this))
    	.fail(function(xhr, status, errorThrown) {
    		console.error(this.props.url, status, errorThrown.toString());
    	}.bind(this));
	},
	componentDidMount: function() {
		this.loadCoordinatesFromServer();
		setInterval(this.loadCoordinatesFromServer, POLL_INTERVAL);
	},
  	render: function() {
  		return (
    		<div className="Container">
			<Instruction/>
      			<Image data={this.state.data}/>
			<Buttons/>
     		 </div>
    		);
	}
});
