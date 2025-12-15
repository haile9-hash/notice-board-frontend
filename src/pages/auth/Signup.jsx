import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    faculty: '',
    studentId: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) return '';
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength === 0) return '';
    if (strength === 1) return 'weak';
    if (strength === 2) return 'fair';
    if (strength === 3) return 'good';
    return 'strong';
  };

  useEffect(() => {
    const strength = checkPasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!formData.email.endsWith('@bdu.edu.et') && !formData.email.endsWith('@student.bdu.edu.et')) {
      newErrors.email = 'Please use your BDU email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (passwordStrength === 'weak') {
      newErrors.password = 'Password is too weak. Include uppercase, numbers, and symbols';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Student ID validation (if provided)
    if (formData.studentId && !/^BDU\/\d{4}\/\d{2}$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be in format: BDU/1234/14';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setSuccessMessage('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        faculty: formData.faculty || null,
        studentId: formData.studentId || null,
        phone: formData.phone || null
      };
      
      const result = signup(userData);
      
      if (result.success) {
        setSuccessMessage('🎉 Account created successfully! Redirecting to login...');
        
        // Clear form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          faculty: '',
          studentId: '',
          phone: ''
        });
        
        // Redirect after delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrors({ general: result.message || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const faculties = [
    { value: '', label: 'Select Faculty (Optional)' },
    { value: 'computing', label: 'Faculty of Computing' },
    { value: 'electrical-computer', label: 'Faculty of Electrical & Computer Engineering' },
    { value: 'civil-water', label: 'Faculty of Water Resource & Civil Engineering' },
    { value: 'chemical-food', label: 'Faculty of Food & Chemical Engineering' },
    { value: 'aerospace', label: 'Faculty of Aerospace Engineering' },
    { value: 'business', label: 'Faculty of Business & Economics' },
    { value: 'law', label: 'Faculty of Law' },
    { value: 'medicine', label: 'Faculty of Medicine' },
    { value: 'other', label: 'Other Faculty' }
  ];

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'danger';
      case 'fair': return 'warning';
      case 'good': return 'info';
      case 'strong': return 'success';
      default: return 'secondary';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak';
      case 'fair': return 'Fair';
      case 'good': return 'Good';
      case 'strong': return 'Strong';
      default: return 'Enter password';
    }
  };

  return (
    <div className="auth-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="auth-card shadow-lg">
              {/* Header Section */}
              <div className="auth-header text-center py-4">
                <div className="logo-container mb-3">
                  <i className="bi bi-person-plus-fill text-white display-4"></i>
                </div>
                <h1 className="fw-bold mb-2 text-white">Create Account</h1>
                <p className="text-white-50">Join BDU Notice Board community</p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show mx-4 mt-3" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {successMessage}
                </div>
              )}

              {/* Error Message */}
              {errors.general && (
                <div className="alert alert-danger alert-dismissible fade show mx-4 mt-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {errors.general}
                </div>
              )}

              {/* Form Section */}
              <div className="auth-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Full Name */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fullName" className="form-label fw-semibold">
                        <i className="bi bi-person-badge me-2 text-primary"></i>
                        Full Name *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-person text-muted"></i>
                        </span>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </div>
                      {errors.fullName && (
                        <div className="invalid-feedback d-block">{errors.fullName}</div>
                      )}
                    </div>

                    {/* Username */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="username" className="form-label fw-semibold">
                        <i className="bi bi-at me-2 text-primary"></i>
                        Username *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-person-circle text-muted"></i>
                        </span>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                          placeholder="johndoe"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </div>
                      {errors.username && (
                        <div className="invalid-feedback d-block">{errors.username}</div>
                      )}
                      <small className="text-muted">3-20 characters, letters, numbers, and underscores only</small>
                    </div>

                    {/* Email */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        <i className="bi bi-envelope me-2 text-primary"></i>
                        Email *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-envelope-at text-muted"></i>
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="john.doe@student.bdu.edu.et"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </div>
                      {errors.email && (
                        <div className="invalid-feedback d-block">{errors.email}</div>
                      )}
                      <small className="text-muted">Use your BDU email address</small>
                    </div>

                    {/* Phone Number */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        <i className="bi bi-phone me-2 text-primary"></i>
                        Phone Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-telephone text-muted"></i>
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="+251 912 345 678"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Faculty */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="faculty" className="form-label fw-semibold">
                        <i className="bi bi-building me-2 text-primary"></i>
                        Faculty
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-buildings text-muted"></i>
                        </span>
                        <select
                          id="faculty"
                          name="faculty"
                          className="form-select"
                          value={formData.faculty}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          {faculties.map((faculty, index) => (
                            <option key={index} value={faculty.value}>
                              {faculty.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Student ID */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="studentId" className="form-label fw-semibold">
                        <i className="bi bi-card-text me-2 text-primary"></i>
                        Student ID
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-123 text-muted"></i>
                        </span>
                        <input
                          type="text"
                          id="studentId"
                          name="studentId"
                          className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                          placeholder="BDU/1234/14"
                          value={formData.studentId}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                      {errors.studentId && (
                        <div className="invalid-feedback d-block">{errors.studentId}</div>
                      )}
                      <small className="text-muted">Format: BDU/YYYY/ID</small>
                    </div>

                    {/* Password */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label fw-semibold">
                        <i className="bi bi-lock-fill me-2 text-primary"></i>
                        Password *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-key text-muted"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
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
                      {errors.password && (
                        <div className="invalid-feedback d-block">{errors.password}</div>
                      )}
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">Password strength:</small>
                          <small className={`text-${getPasswordStrengthColor()} fw-semibold`}>
                            {getPasswordStrengthText()}
                          </small>
                        </div>
                        <div className={`password-strength ${passwordStrength}`}>
                          <div className="password-strength-bar"></div>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6 mb-4">
                      <label htmlFor="confirmPassword" className="form-label fw-semibold">
                        <i className="bi bi-lock-fill me-2 text-primary"></i>
                        Confirm Password *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-key-fill text-muted"></i>
                        </span>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                        <button
                          type="button"
                          className="input-group-text bg-light"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''} text-muted`}></i>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        required
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the{' '}
                        <Link to="/terms" className="text-decoration-none text-primary">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-decoration-none text-primary">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2"></i>
                          Create Account
                        </>
                      )}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="position-relative my-4">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      ALREADY HAVE AN ACCOUNT?
                    </span>
                  </div>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="mb-2">
                      Already registered?{' '}
                      <Link to="/login" className="text-decoration-none fw-semibold text-primary">
                        Sign in here
                      </Link>
                    </p>
                    <p className="mb-0">
                      <Link to="/demo-login" className="text-decoration-none text-warning">
                        <i className="bi bi-rocket-takeoff me-1"></i>
                        Try demo accounts instead
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Footer Section */}
              <div className="auth-footer text-center py-3 bg-light">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  All fields marked with * are required. Your account will be verified by BDU administration.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;