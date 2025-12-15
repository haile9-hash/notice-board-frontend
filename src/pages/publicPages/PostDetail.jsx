import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import LikeDislike from '../../components/posts/LikeDislike';
import CommentSection from '../../components/posts/CommentSection';
import { PostContext } from '../../context/PostContext';

const PostDetail = () => {
  const { id } = useParams();
  const { posts } = useContext(PostContext);
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {post.photo && <img src={post.photo} alt="Post" className="img-fluid" />}
      <LikeDislike postId={post.id} />
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostDetail;