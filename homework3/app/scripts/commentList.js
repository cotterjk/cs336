import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Comment from './comment';

module.exports = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment id={comment.firstName} key={comment._id}>
                    {comment.id}
                    {comment.firstName}
                    {comment.lastName}
                    {comment.startDate}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
