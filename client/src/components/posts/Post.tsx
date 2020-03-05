import React from 'react';
import { Post } from '../../types/postTypes';

export default function Post({ post }: { post: Post }) {
  return <div className='post'>{post.text}</div>;
}
