import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import faculties from '../../data/faculties';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const { getUserPosts } = useContext(PostContext);
  const myPosts = getUserPosts();

  const getFacultyName = () => {
    const faculty = faculties.find(f => f.slug === user?.faculty);
    return faculty ? faculty.name : user?.faculty;
  };

  const stats = {
    totalPosts: myPosts.length,
    approvedPosts: myPosts.filter(p => p.approved).length,
    pendingPosts: myPosts.filter(p => !p.approved).length,
    totalLikes: myPosts.reduce((sum, post) => sum + post.likes, 0)
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Sub-Admin Dashboard</h1>
      
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="alert alert-warning">
            <h4>Welcome, {user?.name}!</h4>
            <p>
              You are managing posts for: <strong>{getFacultyName()}</strong>
            </p>
            <p className="mb-0">
              <small>
                Note: Your posts require approval from Super Admin.
              </small>
            </p>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">My Posts</h5>
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
            <div className="card-header bg-warning text-dark">
              <h5>Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2 d-md-flex">
                <Link to="/create-post" className="btn btn-success me-2">
                  <i className="bi bi-plus-circle"></i> Create New Post
                </Link>
                <Link to={`/faculties/${user?.faculty}`} className="btn btn-info me-2">
                  <i className="bi bi-eye"></i> View Faculty Posts
                </Link>
                <Link to="/" className="btn btn-primary">
                  <i className="bi bi-house"></i> Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5>My Recent Posts</h5>
            </div>
            <div className="card-body">
              {myPosts.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Likes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myPosts.slice(0, 5).map(post => (
                        <tr key={post.id}>
                          <td>{post.title.substring(0, 50)}...</td>
                          <td>{post.date}</td>
                          <td>
                            {post.approved ? (
                              <span className="badge bg-success">Approved</span>
                            ) : (
                              <span className="badge bg-warning">Pending</span>
                            )}
                          </td>
                          <td>{post.likes}</td>
                          <td>
                            <Link to={`/post/${post.id}`} className="btn btn-sm btn-info">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted">You haven't created any posts yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminDashboard;