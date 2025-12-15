import React from 'react';
// Mock users
const users = [{ id: 1, username: 'user1', role: 'user' }, { id: 2, username: 'subadmin', role: 'subadmin' }];

const ManageUsers = () => {
  return (
    <div className="container">
      <h1>Manage Users</h1>
      <table className="table">
        <thead><tr><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td><button className="btn btn-warning">Edit Role</button> <button className="btn btn-danger">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;