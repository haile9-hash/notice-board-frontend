import React, { useContext } from 'react';
import PostList from '../../components/posts/PostList';
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  
  // For regular users, only show approved posts
  // For admins, show all posts
  const visiblePosts = user?.role === 'superadmin' 
    ? posts 
    : posts.filter(post => post.approved);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="mb-4">Welcome to BDU Notice Board</h1>
          
          {/* Show warning for pending posts only to subadmins */}
          {user?.role === 'subadmin' && (
            <div className="alert alert-warning mb-4">
              <i className="bi bi-info-circle me-2"></i>
              Your posts are pending approval from Super Admin.
            </div>
          )}
          
          {/* Statistics for superadmin only */}
          {user?.role === 'superadmin' && (
            <div className="row mb-4">
              <div className="col-md-3 col-6">
                <div className="card bg-primary text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">Total Posts</h5>
                    <h3>{posts.length}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card bg-success text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">Approved</h5>
                    <h3>{posts.filter(p => p.approved).length}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card bg-warning text-dark">
                  <div className="card-body text-center">
                    <h5 className="card-title">Pending</h5>
                    <h3>{posts.filter(p => !p.approved).length}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card bg-info text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">Important</h5>
                    <h3>{posts.filter(p => p.isImportant && p.approved).length}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <PostList posts={visiblePosts} />
        </div>
      </div>
    </div>
  );
};

export default Home;