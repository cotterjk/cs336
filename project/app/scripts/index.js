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

//import Container from './container';

import '../css/base.css';

$( "canvas" ).click(function( event ) {
  var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
  var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
  $( "span #first" ).text( "( event.pageX, event.pageY ) : " + pageCoords );
  $( "span #last" ).text( "( event.clientX, event.clientY ) : " + clientCoords );
});

/*
ReactDOM.render(
  <Container url="/api/coordinates" pollInterval={500} />,
  document.getElementById('content')
);
*/