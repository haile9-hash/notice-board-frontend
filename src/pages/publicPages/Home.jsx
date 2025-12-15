import React, { useContext } from 'react';
import PostList from '../../components/posts/PostList';
import { PostContext } from '../../context/PostContext';

const Home = () => {
  const { posts } = useContext(PostContext);
  return (
    <div className="container">
      <h1>Welcome to Notice Board</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;