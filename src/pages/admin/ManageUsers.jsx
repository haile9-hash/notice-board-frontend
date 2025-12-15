import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([
    { id: 1, username: 'superadmin', name: 'Super Admin', email: 'superadmin@bdu.edu.et', role: 'superadmin', faculty: null, status: 'active', joinDate: '2025-01-01' },
    { id: 2, username: 'computing_admin', name: 'Computing Admin', email: 'computing@bdu.edu.et', role: 'subadmin', faculty: 'computing', status: 'active', joinDate: '2025-02-15' },
    { id: 3, username: 'electrical_admin', name: 'Electrical Admin', email: 'electrical@bdu.edu.et', role: 'subadmin', faculty: 'electrical-computer', status: 'active', joinDate: '2025-02-20' },
    { id: 4, username: 'student1', name: 'John Doe', email: 'john@student.bdu.edu.et', role: 'user', faculty: 'computing', status: 'active', joinDate: '2025-03-01' },
    { id: 5, username: 'student2', name: 'Jane Smith', email: 'jane@student.bdu.edu.et', role: 'user', faculty: 'electrical-computer', status: 'active', joinDate: '2025-03-05' },
    { id: 6, username: 'professor1', name: 'Dr. Michael Brown', email: 'm.brown@bdu.edu.et', role: 'user', faculty: 'civil-water', status: 'inactive', joinDate: '2025-01-20' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    name: '',
    email: '',
    role: '',
    faculty: '',
    status: ''
  });

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      faculty: user.faculty || '',
      status: user.status
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      setUsers(prev => prev.map(u => 
        u.id === selectedUser.id ? { ...u, ...editForm } : u
      ));
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      if (userId === user.id) {
        alert('You cannot delete your own account!');
        return;
      }
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleChangeStatus = (userId, newStatus) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role) => {
    const roles = {
      'superadmin': { class: 'bg-danger', icon: 'bi-shield-check' },
      'subadmin': { class: 'bg-warning text-dark', icon: 'bi-person-gear' },
      'user': { class: 'bg-success', icon: 'bi-person' }
    };
    const roleInfo = roles[role] || { class: 'bg-secondary', icon: 'bi-person' };
    
    return (
      <span className={`badge ${roleInfo.class}`}>
        <i className={`bi ${roleInfo.icon} me-1`}></i>
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="badge bg-success">
        <i className="bi bi-check-circle me-1"></i>Active
      </span>
    ) : (
      <span className="badge bg-secondary">
        <i className="bi bi-x-circle me-1"></i>Inactive
      </span>
    );
  };

  const getFacultyName = (facultySlug) => {
    const faculties = {
      'computing': 'Computing',
      'electrical-computer': 'Electrical & Computer',
      'civil-water': 'Civil & Water',
      'chemical-food': 'Chemical & Food',
      'aerospace': 'Aerospace'
    };
    return faculties[facultySlug] || facultySlug || 'N/A';
  };

  const stats = {
    total: users.length,
    superadmins: users.filter(u => u.role === 'superadmin').length,
    subadmins: users.filter(u => u.role === 'subadmin').length,
    regularUsers: users.filter(u => u.role === 'user').length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length
  };

  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4">
        <i className="bi bi-people me-2 text-primary"></i>
        User Management
      </h1>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Total Users</h5>
              <h2 className="display-6">{stats.total}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-danger text-white h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Super Admins</h5>
              <h2 className="display-6">{stats.superadmins}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Sub Admins</h5>
              <h2 className="display-6">{stats.subadmins}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Users</h5>
              <h2 className="display-6">{stats.regularUsers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Active</h5>
              <h2 className="display-6">{stats.active}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6 mb-3">
          <div className="card bg-secondary text-white h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Inactive</h5>
              <h2 className="display-6">{stats.inactive}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="superadmin">Super Admin</option>
                <option value="subadmin">Sub Admin</option>
                <option value="user">Regular User</option>
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-list me-2"></i>
            Users ({filteredUsers.length})
          </h5>
          <button className="btn btn-primary btn-sm">
            <i className="bi bi-plus-circle me-1"></i> Add New User
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Faculty</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(userItem => (
                  <tr key={userItem.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                               style={{ width: '40px', height: '40px' }}>
                            <i className="bi bi-person"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-0">{userItem.name}</h6>
                          <small className="text-muted">@{userItem.username}</small>
                          <div><small>{userItem.email}</small></div>
                        </div>
                      </div>
                    </td>
                    <td>{getRoleBadge(userItem.role)}</td>
                    <td>{getFacultyName(userItem.faculty)}</td>
                    <td>
                      {getStatusBadge(userItem.status)}
                      <div className="mt-1">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleChangeStatus(
                            userItem.id, 
                            userItem.status === 'active' ? 'inactive' : 'active'
                          )}
                        >
                          <i className={`bi bi-toggle-${userItem.status === 'active' ? 'off' : 'on'}`}></i>
                        </button>
                      </div>
                    </td>
                    <td>{new Date(userItem.joinDate).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleEditUser(userItem)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteUser(userItem.id)}
                          disabled={userItem.id === user?.id}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-people display-1 text-muted mb-3"></i>
              <h4>No users found</h4>
              <p className="text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-pencil me-2"></i>
                  Edit User
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={editForm.role}
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                    >
                      <option value="user">User</option>
                      <option value="subadmin">Sub Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={editForm.status}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Faculty</label>
                  <select
                    className="form-select"
                    value={editForm.faculty}
                    onChange={(e) => setEditForm({...editForm, faculty: e.target.value})}
                  >
                    <option value="">Select Faculty</option>
                    <option value="computing">Computing</option>
                    <option value="electrical-computer">Electrical & Computer</option>
                    <option value="civil-water">Civil & Water</option>
                    <option value="chemical-food">Chemical & Food</option>
                    <option value="aerospace">Aerospace</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleUpdateUser}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;