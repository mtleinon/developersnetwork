import React from 'react';
import PostItem from './PostItem';
import { Post } from '../../types/postTypes';

export default function PostFeed({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post: Post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </>
  );
}
