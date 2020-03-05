import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { Link } from 'react-router-dom';
import { PostRootState } from '../../types/postTypes';

export default function Post() {
  const post = useSelector((state: PostRootState) => state.post);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [dispatch, id]);

  let postContent;

  if (
    post.post === null ||
    post.loading
    // post.post.length === 0
  ) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post.post} showActions={false} />
        <CommentForm postId={post.post._id} />
        {post.post.comments && ( //Todo: check when comments is undefined
          <CommentFeed postId={post.post._id} comments={post.post.comments} />
        )}
      </div>
    );
  }

  return (
    <div className='post'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Link to='/feed' className='btn btn-light mb-3'>
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}
