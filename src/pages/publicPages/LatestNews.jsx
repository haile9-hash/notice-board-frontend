import React, { useContext } from 'react';
import PostList from '../../components/posts/PostList';
import { PostContext } from '../../context/PostContext';

const LatestNews = () => {
  const { posts } = useContext(PostContext);
  const latest = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  return (
    <div className="container">
      <h1>Latest News</h1>
      <PostList posts={latest} />
    </div>
  );
};

export default LatestNews;