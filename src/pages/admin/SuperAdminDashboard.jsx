import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

const SuperAdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { posts, getPendingPosts } = useContext(PostContext);
  const navigate = useNavigate();
  
  const pendingPosts = getPendingPosts();
  const approvedPosts = posts.filter(p => p.approved);
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const stats = {
    totalPosts: posts.length,
    approvedPosts: approvedPosts.length,
    pendingPosts: pendingPosts.length,
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
    totalDislikes: posts.reduce((sum, post) => sum + post.dislikes, 0),
    totalComments: posts.reduce((sum, post) => sum + post.comments.length, 0)
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleManageUsers = () => {
    navigate('/manage-users');
  };

  const handleApprovePosts = () => {
    navigate('/approve-posts');
  };

  const handleViewDashboard = () => {
    navigate('/superadmin-dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4">
        <i className="bi bi-speedometer2 me-2 text-primary"></i>
        Super Admin Dashboard
      </h1>
      
      {/* Welcome Card */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="card-title mb-2">Welcome, {user?.name}!</h3>
                  <p className="card-text mb-0">
                    You have full administrative control over the notice board system.
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={handleCreatePost}
                  >
                    <i className="bi bi-plus-circle me-1"></i> Create Post
                  </button>
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Total Posts</h5>
                  <h2 className="display-6">{stats.totalPosts}</h2>
                </div>
                <i className="bi bi-file-text display-6 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Approved</h5>
                  <h2 className="display-6">{stats.approvedPosts}</h2>
                </div>
                <i className="bi bi-check-circle display-6 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Pending</h5>
                  <h2 className="display-6">{stats.pendingPosts}</h2>
                </div>
                <i className="bi bi-clock-history display-6 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Total Likes</h5>
                  <h2 className="display-6">{stats.totalLikes}</h2>
                </div>
                <i className="bi bi-hand-thumbs-up display-6 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-lightning me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <button 
                    className="btn btn-warning w-100 py-3"
                    onClick={handleApprovePosts}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="bi bi-check-circle display-6 me-3"></i>
                      <div className="text-start">
                        <h5 className="mb-1">Approve Posts</h5>
                        <p className="mb-0 small">{pendingPosts.length} pending</p>
                      </div>
                    </div>
                  </button>
                </div>
                
                <div className="col-md-4">
                  <button 
                    className="btn btn-secondary w-100 py-3"
                    onClick={handleManageUsers}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="bi bi-people display-6 me-3"></i>
                      <div className="text-start">
                        <h5 className="mb-1">Manage Users</h5>
                        <p className="mb-0 small">View and manage all users</p>
                      </div>
                    </div>
                  </button>
                </div>
                
                <div className="col-md-4">
                  <button 
                    className="btn btn-success w-100 py-3"
                    onClick={handleCreatePost}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="bi bi-plus-circle display-6 me-3"></i>
                      <div className="text-start">
                        <h5 className="mb-1">Create Post</h5>
                        <p className="mb-0 small">Publish new announcement</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Activity */}
        <div className="col-md-8 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-activity me-2"></i>
                Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Post Title</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map(post => (
                      <tr key={post.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className={`bi ${post.faculty ? 'bi-building' : 'bi-tag'} me-2`}></i>
                            <span>{post.title.substring(0, 40)}...</span>
                          </div>
                        </td>
                        <td>
                          {post.faculty ? (
                            <span className="badge bg-info">Faculty</span>
                          ) : (
                            <span className="badge bg-primary">Category</span>
                          )}
                        </td>
                        <td>{new Date(post.date).toLocaleDateString()}</td>
                        <td>
                          {post.approved ? (
                            <span className="badge bg-success">Approved</span>
                          ) : (
                            <span className="badge bg-warning">Pending</span>
                          )}
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/post/${post.id}`)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">
                <i className="bi bi-clock me-2"></i>
                Pending Approvals
              </h5>
            </div>
            <div className="card-body">
              {pendingPosts.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-check-circle display-4 text-success mb-3"></i>
                  <p className="mb-0">No pending approvals</p>
                </div>
              ) : (
                <div className="list-group">
                  {pendingPosts.slice(0, 5).map(post => (
                    <div key={post.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{post.title.substring(0, 30)}...</h6>
                        <small>{new Date(post.date).toLocaleDateString()}</small>
                      </div>
                      <p className="mb-1 small text-muted">{post.author}</p>
                      <div className="d-flex gap-2 mt-2">
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => navigate('/approve-posts')}
                        >
                          <i className="bi bi-check"></i> Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {pendingPosts.length > 0 && (
                <div className="mt-3 text-center">
                  <button 
                    className="btn btn-warning w-100"
                    onClick={handleApprovePosts}
                  >
                    <i className="bi bi-arrow-right me-2"></i>
                    View All Pending ({pendingPosts.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;