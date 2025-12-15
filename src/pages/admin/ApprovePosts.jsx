import React, { useContext, useState } from 'react';
import { PostContext } from '../../context/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

const ApprovePosts = () => {
  const { getPendingPosts, approvePost, deletePost, posts } = useContext(PostContext);
  const pendingPosts = getPendingPosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const handleApprove = (postId) => {
    if (window.confirm('Are you sure you want to approve this post?')) {
      approvePost(postId);
      setSelectedPost(null);
    }
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deletePost(postId);
      setSelectedPost(null);
    }
  };

  const handleViewDetails = (post) => {
    setSelectedPost(post);
  };

  const filteredPosts = pendingPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'faculty' && post.faculty) ||
                         (filterBy === 'category' && post.category);
    
    return matchesSearch && matchesFilter;
  });

  const getFacultyName = (facultySlug) => {
    const faculties = {
      'computing': 'Computing',
      'electrical-computer': 'Electrical & Computer Engineering',
      'civil-water': 'Water Resource & Civil Engineering',
      'chemical-food': 'Food & Chemical Engineering',
      'aerospace': 'Aerospace Engineering'
    };
    return faculties[facultySlug] || facultySlug;
  };

  const getCategoryName = (categorySlug) => {
    const categories = {
      'library': 'Library',
      'cafeteria': 'Cafeteria',
      'sports': 'Sports',
      'registrar': 'Registrar',
      'student-affairs': 'Student Affairs'
    };
    return categories[categorySlug] || categorySlug;
  };

  const stats = {
    total: pendingPosts.length,
    byFaculty: pendingPosts.filter(p => p.faculty).length,
    byCategory: pendingPosts.filter(p => p.category).length,
    today: pendingPosts.filter(p => {
      const postDate = new Date(p.date);
      const today = new Date();
      return postDate.toDateString() === today.toDateString();
    }).length
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-4">
            <i className="bi bi-shield-check me-2 text-primary"></i>
            Post Approval Dashboard
          </h1>
          
          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3 col-6 mb-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Total Pending</h5>
                  <h2 className="display-6">{stats.total}</h2>
                  <small>Posts awaiting review</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="card bg-info text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Faculty Posts</h5>
                  <h2 className="display-6">{stats.byFaculty}</h2>
                  <small>Department announcements</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="card bg-success text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Category Posts</h5>
                  <h2 className="display-6">{stats.byCategory}</h2>
                  <small>General announcements</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body">
                  <h5 className="card-title">Today's Posts</h5>
                  <h2 className="display-6">{stats.today}</h2>
                  <small>Submitted today</small>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search posts by title, description, or author..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-filter"></i>
                    </span>
                    <select
                      className="form-select"
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                    >
                      <option value="all">All Posts</option>
                      <option value="faculty">Faculty Posts Only</option>
                      <option value="category">Category Posts Only</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Posts List */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Pending Posts ({filteredPosts.length})
              </h5>
            </div>
            <div className="card-body">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-check-circle display-1 text-success mb-3"></i>
                  <h4>No pending posts</h4>
                  <p className="text-muted">All posts have been reviewed.</p>
                </div>
              ) : (
                <div className="list-group">
                  {filteredPosts.map(post => (
                    <div key={post.id} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h5 className="mb-1">
                            {post.title}
                            {post.isImportant && (
                              <span className="badge bg-warning ms-2">
                                <i className="bi bi-star-fill me-1"></i>Important
                              </span>
                            )}
                          </h5>
                          <p className="mb-1 text-truncate">{post.description.substring(0, 150)}...</p>
                          <div className="d-flex flex-wrap gap-2 mt-2">
                            {post.faculty && (
                              <span className="badge bg-info">
                                <i className="bi bi-building me-1"></i>
                                {getFacultyName(post.faculty)}
                              </span>
                            )}
                            {post.category && (
                              <span className="badge bg-primary">
                                <i className="bi bi-tag me-1"></i>
                                {getCategoryName(post.category)}
                              </span>
                            )}
                            <small className="text-muted">
                              <i className="bi bi-person me-1"></i>
                              {post.author}
                            </small>
                            <small className="text-muted">
                              <i className="bi bi-calendar me-1"></i>
                              {new Date(post.date).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                        <div className="btn-group btn-group-sm ms-3">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleViewDetails(post)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-outline-success"
                            onClick={() => handleApprove(post.id)}
                          >
                            <i className="bi bi-check-lg"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(post.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Post Details */}
        <div className="col-lg-4">
          {selectedPost ? (
            <div className="card sticky-top" style={{ top: '100px' }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-file-text me-2"></i>
                  Post Details
                </h5>
              </div>
              <div className="card-body">
                <h5>{selectedPost.title}</h5>
                {selectedPost.isImportant && (
                  <div className="alert alert-warning mb-3">
                    <i className="bi bi-star-fill me-2"></i>
                    Marked as Important Post
                  </div>
                )}
                
                <p className="mb-3">{selectedPost.description}</p>
                
                <div className="mb-3">
                  <h6>Post Information:</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong><i className="bi bi-person me-2"></i>Author:</strong>
                      <span className="ms-2">{selectedPost.author}</span>
                    </li>
                    <li className="mb-2">
                      <strong><i className="bi bi-calendar me-2"></i>Date:</strong>
                      <span className="ms-2">{new Date(selectedPost.date).toLocaleDateString()}</span>
                    </li>
                    {selectedPost.faculty && (
                      <li className="mb-2">
                        <strong><i className="bi bi-building me-2"></i>Faculty:</strong>
                        <span className="ms-2">{getFacultyName(selectedPost.faculty)}</span>
                      </li>
                    )}
                    {selectedPost.category && (
                      <li className="mb-2">
                        <strong><i className="bi bi-tag me-2"></i>Category:</strong>
                        <span className="ms-2">{getCategoryName(selectedPost.category)}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                {selectedPost.photo && (
                  <div className="mb-3">
                    <h6>Attached Image:</h6>
                    <img 
                      src={selectedPost.photo} 
                      alt="Post" 
                      className="img-fluid rounded"
                      style={{ maxHeight: '150px' }}
                    />
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleApprove(selectedPost.id)}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Approve Post
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(selectedPost.id)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Delete Post
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSelectedPost(null)}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-file-text display-1 text-muted mb-3"></i>
                <h5>Select a Post</h5>
                <p className="text-muted">Click on a post to view details and take action</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovePosts;