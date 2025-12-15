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
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/" onClick={handleLinkClick}>
          <Logo />
          <span className="ms-2 d-none d-sm-inline">BDU Notice Board</span>
          <span className="ms-2 d-inline d-sm-none">BDU NB</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
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
                <i className="bi bi-house-door me-1"></i>
                <span className="d-none d-md-inline">Home</span>
              </Link>
            </li>

            {/* Latest News */}
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/latest-news"
                onClick={handleLinkClick}
              >
                <i className="bi bi-newspaper me-1"></i>
                <span className="d-none d-md-inline">Latest News</span>
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
                <i className="bi bi-grid-3x3-gap me-1"></i>
                <span className="d-none d-md-inline">Categories</span>
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
                <i className="bi bi-building me-1"></i>
                <span className="d-none d-md-inline">Faculties</span>
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
                    <i className="bi bi-person-circle me-1"></i>
                    <span className="d-none d-md-inline">{user.name || user.username}</span>
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

                {/* Role Badge */}
                <li className="nav-item d-none d-md-flex align-items-center ms-2">
                  <span className={`badge bg-${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
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
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    <span className="d-none d-md-inline">Login</span>
                  </Link>
                </li>

                {/* Signup */}
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/signup"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-person-plus me-1"></i>
                    <span className="d-none d-md-inline">Signup</span>
                  </Link>
                </li>

                {/* Demo Login */}
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center text-warning"
                    to="/demo-login"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-rocket-takeoff me-1"></i>
                    <span className="d-none d-md-inline">Demo</span>
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

const getRoleColor = (role) => {
  switch (role) {
    case 'superadmin': return 'danger';
    case 'subadmin': return 'warning text-dark';
    case 'user': return 'success';
    default: return 'secondary';
  }
};

export default Navbar;