import React from 'react';
import $ from 'jquery';

import identityImage from './image';

module.exports = React.createClass({
	render: function() {
		var instruction = "kek";
		return (
			<div className="identityInstruction">
				{instruction}
			</div>
		);
	}
});