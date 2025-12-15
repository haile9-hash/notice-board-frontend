import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container">
      <h1>User Dashboard</h1>
      <p>Welcome, {user.username}. You can like, dislike, and comment on posts.</p>
    </div>
  );
};

export default UserDashboard;