import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    const post = this.props.post;
    return <div className="post">{post.text}</div>;
  }
}
