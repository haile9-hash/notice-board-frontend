import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Logo from './Logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Categories data
  const categories = [
    { name: 'Library', slug: 'library', icon: 'bi-book' },
    { name: 'Cafeteria', slug: 'cafeteria', icon: 'bi-cup' },
    { name: 'Sports', slug: 'sports', icon: 'bi-trophy' },
    { name: 'Registrar', slug: 'registrar', icon: 'bi-clipboard-data' },
    { name: 'Student Affairs', slug: 'student-affairs', icon: 'bi-people' }
  ];

  // Faculties data
  const faculties = [
    { name: 'Computing', slug: 'computing', icon: 'bi-laptop' },
    { name: 'Electrical & Computer Engineering', slug: 'electrical-computer', icon: 'bi-cpu' },
    { name: 'Water Resource & Civil Engineering', slug: 'civil-water', icon: 'bi-water' },
    { name: 'Food & Chemical Engineering', slug: 'chemical-food', icon: 'bi-flask' },
    { name: 'Aerospace Engineering', slug: 'aerospace', icon: 'bi-airplane' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-lg" ref={navbarRef}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleLinkClick}>
          <Logo />
          <span className="ms-2 fw-bold d-none d-sm-inline">BDU Notice Board</span>
          <span className="ms-2 fw-bold d-inline d-sm-none">BDU NB</span>
        </Link>

        {/* Mobile Toggle Button with X/Hamburger */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            // X icon when menu is open
            <span className="navbar-toggler-icon">
              <i className="bi bi-x-lg text-white" style={{ fontSize: '1.5rem' }}></i>
            </span>
          ) : (
            // Hamburger icon when menu is closed
            <span className="navbar-toggler-icon"></span>
          )}
        </button>

        {/* Navbar Content */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {/* Home */}
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/"
                onClick={handleLinkClick}
              >
                <i className="bi bi-house-door me-2"></i>
                <span>Home</span>
              </Link>
            </li>

            {/* Latest News */}
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/latest-news"
                onClick={handleLinkClick}
              >
                <i className="bi bi-newspaper me-2"></i>
                <span>Latest News</span>
              </Link>
            </li>

            {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle d-flex align-items-center"
                type="button"
                id="categoriesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-grid-3x3-gap me-2"></i>
                <span>Categories</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="categoriesDropdown">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      className="dropdown-item d-flex align-items-center py-2"
                      to={`/categories/${category.slug}`}
                      onClick={handleLinkClick}
                    >
                      <i className={`${category.icon} me-2`}></i>
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center py-2"
                    to="/latest-news"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    View All Categories
                  </Link>
                </li>
              </ul>
            </li>

            {/* Faculties Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle d-flex align-items-center"
                type="button"
                id="facultiesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-building me-2"></i>
                <span>Faculties</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="facultiesDropdown">
                {faculties.map((faculty) => (
                  <li key={faculty.slug}>
                    <Link
                      className="dropdown-item d-flex align-items-center py-2"
                      to={`/faculties/${faculty.slug}`}
                      onClick={handleLinkClick}
                    >
                      <i className={`${faculty.icon} me-2`}></i>
                      {faculty.name}
                    </Link>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center py-2"
                    to="/latest-news"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    View All Faculties
                  </Link>
                </li>
              </ul>
            </li>

            {/* Authentication Section */}
            {user ? (
              <>
                {/* User Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    <span>{user.name || user.username}</span>
                    <span className={`badge ms-2 ${user.role === 'superadmin' ? 'bg-danger' : user.role === 'subadmin' ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {user.role}
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center py-2"
                        to={`/${user.role}-dashboard`}
                        onClick={handleLinkClick}
                      >
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                      </Link>
                    </li>
                    
                    {/* Create Post Link (for admins only) */}
                    {(user.role === 'superadmin' || user.role === 'subadmin') && (
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center py-2"
                          to="/create-post"
                          onClick={handleLinkClick}
                        >
                          <i className="bi bi-plus-circle me-2"></i>
                          Create Post
                        </Link>
                      </li>
                    )}
                    
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center py-2"
                        to="/"
                        onClick={handleLinkClick}
                      >
                        <i className="bi bi-house me-2"></i>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center py-2"
                        to="/latest-news"
                        onClick={handleLinkClick}
                      >
                        <i className="bi bi-newspaper me-2"></i>
                        Latest News
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center py-2 text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                {/* Login */}
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/login"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    <span>Login</span>
                  </Link>
                </li>

                {/* Signup */}
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/signup"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    <span>Signup</span>
                  </Link>
                </li>

                {/* Demo Login */}
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center text-warning"
                    to="/demo-login"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-rocket-takeoff me-2"></i>
                    <span>Demo</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;