import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

const CreatePost = () => {
  const { createPost } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    faculty: user?.faculty || '',
    isImportant: false
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: '', label: 'Select Category (Optional)' },
    { value: 'library', label: 'Library' },
    { value: 'cafeteria', label: 'Cafeteria' },
    { value: 'sports', label: 'Sports' },
    { value: 'registrar', label: 'Registrar' },
    { value: 'student-affairs', label: 'Student Affairs' }
  ];

  const faculties = [
    { value: '', label: 'Select Faculty (Optional)' },
    { value: 'computing', label: 'Computing' },
    { value: 'electrical-computer', label: 'Electrical & Computer Engineering' },
    { value: 'civil-water', label: 'Water Resource & Civil Engineering' },
    { value: 'chemical-food', label: 'Food & Chemical Engineering' },
    { value: 'aerospace', label: 'Aerospace Engineering' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (error) setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (formData.description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost = {
        title: formData.title,
        description: formData.description,
        category: formData.category || null,
        faculty: formData.faculty || null,
        isImportant: formData.isImportant,
        photo: imagePreview || null
      };

      // Create the post
      createPost(newPost);
      
      setSuccess('Post created successfully!');
      
      // Clear form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          category: '',
          faculty: user?.faculty || '',
          isImportant: false
        });
        setImageFile(null);
        setImagePreview(null);
        setLoading(false);
        
        // Redirect to dashboard
        navigate(`/${user?.role}-dashboard`);
      }, 1500);

    } catch (err) {
      setError('Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/${user?.role}-dashboard`);
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Create New Post
              </h3>
              <p className="mb-0 mt-2 small opacity-75">
                {user?.role === 'superadmin' 
                  ? 'Your posts will be published immediately.' 
                  : 'Your posts require approval from Super Admin.'}
              </p>
            </div>

            <div className="card-body p-4">
              {/* Success Message */}
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                  <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}

              {/* User Info */}
              <div className="mb-4 p-3 bg-light rounded">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Creating post as:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-primary">
                        <i className="bi bi-person me-1"></i>
                        {user?.name || user?.username}
                      </span>
                      <span className={`badge ${user?.role === 'superadmin' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        <i className="bi bi-shield me-1"></i>
                        {user?.role}
                      </span>
                      {user?.faculty && (
                        <span className="badge bg-info">
                          <i className="bi bi-building me-1"></i>
                          {user?.faculty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-semibold">
                    <i className="bi bi-card-heading me-2 text-primary"></i>
                    Post Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  <small className="text-muted">Make it clear and descriptive</small>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-semibold">
                    <i className="bi bi-text-paragraph me-2 text-primary"></i>
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="6"
                    placeholder="Enter post description..."
                    value={formData.description}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  ></textarea>
                  <div className="d-flex justify-content-between mt-1">
                    <small className="text-muted">Minimum 10 characters</small>
                    <small className={formData.description.length < 10 ? 'text-danger' : 'text-success'}>
                      {formData.description.length} characters
                    </small>
                  </div>
                </div>

                <div className="row">
                  {/* Category */}
                  <div className="col-md-6 mb-4">
                    <label htmlFor="category" className="form-label fw-semibold">
                      <i className="bi bi-tags me-2 text-primary"></i>
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      {categories.map((cat, index) => (
                        <option key={index} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <small className="text-muted">Optional - For general announcements</small>
                  </div>

                  {/* Faculty */}
                  <div className="col-md-6 mb-4">
                    <label htmlFor="faculty" className="form-label fw-semibold">
                      <i className="bi bi-building me-2 text-primary"></i>
                      Faculty
                    </label>
                    <select
                      id="faculty"
                      name="faculty"
                      className="form-select"
                      value={formData.faculty}
                      onChange={handleChange}
                      disabled={loading || (user?.role === 'subadmin' && user?.faculty)}
                    >
                      {faculties.map((fac, index) => (
                        <option key={index} value={fac.value}>
                          {fac.label}
                        </option>
                      ))}
                    </select>
                    <small className="text-muted">
                      {user?.role === 'subadmin' 
                        ? 'Auto-filled for your faculty' 
                        : 'Optional - For faculty-specific posts'}
                    </small>
                  </div>
                </div>

                {/* Important Post Checkbox */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isImportant"
                      name="isImportant"
                      checked={formData.isImportant}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="isImportant">
                      <i className="bi bi-star me-2 text-warning"></i>
                      Mark as Important Post
                    </label>
                    <small className="text-muted d-block mt-1">
                      Important posts will be highlighted on the homepage
                    </small>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-image me-2 text-primary"></i>
                    Add Image (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                  />
                  <small className="text-muted">Upload JPG, PNG or GIF image</small>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3">
                      <p className="mb-2"><small>Preview:</small></p>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="img-fluid rounded" 
                        style={{ maxHeight: '200px' }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        disabled={loading}
                      >
                        <i className="bi bi-trash me-1"></i> Remove Image
                      </button>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <i className="bi bi-arrow-left me-1"></i> Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Post...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-1"></i>
                        {user?.role === 'superadmin' ? 'Publish Now' : 'Submit for Approval'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;