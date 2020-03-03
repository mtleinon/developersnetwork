import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import { Auth } from '../../types/authTypes';
import { Like, Post } from '../../types/postTypes';
interface PostItemProps {
  post: Post;
  showActions: boolean;
}

export default function PostItem({ post, showActions = true }: PostItemProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: Auth) => state.auth);

  // static defaultProps = {
  //   showActions: true
  // };
  // static propTypes = {
  //   post: PropTypes.object.isRequired,
  //   auth: PropTypes.object.isRequired,
  //   deletePost: PropTypes.func.isRequired,
  //   addLike: PropTypes.func.isRequired,
  //   removeLike: PropTypes.func.isRequired
  // };

  const onDeleteClick = (postId: string) => () => {
    dispatch(deletePost(postId));
  };

  const onLikeClick = (postId: string) => () => {
    dispatch(addLike(postId));
  };
  const onUnlikeClick = (postId: string) => () => {
    dispatch(removeLike(postId));
  };

  // Function returns true if user liked the post
  const findUserLike = (likes: Like[]) => {
    if (
      likes.findIndex((like: Like) => {
        return like.user === auth.user.id; //todo: check _id
      }) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={post.avatar}
              alt=''
            />
          </a>
          <br />
          <p className='text-center'>{post.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{post.text}</p>
          {showActions ? (
            <div>
              <button
                onClick={onLikeClick(post._id)}
                type='button'
                className='btn btn-light mr-1'
              >
                <i
                  className={classnames('fas fa-thumbs-up', {
                    'text-info': findUserLike(post.likes)
                  })}
                />
                <span className='badge badge-light'>{post.likes.length}</span>
              </button>
              <button
                onClick={onUnlikeClick(post._id)}
                type='button'
                className='btn btn-light mr-1'
              >
                <i className='text-secondary fas fa-thumbs-down' />
              </button>
              <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                Comments
              </Link>
              {post.user === auth.user.id ? ( //todo: check _id
                <button
                  onClick={onDeleteClick(post._id)}
                  type='button'
                  className='btn btn-danger mr-1'
                >
                  <i className='fas fa-times' />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// const mapDispatchToProps = {
//   deletePost,
//   addLike,
//   removeLike
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PostItem);
