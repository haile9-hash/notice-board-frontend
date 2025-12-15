import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostCard = ({ post, showActions = true }) => {
  const { user } = useContext(AuthContext);
  const { likePost, dislikePost } = useContext(PostContext);

  const getCategoryBadge = () => {
    if (post.category) {
      return <span className="badge bg-primary me-2">{post.category}</span>;
    }
    return null;
  };

  const getFacultyBadge = () => {
    if (post.faculty) {
      return <span className="badge bg-secondary">{post.faculty}</span>;
    }
    return null;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title">{post.title}</h5>
            <div className="mb-2">
              {getCategoryBadge()}
              {getFacultyBadge()}
            </div>
          </div>
          <small className="text-muted">{formatDate(post.date)}</small>
        </div>
        
        <p className="card-text">{post.description.substring(0, 150)}...</p>
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span className="text-muted me-3">
              <i className="bi bi-person-fill"></i> {post.author}
            </span>
            {showActions && user && (
              <>
                <button 
                  className="btn btn-outline-success btn-sm me-2"
                  onClick={() => likePost(post.id)}
                >
                  <i className="bi bi-hand-thumbs-up"></i> {post.likes}
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm me-2"
                  onClick={() => dislikePost(post.id)}
                >
                  <i className="bi bi-hand-thumbs-down"></i> {post.dislikes}
                </button>
              </>
            )}
          </div>
          
          <div>
            <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        {!post.approved && (
          <div className="mt-2">
            <span className="badge bg-warning text-dark">
              <i className="bi bi-clock"></i> Pending Approval
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;