import React, { useContext } from 'react';
import { PostContext } from '../../context/PostContext';

const ApprovePosts = () => {
  const { posts, approvePost } = useContext(PostContext);
  const pending = posts.filter(p => !p.approved);

  return (
    <div className="container">
      <h1>Approve Posts</h1>
      {pending.map(post => (
        <div key={post.id} className="card mb-3">
          <h5>{post.title}</h5>
          <p>{post.description}</p>
          <button className="btn btn-success" onClick={() => approvePost(post.id)}>Approve</button>
          <button className="btn btn-danger ms-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ApprovePosts;