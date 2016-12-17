/* React component for the image
 * 12/19 - Renders <div> element that contains the actual image and then a <canvas>, which is placed on top of the image.
 *
 * Written by Cotter Koopman and Javin Unger for CS336, Fall 2016
 */

import React from 'react';
import $ from "jquery";

module.exports = React.createClass({
    render: function() {
        return (
          <div className="Image">
              <img id='imageOnCanvas' src="https://raw.githubusercontent.com/javinunger/cs336/master/project/materials/globe.png"/>
              <canvas id="imageCanvas" width="700" height="450"></canvas>
          </div>
        );
    }
});
