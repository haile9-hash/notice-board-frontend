import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = login(username, password);
      
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('rememberedUser', username);
        }
        
        // Show success message
        setError('');
        
        // REDIRECT BASED ON USER ROLE
        setTimeout(() => {
          if (result.user.role === 'superadmin') {
            navigate('/superadmin-dashboard');
          } else if (result.user.role === 'subadmin') {
            navigate('/subadmin-dashboard');
          } else {
            // Regular users go to home page
            navigate('/');
          }
        }, 500);
      } else {
        setError(result.message || 'Invalid username or password');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      superadmin: { username: 'superadmin', password: 'admin123' },
      subadmin: { username: 'computing_admin', password: 'comp123' },
      user: { username: 'student1', password: 'student123' }
    };
    
    const creds = demoCredentials[role];
    if (creds) {
      setUsername(creds.username);
      setPassword(creds.password);
    }
  };

  return (
    <div className="auth-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="auth-card shadow-lg">
              {/* Header Section */}
              <div className="auth-header text-center py-4">
                <div className="logo-container mb-3">
                  <i className="bi bi-shield-lock-fill text-white display-4"></i>
                </div>
                <h1 className="fw-bold mb-2 text-white">Welcome Back</h1>
                <p className="text-white">Sign in to your BDU Notice Board account</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show mx-4 mt-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setError('')}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {/* Form Section */}
              <div className="auth-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* Username Field */}
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label fw-semibold">
                      <i className="bi bi-person-fill me-2 text-primary"></i>
                      Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      <i className="bi bi-lock-fill me-2 text-primary"></i>
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-key text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi bi-eye${showPassword ? '-slash' : ''} text-muted`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-decoration-none text-primary">
                      <small>Forgot password?</small>
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 py-3 fw-semibold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </button>
                  </div>

                  {/* Demo Login Options */}
                  <div className="mb-4">
                    <p className="text-center text-muted mb-3">Quick Demo Login</p>
                    <div className="row g-2">
                      <div className="col-4">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => handleDemoLogin('superadmin')}
                          disabled={loading}
                        >
                          Super Admin
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className="btn btn-outline-warning btn-sm w-100"
                          onClick={() => handleDemoLogin('subadmin')}
                          disabled={loading}
                        >
                          Sub Admin
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm w-100"
                          onClick={() => handleDemoLogin('user')}
                          disabled={loading}
                        >
                          User
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="position-relative my-4">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      OR
                    </span>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="mb-2">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-decoration-none fw-semibold text-primary">
                        Sign up here
                      </Link>
                    </p>
                    <p className="mb-0">
                      <Link to="/demo-login" className="text-decoration-none text-warning">
                        <i className="bi bi-rocket-takeoff me-1"></i>
                        Try full demo experience
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Footer Section */}
              <div className="auth-footer text-center py-3 bg-light">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Secure login with BDU authentication system
                </small>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 text-center">
              <div className="card border-0 bg-light">
                <div className="card-body py-3">
                  <h6 className="mb-2">
                    <i className="bi bi-info-circle me-2 text-primary"></i>
                    Need Help?
                  </h6>
                  <p className="small mb-0">
                    Contact BDU IT Support at{' '}
                    <a href="mailto:it-support@bdu.edu.et" className="text-decoration-none">
                      it-support@bdu.edu.et
                    </a>
                    {' '}or call{' '}
                    <a href="tel:+251123456789" className="text-decoration-none">
                      +251 123 456 789
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;