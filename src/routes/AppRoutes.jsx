import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public Pages
import Home from '../pages/publicPages/Home';   
import LatestNews from '../pages/publicPages/LatestNews';
import CategoryPosts from '../pages/publicPages/CategoryPosts';
import FacultyPosts from '../pages/publicPages/FacultyPosts';
import PostDetail from '../pages/publicPages/PostDetail';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import DemoLogin from '../pages/auth/DemoLogin';

// Admin Pages
import SuperAdminDashboard from '../pages/admin/SuperAdminDashboard';
import ApprovePosts from '../pages/admin/ApprovePosts';
import ManageUsers from '../pages/admin/ManageUsers';

// Sub-Admin Pages
import SubAdminDashboard from '../pages/subadmin/SubAdminDashboard';
import CreatePost from '../pages/subadmin/CreatePost';

// User Pages
import UserDashboard from '../pages/user/UserDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/latest-news" element={<LatestNews />} />
      <Route path="/categories/:cat" element={<CategoryPosts />} />
      <Route path="/faculties/:fac" element={<FacultyPosts />} />
      <Route path="/post/:id" element={<PostDetail />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/demo-login" element={<DemoLogin />} />
      
      {/* Super Admin Routes */}
      <Route path="/superadmin-dashboard" element={
        <ProtectedRoute requiredRole="superadmin">
          <SuperAdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/approve-posts" element={
        <ProtectedRoute requiredRole="superadmin">
          <ApprovePosts />
        </ProtectedRoute>
      } />
      <Route path="/manage-users" element={
        <ProtectedRoute requiredRole="superadmin">
          <ManageUsers />
        </ProtectedRoute>
      } />
      
      {/* Sub-Admin Routes */}
      <Route path="/subadmin-dashboard" element={
        <ProtectedRoute requiredRole="subadmin">
          <SubAdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/create-post" element={
        <ProtectedRoute requiredRole={['superadmin', 'subadmin']}>
          <CreatePost />
        </ProtectedRoute>
      } />
      
      {/* User Routes */}
      <Route path="/user-dashboard" element={
        <ProtectedRoute requiredRole={['superadmin', 'subadmin', 'user']}>
          <UserDashboard />
        </ProtectedRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={
        <div className="container mt-5 text-center">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;