import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../actions/postActions';
import { Auth } from '../../types/authTypes';
import { Comment } from '../../types/postTypes';

interface CommentItemProps {
  comment: Comment;
  postId: string;
}
export default function CommentItem({ comment, postId }: CommentItemProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: Auth) => state.auth);

  const onDeleteClick = (postId: string, commentId: string) => (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(deleteComment(postId, commentId));
  };

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={comment.avatar}
              alt=''
            />
          </a>
          <br />
          <p className='text-center'>{comment.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{comment.text}</p>

          {comment.user === auth.user.id ? (
            <button
              onClick={onDeleteClick(postId, comment._id)}
              type='button'
              className='btn btn-danger mr-1'
            >
              <i className='fas fa-times' />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
