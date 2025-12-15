import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostCard = ({ post, showActions = true }) => {
  const { user, getUserInteraction } = useContext(AuthContext);
  const { likePost, dislikePost } = useContext(PostContext);

  const userInteraction = getUserInteraction(post.id);
  const hasLiked = userInteraction === 'liked';
  const hasDisliked = userInteraction === 'disliked';

  // Only show pending badge to admins, not to regular users
  const showPendingBadge = !post.approved && (user?.role === 'superadmin' || user?.role === 'subadmin');

  const getCategoryBadge = () => {
    if (post.category) {
      return <span className="badge bg-primary me-2">{post.category}</span>;
    }
    return null;
  };

  const getFacultyBadge = () => {
    if (post.faculty) {
      return <span className="badge bg-secondary me-2">{post.faculty}</span>;
    }
    return null;
  };

  const getImportantBadge = () => {
    if (post.isImportant && post.approved) {
      return <span className="badge bg-warning text-dark me-2">
        <i className="bi bi-star-fill me-1"></i>Important
      </span>;
    }
    return null;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // If post is not approved and user is not admin, don't show it
  if (!post.approved && !user?.role) {
    return null;
  }

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title">{post.title}</h5>
            <div className="mb-2">
              {getImportantBadge()}
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
            {showActions && user && post.approved && (
              <div className="d-inline-block">
                {/* Like Button */}
                <button 
                  className={`btn btn-sm me-2 ${hasLiked ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => likePost(post.id)}
                  title={hasLiked ? 'Remove like' : 'Like this post'}
                >
                  <i className="bi bi-hand-thumbs-up"></i> 
                  <span className="ms-1">{post.likes}</span>
                </button>
                
                {/* Dislike Button */}
                <button 
                  className={`btn btn-sm ${hasDisliked ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => dislikePost(post.id)}
                  title={hasDisliked ? 'Remove dislike' : 'Dislike this post'}
                >
                  <i className="bi bi-hand-thumbs-down"></i> 
                  <span className="ms-1">{post.dislikes}</span>
                </button>
                
                {/* Comments Count */}
                {post.comments && post.comments.length > 0 && (
                  <span className="ms-3 text-muted">
                    <i className="bi bi-chat me-1"></i>
                    {post.comments.length}
                  </span>
                )}
              </div>
            )}
            
            {/* Show login prompt for guests */}
            {showActions && !user && post.approved && (
              <small className="text-muted">
                <Link to="/login" className="text-decoration-none">
                  Login to like or comment
                </Link>
              </small>
            )}
          </div>
          
          <div>
            <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        
        {/* Only show pending badge to admins */}
        {showPendingBadge && (
          <div className="mt-2">
            <span className="badge bg-warning text-dark">
              <i className="bi bi-clock"></i> Pending Approval
            </span>
          </div>
        )}
        
        {/* Show user's interaction status */}
        {user && post.approved && (hasLiked || hasDisliked) && (
          <div className="mt-2">
            <small className="text-muted">
              <i className={`bi ${hasLiked ? 'bi-hand-thumbs-up-fill text-success' : 'bi-hand-thumbs-down-fill text-danger'} me-1`}></i>
              You {hasLiked ? 'liked' : 'disliked'} this post
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;