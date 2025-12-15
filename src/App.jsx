import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './context/AuthContext';
import PostProvider from './context/PostContext';
import RoleProvider from './context/RoleContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles.css';

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <RoleProvider>
          <Router>
            <div className="d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </Router>
        </RoleProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;