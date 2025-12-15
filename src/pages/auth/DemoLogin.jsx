import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DemoLogin.css'; // We'll create this CSS file

const DemoLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const demoUsers = [
    { 
      username: 'superadmin', 
      password: 'admin123', 
      role: 'superadmin', 
      name: 'Super Admin',
      description: 'Full access to all features'
    },
    { 
      username: 'computing_admin', 
      password: 'comp123', 
      role: 'subadmin', 
      name: 'Computing Department Admin',
      description: 'Manage Computing faculty posts'
    },
    { 
      username: 'electrical_admin', 
      password: 'elec123', 
      role: 'subadmin', 
      name: 'Electrical Engineering Admin',
      description: 'Manage Electrical & Computer Engineering posts'
    },
    { 
      username: 'student1', 
      password: 'student123', 
      role: 'user', 
      name: 'Student User',
      description: 'Regular user with basic privileges'
    }
  ];

  const handleDemoLogin = (user) => {
    setSelectedUser(user.username);
    setLoginMessage(`Logging in as ${user.name}...`);
    
    setTimeout(() => {
      const result = login(user.username, user.password);
      if (result.success) {
        setLoginMessage(`Success! Redirecting to ${user.role} dashboard...`);
        setTimeout(() => {
          navigate(`/${user.role}-dashboard`);
        }, 1000);
      } else {
        setLoginMessage('Login failed. Please try again.');
      }
    }, 500);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin': return 'danger';
      case 'subadmin': return 'warning';
      case 'user': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="container demo-login-container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="mb-0">
                <i className="bi bi-person-badge me-2"></i>
                Demo Login Portal
              </h2>
              <p className="mb-0 mt-2 opacity-75">
                Select a demo account to test different user roles
              </p>
            </div>
            
            <div className="card-body p-4">
              {loginMessage && (
                <div className={`alert alert-${loginMessage.includes('Success') ? 'success' : 'info'} alert-dismissible fade show`}>
                  {loginMessage}
                  <button type="button" className="btn-close" onClick={() => setLoginMessage('')}></button>
                </div>
              )}
              
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-info-circle me-2"></i>
                        How to Use
                      </h5>
                      <p className="card-text mb-0">
                        Click on any user card below to login instantly. Each role has different permissions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {demoUsers.map((user, index) => (
                  <div key={index} className="col">
                    <div 
                      className={`card h-100 user-card ${selectedUser === user.username ? 'selected' : ''}`}
                      onClick={() => handleDemoLogin(user)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`card-header bg-${getRoleColor(user.role)} text-white d-flex justify-content-between align-items-center`}>
                        <h5 className="mb-0">
                          <i className={`bi bi-${getRoleIcon(user.role)} me-2`}></i>
                          {user.name}
                        </h5>
                        <span className={`badge bg-${getRoleColor(user.role)} text-white`}>
                          {user.role}
                        </span>
                      </div>
                      
                      <div className="card-body">
                        <p className="card-text">{user.description}</p>
                        
                        <div className="credentials mt-3 p-3 bg-light rounded">
                          <h6 className="border-bottom pb-2">
                            <i className="bi bi-key me-2"></i>
                            Login Credentials
                          </h6>
                          <div className="row">
                            <div className="col-6">
                              <strong>Username:</strong>
                              <div className="text-muted">{user.username}</div>
                            </div>
                            <div className="col-6">
                              <strong>Password:</strong>
                              <div className="text-muted">{user.password}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-footer text-center">
                        <button className="btn btn-outline-primary w-100">
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Login as {user.name}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header bg-info text-white">
                      <h5 className="mb-0">
                        <i className="bi bi-shield-check me-2"></i>
                        Role Permissions Overview
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Role</th>
                              <th>Create Posts</th>
                              <th>Approve Posts</th>
                              <th>Manage Users</th>
                              <th>Like/Comment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><span className="badge bg-danger">Super Admin</span></td>
                              <td><i className="bi bi-check-circle-fill text-success"></i></td>
                              <td><i className="bi bi-check-circle-fill text-success"></i></td>
                              <td><i className="bi bi-check-circle-fill text-success"></i></td>
                              <td><i className="bi bi-check-circle-fill text-success"></i></td>
                            </tr>
                            <tr>
                              <td><span className="badge bg-warning text-dark">Sub-Admin</span></td>
                              <td><i className="bi bi-check-circle-fill text-success"></i></td>
                              <td><i className="bi bi-x-circle-fill text-danger"></i></td>
                              <td><i className="bi bi-x-circle-fill text-danger"></i></td>
                              <td><i className="bi bi-check-circle-fill text-success"></i></td>
                            </tr>
                            <tr>
                              <td><span className="badge bg-success">User</span></td>
                              <td><i className="bi bi-x-circle-fill text-danger"></i></td>
                              <td><i className="bi bi-x-circle-fill text-danger"></i></td>
                              <td><i className="bi bi-x-circle-fill text-danger"></i></td>
                              <td><i className="bi bi-check-circle-fill text-success"></i></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col-12 text-center">
                  <div className="alert alert-secondary">
                    <h6 className="mb-2">
                      <i className="bi bi-lightbulb me-2"></i>
                      Quick Tips
                    </h6>
                    <p className="mb-0 small">
                      • Try logging in as Super Admin to see all admin features<br/>
                      • Test Sub-Admin accounts to see faculty-specific posting<br/>
                      • Use User accounts to experience regular user features
                    </p>
                  </div>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/login')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Regular Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getRoleIcon = (role) => {
  switch (role) {
    case 'superadmin': return 'shield-check';
    case 'subadmin': return 'person-gear';
    case 'user': return 'person';
    default: return 'person';
  }
};

export default DemoLogin;