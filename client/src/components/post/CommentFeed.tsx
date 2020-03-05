import React from 'react';
// import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { Comment } from '../../types/postTypes';

interface CommentFeedProps {
  comments: Comment[];
  postId: string;
}

export default function CommentFeed({ comments, postId }: CommentFeedProps) {
  // static propTypes = {
  //   comments: PropTypes.array.isRequired,
  //   postId: PropTypes.string.isRequired
  // };

  // const { comments, postId } = this.props;

  return (
    <>
      {comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ))}
    </>
  );
}
