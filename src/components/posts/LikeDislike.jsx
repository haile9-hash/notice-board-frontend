import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const LikeDislike = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  if (!user) return null;

  return (
    <div>
      <button className="btn btn-success me-2" onClick={() => setLikes(likes + 1)}>Like ({likes})</button>
      <button className="btn btn-danger" onClick={() => setDislikes(dislikes + 1)}>Dislike ({dislikes})</button>
    </div>
  );
};

export default LikeDislike;