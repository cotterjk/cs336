/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Modfied by Javin Unger and Cotter Koopman for CS336, Fall 2016
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import $ from "jquery";
import { API_URL } from './global';

import Container from './container';

import '../css/base.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Container}/>
    </Router>
), document.getElementById('content')
);

/* Function that handles users' clicks on the canvas.
 * When the canvas is clicked, the coordinates of the click are calculated and posted to the database.
 */
$( "canvas" ).click(function( event ) {
  var canvasPos = $(this).offset();
  var offsetX = event.pageX - canvasPos.left;
  var offsetY = event.pageY - canvasPos.top;
  var pageCoords = "( " + offsetX + ", " + offsetY + " )";

  $.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: {
          x: offsetX,
          y: offsetY
      }
  })
  .done(function(result){
       console.log(pageCoords + ' posted to database');
    })
  .fail(function(xhr, status, errorThrown) {
       console.log('AJAX POST request failed...');
   })
});
