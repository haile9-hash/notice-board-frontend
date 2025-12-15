import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  if (!user) return <p>Login to comment.</p>;

  const addComment = () => {
    setComments([...comments, { text: newComment, user: user.username }]);
    setNewComment('');
  };

  return (
    <div>
      <h6>Comments</h6>
      {comments.map((c, i) => <p key={i}><strong>{c.user}:</strong> {c.text}</p>)}
      <textarea className="form-control mb-2" value={newComment} onChange={e => setNewComment(e.target.value)} />
      <button className="btn btn-primary" onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default CommentSection;