import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostDetail = () => {
  const { id } = useParams();
  const { posts, likePost, dislikePost, addComment } = useContext(PostContext);
  const { user, getUserInteraction } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  
  const post = posts.find(p => p.id === parseInt(id));
  const userInteraction = post ? getUserInteraction(post.id) : null;
  const hasLiked = userInteraction === 'liked';
  const hasDisliked = userInteraction === 'disliked';

  if (!post) return <p className="container mt-5">Post not found.</p>;

  // Check if user can see this post
  if (!post.approved && (!user || (user.role !== 'superadmin' && user.role !== 'subadmin'))) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Post Not Available</h4>
          <p>This post is pending approval and is not visible to users.</p>
        </div>
      </div>
    );
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim() && user) {
      addComment(post.id, comment.trim());
      setComment('');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            {/* Post Header */}
            <div className="card-header bg-primary text-white">
              <h1 className="h3 mb-0">{post.title}</h1>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {post.category && (
                  <span className="badge bg-light text-dark">
                    <i className="bi bi-tag me-1"></i> {post.category}
                  </span>
                )}
                {post.faculty && (
                  <span className="badge bg-info">
                    <i className="bi bi-building me-1"></i> {post.faculty}
                  </span>
                )}
                {post.isImportant && (
                  <span className="badge bg-warning text-dark">
                    <i className="bi bi-star-fill me-1"></i> Important
                  </span>
                )}
                {!post.approved && (
                  <span className="badge bg-warning text-dark">
                    <i className="bi bi-clock me-1"></i> Pending Approval
                  </span>
                )}
              </div>
            </div>

            {/* Post Body */}
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <span className="text-muted">
                    <i className="bi bi-person-circle me-1"></i>
                    Posted by: {post.author}
                  </span>
                  <span className="ms-3 text-muted">
                    <i className="bi bi-calendar me-1"></i>
                    {formatDate(post.date)}
                  </span>
                </div>
                
                {/* Like/Dislike Buttons */}
                {user && post.approved && (
                  <div className="d-flex gap-2">
                    <button 
                      className={`btn ${hasLiked ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={() => likePost(post.id)}
                      title={hasLiked ? 'Remove like' : 'Like this post'}
                    >
                      <i className="bi bi-hand-thumbs-up"></i> 
                      <span className="ms-1">{post.likes}</span>
                    </button>
                    
                    <button 
                      className={`btn ${hasDisliked ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => dislikePost(post.id)}
                      title={hasDisliked ? 'Remove dislike' : 'Dislike this post'}
                    >
                      <i className="bi bi-hand-thumbs-down"></i> 
                      <span className="ms-1">{post.dislikes}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="lead">{post.description}</p>
                
                {post.photo && (
                  <div className="text-center my-4">
                    <img 
                      src={post.photo} 
                      alt="Post" 
                      className="img-fluid rounded" 
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                )}
              </div>

              {/* Interaction Status */}
              {user && post.approved && (hasLiked || hasDisliked) && (
                <div className="alert alert-info">
                  <i className={`bi ${hasLiked ? 'bi-hand-thumbs-up-fill text-success' : 'bi-hand-thumbs-down-fill text-danger'} me-2`}></i>
                  You have {hasLiked ? 'liked' : 'disliked'} this post.
                  {hasLiked ? ' Click again to remove your like.' : ' Click again to remove your dislike.'}
                </div>
              )}

              {/* Comment Section */}
              <div className="mt-5">
                <h4 className="mb-3">
                  <i className="bi bi-chat-text me-2"></i>
                  Comments ({post.comments.length})
                </h4>

                {/* Add Comment Form */}
                {user && post.approved ? (
                  <form onSubmit={handleSubmitComment} className="mb-4">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="bi bi-send"></i>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="alert alert-secondary">
                    <i className="bi bi-info-circle me-2"></i>
                    {user ? 'This post is not approved for comments yet.' : 'Please login to comment on this post.'}
                  </div>
                )}

                {/* Comments List */}
                <div className="list-group">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">
                          <i className="bi bi-person-circle me-2"></i>
                          {comment.user}
                        </h6>
                        <small className="text-muted">{formatDate(comment.date)}</small>
                      </div>
                      <p className="mb-1">{comment.text}</p>
                    </div>
                  ))}
                  
                  {post.comments.length === 0 && (
                    <div className="text-center py-4">
                      <i className="bi bi-chat-square-text display-4 text-muted mb-3"></i>
                      <p className="text-muted">No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Post Information
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Status:</strong>
                  <span className={`badge ms-2 ${post.approved ? 'bg-success' : 'bg-warning'}`}>
                    {post.approved ? 'Approved' : 'Pending'}
                  </span>
                </li>
                <li className="mb-2">
                  <strong>Author:</strong> {post.author}
                </li>
                <li className="mb-2">
                  <strong>Posted:</strong> {formatDate(post.date)}
                </li>
                <li className="mb-2">
                  <strong>Likes:</strong> {post.likes}
                </li>
                <li className="mb-2">
                  <strong>Dislikes:</strong> {post.dislikes}
                </li>
                <li className="mb-2">
                  <strong>Comments:</strong> {post.comments.length}
                </li>
              </ul>
            </div>
          </div>

          {/* User Interaction Info */}
          {user && post.approved && (
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">
                  <i className="bi bi-hand-thumbs-up me-2"></i>
                  Your Interaction
                </h5>
              </div>
              <div className="card-body">
                {hasLiked ? (
                  <div className="alert alert-success">
                    <i className="bi bi-hand-thumbs-up-fill me-2"></i>
                    You liked this post
                  </div>
                ) : hasDisliked ? (
                  <div className="alert alert-danger">
                    <i className="bi bi-hand-thumbs-down-fill me-2"></i>
                    You disliked this post
                  </div>
                ) : (
                  <div className="alert alert-secondary">
                    <i className="bi bi-hand-index me-2"></i>
                    You haven't interacted with this post yet
                  </div>
                )}
                <p className="small text-muted mb-0">
                  <i className="bi bi-info-circle me-1"></i>
                  You can only like or dislike a post once. Click again to remove your vote.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;