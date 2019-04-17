import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { Link } from 'react-router-dom';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const isLoading = this.props.isLoading;
    const post = this.props.post.post;

    let postContent;

    if (post === null || isLoading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = {
  getPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
