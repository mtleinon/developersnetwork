import React from 'react';
// import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

export default function CommentFeed({ comments, postId }) {

  // static propTypes = {
  //   comments: PropTypes.array.isRequired,
  //   postId: PropTypes.string.isRequired
  // };

  // const { comments, postId } = this.props;

  return comments.map(comment => (
    <CommentItem key={comment._id} comment={comment} postId={postId} />
  ));
}
