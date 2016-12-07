import React from 'react';
import $ from "jquery";


module.exports = React.createClass({
    handleCoordinateSubmit: function(coordinate) {
      	var coordinates = this.state.data;
        coordinate.id = Date.now();
        var newCoordinates = coordinates.concat([coordinate]);
        this.setState({data: newCoordinates});
        $.ajax({
      	  url: API_URL,
          dataType: 'json',
          type: 'POST',
          data: coordinate,
        })
        .done(function(result){
      		  this.setState({data: result});
        }.bind(this))
        .fail(function(xhr, status, errorThrown) {
        		this.setState({data: coordinates});
            console.error(API_URL, status, errorThrown.toString());
        }.bind(this));
  	},
    render: function() {
        return (
          <div className="Image">
              <h3>image component render test</h3>
              <img id='imageOnCanvas' src="http://lorempixel.com/700/450/"/>
              <canvas id="imageCanvas" width="700" height="450"></canvas>
              <p>^This canvas is being rendered by the image component, which is being rendered by container component. (The image is behind the canvas! Check the console for coordinate-click output.)</p>
              <img id='cursor' src="http://image.flaticon.com/icons/png/128/63/63560.png"/>
          </div>
        );
    }
});
