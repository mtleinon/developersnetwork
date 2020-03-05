import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import { PostRootState } from '../../types/postTypes';
import PostFeed from './PostFeed';

export default function Posts() {
  const dispatch = useDispatch();

  const { posts, loading } = useSelector((state: PostRootState) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className='feed'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <PostForm />
            {posts === null || loading ? (
              <Spinner />
            ) : (
              <PostFeed posts={posts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = state => ({
//   post: state.post
// });

// const mapDispatchToProps = {
//   getPosts
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Posts);
