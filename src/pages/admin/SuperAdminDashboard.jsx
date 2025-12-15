import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const SuperAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const { getPendingPosts, posts } = useContext(PostContext);
  const pendingPosts = getPendingPosts();

  const stats = {
    totalPosts: posts.length,
    approvedPosts: posts.filter(p => p.approved).length,
    pendingPosts: pendingPosts.length,
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
    totalComments: posts.reduce((sum, post) => sum + post.comments.length, 0)
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Super Admin Dashboard</h1>
      
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="alert alert-success">
            <h4>Welcome, {user?.name}!</h4>
            <p>You have full administrative privileges.</p>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Posts</h5>
              <h2>{stats.totalPosts}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Approved</h5>
              <h2>{stats.approvedPosts}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <h2>{stats.pendingPosts}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Likes</h5>
              <h2>{stats.totalLikes}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5>Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2 d-md-flex">
                <Link to="/approve-posts" className="btn btn-warning me-2">
                  <i className="bi bi-check-circle"></i> Approve Posts ({pendingPosts.length})
                </Link>
                <Link to="/manage-users" className="btn btn-secondary me-2">
                  <i className="bi bi-people"></i> Manage Users
                </Link>
                <Link to="/create-post" className="btn btn-success me-2">
                  <i className="bi bi-plus-circle"></i> Create Post
                </Link>
                <Link to="/" className="btn btn-info">
                  <i className="bi bi-eye"></i> View Public Board
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h5>Pending Posts Requiring Approval</h5>
            </div>
            <div className="card-body">
              {pendingPosts.length > 0 ? (
                <div className="list-group">
                  {pendingPosts.map(post => (
                    <div key={post.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{post.title}</h6>
                        <small>{post.date}</small>
                      </div>
                      <p className="mb-1">{post.description.substring(0, 100)}...</p>
                      <small className="text-muted">By: {post.author}</small>
                      <div className="mt-2">
                        <Link to={`/approve-posts`} className="btn btn-sm btn-success">
                          Review Post
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted">No pending posts for approval.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;